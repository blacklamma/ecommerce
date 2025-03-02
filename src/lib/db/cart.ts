import { Prisma } from "@prisma/client";
import { prisma } from "./prisma";
import { cookies } from "next/dist/server/request/cookies";

export type CartWithProducts = Prisma.CartGetPayload<{
  include: { items: { include: { product: true } } };
}>;

export type CartItemWithProduct = Prisma.CartItemGetPayload<{
  include: { product: true };
}>;
export type ShoppingCart = CartWithProducts & {
  size: number;
  subtotal: number;
};

export async function getCart(): Promise<ShoppingCart | null> {
  const localCartId = (await cookies()).get("localCartId")?.value;
  console.log("localCartId", localCartId);
  if (!localCartId) return null;

  const cart = await prisma.cart.findUnique({
    where: { id: localCartId },
    include: { items: { include: { product: true } } },
  });

  if (!cart) return null;
  return {
    ...cart,
    size: cart.items.reduce((acc, item) => acc + item.quantity, 0),
    subtotal: cart.items.reduce(
      (acc, item) => acc + item.quantity * item.product.price,
      0,
    ),
  };
}
export async function createCart(): Promise<ShoppingCart> {
  const newCart = await prisma.cart.create({
    data: {},
  });

  (await cookies()).set("localCartId", newCart.id);

  return {
    ...newCart,
    items: [],
    size: 0,
    subtotal: 0,
  };
}
