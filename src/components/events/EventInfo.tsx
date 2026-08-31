import type { Event } from "@shared/types/Event";
import { useState, useContext } from "react";
import Button from "../global/Button";
import { CartContext } from "../../context/CartProvider";

type EventInfoProps = {
  event: Event;
};

function EventInfo({ event }: EventInfoProps) {
  const [quantity, setQuantity] = useState(0);
  const cartContext = useContext(CartContext);
  const date = new Date(event.startTime);

  if (!cartContext) {
    throw new Error("EventInfo mora biti unutar CartProvider-a");
  }

  const { addToCart } = cartContext;

  function handleAddToCart() {
    if (quantity === 0) {
      return;
    }

    addToCart(event.id, quantity);
    setQuantity(0);
  }

  return (
    <div className="flex flex-col w-[65%]  gap-5">
      <h1 className="text-2xl font-bold">{event.eventName}</h1>

      <div className="flex flex-col ">
        <p className="text-lg">Datum: {date.toLocaleDateString("sr-RS")}</p>
        <p className="text-lg">
          Vreme:{" "}
          {date.toLocaleTimeString("sr-RS", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
        <p className="text-lg">Cena ulaznice: {event.ticketCost},00 RSD</p>
      </div>

      <div className="flex flex-row justify-between w-full border-t pt-6">
        <p className="text-lg">Količina</p>
        <div className=" flex flex-row w-[25%] justify-between items-center">
          <button
            onClick={() => {
              if (quantity > 0) {
                setQuantity(quantity - 1);
              }
            }}
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
