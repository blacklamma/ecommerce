"use server";

import { createCart, getCart } from "@/src/lib/db/cart";
import { prisma } from "@/src/lib/db/prisma";
import { revalidatePath } from "next/cache";

export async function setProductQuantity(productId: string, quantity: number) {
  const cart = (await getCart()) ?? (await createCart());
  const articleInCart = cart.items.find((item) => item.productId === productId);
  if (quantity === 0) {
    if (articleInCart) {
      const cartItem = await prisma.cartItem.findUnique({
        where: { id: articleInCart.id },
      });

      if (!cartItem) {
        throw new Error(
          `Cart item with id ${articleInCart.id} does not exist.`,
        );
      }

      await prisma.cart.update({
        where: { id: cart.id },
        data: { items: { delete: { id: articleInCart.id } } },
      });

      // Check if the cart item exists before deleting
      const cartItemToDelete = await prisma.cartItem.findUnique({
        where: { id: articleInCart.id },
      });

      if (cartItemToDelete) {
        await prisma.cartItem.delete({
          where: { id: articleInCart.id },
        });
      }
    }
  } else {
    if (articleInCart) {
      await prisma.cart.update({
        where: { id: cart.id },
        data: {
          items: {
            update: { where: { id: articleInCart.id }, data: { quantity } },
          },
        },
      });
    } else {
      await prisma.cart.update({
        where: { id: cart.id },
        data: {
          items: {
            create: {
              productId,
              quantity,
            },
          },
        },
      });
    }
  }
  revalidatePath("/cart");
}
