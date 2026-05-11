import { CartPromise, CartStateItem } from "@/static/types";

type GetCartDetailsProps = {
  items: CartStateItem[];
  totalAmount: number;
};
export function getCartDetails(data: CartPromise): GetCartDetailsProps {
  const items = data.items.map((item) => {
    const { id, productVariant, quantity } = item;
    const { price, editionType, product } = productVariant;
    const { name } = product;

    return {
      id,
      productVariantId: productVariant.id,
      productId: product.id,
      quantity,
      disabled: false,
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
