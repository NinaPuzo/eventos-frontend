import type { Event } from "@shared/types/Event";
import { useState } from "react";
import Button from "../global/Button";
import type { CartItemType } from "@shared/types/CartItemType";

type EventInfoProps = {
  event: Event;
};

function EventInfo({ event }: EventInfoProps) {
  const [quantity, setQuantity] = useState(0);

  function handleAddToCart() {
    const cartItem: CartItemType = {
      eventId: event.id,
      quantity,
    };

    const storedCart = localStorage.getItem("cart");

    const cart: CartItemType[] = storedCart ? JSON.parse(storedCart) : [];

    const existingItem = cart.find((item) => item.eventId === cartItem.eventId);

    if (existingItem) {
      existingItem.quantity += cartItem.quantity;
    } else {
      cart.push(cartItem);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
  }

  return (
    <div className="flex flex-col w-[65%]  gap-5">
      <h1 className="text-2xl font-bold">{event.name}</h1>

      <div className="flex flex-col ">
        <p className="text-lg">Datum: {event.date}</p>
        <p className="text-lg">Vreme: {event.time}</p>
        <p className="text-lg">Cena ulaznice: {event.price},00 RSD</p>
      </div>

      <div className="flex flex-row justify-between w-full border-t pt-6">
        <p className="text-lg">Količina</p>
        <div className=" flex flex-row w-[25%] justify-between items-center">
          <button
            onClick={() => setQuantity(quantity - 1)}
            className="flex cursor-pointer bg-mauve-300 px-4 text-2xl items-center justify-center "
          >
            -
          </button>

          <p className="text-xl ">{quantity}</p>

          <button
            onClick={() => setQuantity(quantity + 1)}
            className="flex cursor-pointer bg-mauve-300 px-4 text-2xl items-center justify-center "
          >
            +
          </button>
        </div>
      </div>

      <Button
        type="button"
        onClick={handleAddToCart}
        className="cursor-pointer ml-auto w-full bg-blue-200 py-1"
        label="Dodaj u korpu"
      />
    </div>
  );
}
export default EventInfo;
