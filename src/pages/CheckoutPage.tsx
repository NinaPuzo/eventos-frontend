import { useContext, useState, type ChangeEventHandler } from "react";
import Input from "../components/global/Input";
import Button from "../components/global/Button";
import { createOrder, type CreateOrderRequest } from "../api/orderService";
import { useNavigate } from "react-router-dom";
import CartContext from "../context/CartContext";

function CheckoutPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const cartContext = useContext(CartContext);
  const navigate = useNavigate();

  if (!cartContext) {
    throw new Error("CheckoutPage mora biti unutar CartProvider-a");
  }

  const { cart, clearCart } = cartContext;

  async function handleSubmitOrder() {
    setError("");

    const orderData: CreateOrderRequest = {
      email,
      firstName,
      lastName,
      events: cart.map((item) => ({
        eventId: item.eventId,
        quantity: item.quantity,
      })),
    };

    const isCreated = await createOrder(orderData);

    if (isCreated) {
      clearCart();
      navigate("/");
    } else {
      setError("Kupovina nije uspesna. Pokusajte ponovo!");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center text-white gap-4 py-20">
      <h1>Plaćanje</h1>

      <h2 className="text-xl">Podaci kupca</h2>

      <div className="flex flex-col gap-3">
        <Input
          label="Ime"
          id="firstName"
          type="text"
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
          className="w-[400px] rounded-md border border-gray-300 px-4 py-2 outline-none focus:border-mauve-500"
        />

        <Input
          label="Prezime"
          id="lastName"
          type="text"
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
          className=" w-[400px] rounded-md border border-gray-300 px-4 py-2 outline-none focus:border-mauve-500"
        />

        <Input
          label="email"
          id="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="w-[400px] rounded-md border border-gray-300 px-4 py-2 outline-none focus:border-mauve-500"
        />
      </div>

      <Button
        label="Potvrdi kupovinu"
        type="submit"
        className="w-fit cursor-pointer rounded-[10px] bg-[#E98400] px-4 py-2 text-l hover:bg-mauve-400"
        onClick={handleSubmitOrder}
      />
    </div>
  );
}
export default CheckoutPage;
