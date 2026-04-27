import { CartPromise, CartStateItem } from "@/static/types";

type ReturnProps = {
  items: CartStateItem[];
  totalAmount: number;
};
export function getCartDetails(data: CartPromise): ReturnProps {
  const items = data.items.map((item) => {
    const { productVariant, quantity } = item;
    const { price, editionType, product } = productVariant;
    const { name } = product;

    return {
      productVariantId: productVariant.id,
      productId: product.id,
      quantity,
      name,
      price: price * quantity,
      editionType,
    };
  });

  return {
    items,
    totalAmount: data.totalAmount,
  };
}
