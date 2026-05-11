export function getNewQuantity(quantity: number, type: "plus" | "minus") {
  return type === "minus" ? quantity - 1 : quantity + 1;
}
