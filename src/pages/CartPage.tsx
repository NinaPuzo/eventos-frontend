import type { CartItemType } from "@shared/types/CartItemType";
import { events } from "../data/events";
import { useEffect, useState } from "react";

function CartPage() {
  const [cart, setCart] = useState<CartItemType[]>([]);

  useEffect(() => {
    const storedCart: CartItemType[] = JSON.parse(
      localStorage.getItem("cart") || "[]",
    );

    setCart(storedCart);
  }, [localStorage.getItem("cart")]);
  return (
    <div>
      <h1>Pregled korpe</h1>

      {cart.map((item) => {
        const event = events.find((event) => event.id === item.eventId);

        if (!event) {
          return null;
        }

        return (
          <div key={item.eventId}>
            <h2>{event.name}</h2>
            <p>Cena: {event.price} RSD</p>
            <p>Količina: {item.quantity}</p>
          </div>
        );
      })}
    </div>
  );
}
export default CartPage;
