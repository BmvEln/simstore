import { CartPromise, CartStateItem } from "@/static/types";

type ReturnProps = {
  items: CartStateItem[];
  totalAmount: number;
};
export function getCartDetails(data: CartPromise): ReturnProps {
  const items = data.items.map((item) => {
    const { id, productVariant, quantity } = item;
    const { price, editionType, product } = productVariant;
    const { name } = product;

    return {
      id,
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
