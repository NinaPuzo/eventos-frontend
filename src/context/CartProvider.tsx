import type { CartItemType } from "@shared/types/CartItemType";
import { createContext, useState, type ReactNode } from "react";

type CartContextType = {
  cart: CartItemType[];
  addToCart: (eventId: string, quantity: number) => void;
  removeFromCart: (eventId: string) => void;
  clearCart: () => void;
};

export const CartContext = createContext<CartContextType | undefined>(
  undefined,
);

type CartProviderProps = {
  children: ReactNode;
};

function CartProvider({ children }: CartProviderProps) {
  const storedCart = localStorage.getItem("cart");

  const [cart, setCart] = useState<CartItemType[]>(
    storedCart ? JSON.parse(storedCart) : [],
  );

  function addToCart(eventId: string, quantity: number) {
    const existingItem = cart.find((item) => eventId === item.eventId);

    let newCart;

    if (existingItem) {
      newCart = cart.map((item) =>
        item.eventId === eventId
          ? { ...item, quantity: item.quantity + quantity }
          : item,
      );
    } else {
      newCart = [...cart, { eventId, quantity }];
    }

    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  }

  function removeFromCart(eventId: string) {
    const newCart = cart.filter((item) => item.eventId !== eventId);

    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  }

  function clearCart() {
    setCart([]);
    localStorage.removeItem("cart");
  }

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}
export default CartProvider;
