import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

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
