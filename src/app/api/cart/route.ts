import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

async function updateCart(token: string) {
  const cart = await prisma.cart.findFirst({
    where: {
      token,
    },
    include: {
      items: {
        orderBy: {
          createdAt: "desc",
        },
        include: {
          productVariant: {
            include: {
              product: true,
            },
          },
        },
      },
    },
  });

  if (!cart) {
    return NextResponse.json({ error: "Корзина не найдена" });
  }

  const totalAmount = cart.items.reduce(
    (acc, item) => acc + item.productVariant.price * item.quantity,
    0,
  );

  const updatedCart = await prisma.cart.update({
    where: { id: cart.id },
    data: { totalAmount },
    include: {
      items: {
        orderBy: {
          createdAt: "desc",
        },
        include: {
          productVariant: {
            include: {
              product: true,
            },
          },
        },
      },
    },
  });

  return updatedCart;
}

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("cartToken")?.value;

    if (!token) {
      return NextResponse.json({ items: [] });
    }

    const userCart = await prisma.cart.findFirst({
      where: {
        token,
      },
      include: {
        items: {
          orderBy: {
            createdAt: "desc",
          },
          include: {
            productVariant: {
              include: {
                product: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json(userCart);
  } catch (error) {
    console.log(error);
  }
}

// TODO: Переделать в REST-стильный подход (отдельный ресурс) для методов (PATCH, DELETE):
// /api/cart/[id]
export async function PATCH(req: NextRequest) {
  try {
    const { id, quantity } = await req.json();

    if (quantity < 1) {
      return NextResponse.json({ error: "Количество не может быть меньше 1" });
    }

    if (!id) {
      return NextResponse.json({ error: "Не указан id" });
    }

    const token = req.cookies.get("cartToken")?.value;

    if (!token) {
      return NextResponse.json({
        error: "Токен корзины не найден",
      });
    }

    const cartItem = await prisma.cartItem.findFirst({
      where: { id },
    });

    if (!cartItem) {
      return NextResponse.json({ error: "Товар не найден" });
    }

    await prisma.cartItem.update({
      where: { id },
      data: { quantity },
    });

    const updatedCart = await updateCart(token);

    return NextResponse.json(updatedCart);
  } catch (error) {
    console.log("Ошибка при обновлении корзины", error);
    return NextResponse.json(
      {
        message: "Ошибка при обновлении корзины",
      },
      { status: 500 },
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Не указан id" });
    }

    const token = req.cookies.get("cartToken")?.value;

    if (!token) {
      return NextResponse.json({
        error: "Токен корзины не найден",
      });
    }

    const cartItem = await prisma.cartItem.findFirst({
      where: { id },
    });

    if (!cartItem) {
      return NextResponse.json({ error: "Товар не найден" });
    }

    await prisma.cartItem.delete({
      where: { id },
    });

    const updatedCart = await updateCart(token);

    return NextResponse.json(updatedCart);
  } catch (error) {
    console.log("Ошибка при удалении товара из корзины", error);
    return NextResponse.json(
      {
        message: "Ошибка при удалении товара из корзины",
      },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    let token = req.cookies.get("cartToken")?.value;

    if (!token) {
      token = crypto.randomUUID();
    }

    let userCart = await prisma.cart.findFirst({
      where: {
        token,
      },
    });

    if (!userCart) {
      userCart = await prisma.cart.create({
        data: {
          token,
        },
      });
    }

    const data = (await req.json()) as { productVariantId: number };

    const cartItem = await prisma.cartItem.findFirst({
      where: {
        cartId: userCart.id,
        productVariantId: data.productVariantId,
      },
    });

    if (cartItem) {
      await prisma.cartItem.update({
        where: {
          id: cartItem.id,
        },
        data: {
          quantity: cartItem.quantity + 1,
        },
      });
    }

    await prisma.cartItem.create({
      data: {
        cartId: userCart.id,
        productVariantId: data.productVariantId,
        quantity: 1,
      },
    });

    const updatedCart = await updateCart(token);

    const resp = NextResponse.json(updatedCart);
    resp.cookies.set("cartToken", token);

    return resp;
  } catch (error) {
    console.log("POST", error);
  }
}
