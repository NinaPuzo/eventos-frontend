import type { Event } from "@shared/types/Event";
import { useState, useContext } from "react";
import Button from "../global/Button";
import CartContext from "../../context/CartContext";

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
      <h1 className="text-5xl font-bold">{event.eventName}</h1>

      <div className="flex flex-col ">
        <p className="text-[22px]">Datum: {date.toLocaleDateString("sr-RS")}</p>
        <p className="text-[22px]">
          Vreme:{" "}
          {date.toLocaleTimeString("sr-RS", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>

      <div className="flex flex-col justify-between w-full border-t pt-6">
        <div className="flex justify-between">
          <p className="text-xl">Cena karte</p>
          <p className="text-xl"> {event.ticketCost},00 RSD</p>
        </div>

        <div className="flex flex-row justify-between w-full pt-6">
          <p className="text-xl">Količina</p>
          <div className=" flex flex-row w-[25%] justify-between items-center">
            <button
              onClick={() => {
                if (quantity > 0) {
                  setQuantity(quantity - 1);
                }
              }}
              className="flex cursor-pointer bg-[#767676] px-4 text-2xl items-center justify-center rounded-xl"
            >
              -
            </button>

            <p className="text-xl ">{quantity}</p>

            <button
              onClick={() => setQuantity(quantity + 1)}
              className="flex cursor-pointer bg-[#767676] px-4 text-2xl items-center justify-center rounded-xl"
            >
              +
            </button>
          </div>
        </div>
      </div>

      <Button
        type="button"
        onClick={handleAddToCart}
        className="cursor-pointer text-[18px] ml-auto w-full bg-[#E98400] py-3 rounded-xl text-black font-semibold"
        label="Dodaj u korpu"
      />
    </div>
  );
}
export default EventInfo;
