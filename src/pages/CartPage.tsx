import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartProvider";
import Button from "../components/global/Button";
import { useNavigate } from "react-router-dom";
import type { Event } from "@shared/types/Event";
import { getEvents } from "../api/eventsService";

function CartPage() {
  const [events, setEvents] = useState<Event[]>([]);

  const cartContext = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadEvents() {
      try {
        const receivedEvents = await getEvents();
        setEvents(receivedEvents);
      } catch (error) {
        console.error("Greska pri ucitavanju dogadjaja", error);
      }
    }
    loadEvents();
  }, []);

  if (!cartContext) {
    throw new Error("CartPage mora biti unutar CartProvider-a.");
  }

  const { cart, addToCart, removeFromCart } = cartContext;

  const totalPrice = cart.reduce((total, item) => {
    const event = events.find((event) => event.id === item.eventId);

    if (!event) return total;

    return total + item.quantity * event.ticketCost;
  }, 0);

  return (
    <div>
      <h1>Pregled korpe</h1>
      <br />
      {cart.map((item) => {
        const event = events.find((event) => event.id === item.eventId);

        if (!event) {
          return null;
        }

        return (
          <div key={item.eventId}>
            <h2>{event.eventName}</h2>
            <p>Cena: {event.ticketCost} RSD</p>
            <p>Količina: {item.quantity}</p>
            <div className="flex items-center gap-4 p-2">
              <Button
                type="button"
                label="-"
                onClick={() => {
                  if (item.quantity > 1) {
                    addToCart(item.eventId, -1);
                  }
                }}
                className="cursor-pointer bg-mauve-300 px-4 py-1 text-l hover:bg-mauve-400"
              />

              <p>{item.quantity}</p>

              <Button
                type="button"
                label="+"
                onClick={() => addToCart(item.eventId, 1)}
                className="cursor-pointer bg-mauve-300 px-4 py-1 text-l hover:bg-mauve-400"
              />
            </div>
            <Button
              type="button"
              label="Ukloni iz korpe"
              onClick={() => removeFromCart(item.eventId)}
              className="w-fit cursor-pointer border bg-mauve-300 px-4 py-1 text-l hover:bg-mauve-400"
            />
            <br />
          </div>
        );
      })}

      <h1>Ukupna cena: {totalPrice}</h1>

      <Button
        type="button"
        label="Nastavi na plaćanje"
        onClick={() => navigate("/checkout")}
        className="w-fit cursor-pointer border bg-mauve-300 px-4 py-1 text-l hover:bg-mauve-400"
      />
    </div>
  );
}
export default CartPage;
