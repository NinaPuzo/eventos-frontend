import { useContext, useState, type ChangeEventHandler } from "react";
import Input from "../components/global/Input";
import Button from "../components/global/Button";
import {
  createOrder,
  createOrderNoAuth,
  type CreateOrderRequest,
} from "../api/orderService";
import { useNavigate } from "react-router-dom";
import CartContext from "../context/CartContext";
import AuthContext from "../context/AuthContext";

function CheckoutPage() {
  const authContext = useContext(AuthContext);
  const cartContext = useContext(CartContext);
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const [message, setMessage] = useState("");

  if (!cartContext) {
    throw new Error("CheckoutPage mora biti unutar CartProvider-a");
  }

  if (!authContext) {
    throw new Error("CheckoutPage mora biti unutar CartProvider-a");
  }

  const { cart, clearCart } = cartContext;
  const { currentUser } = authContext;

  async function handleSubmitOrder() {
    const events = cart.map((item) => ({
      eventId: item.eventId,
      quantity: item.quantity,
    }));

    let success;

    if (currentUser) {
      success = await createOrder(events);
    } else {
      success = await createOrderNoAuth({ firstName, lastName, email, events });
    }

    if (success) {
      clearCart();
      navigate("/");
    } else {
      setMessage("Došlo je do greške prilikom kupovine.");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center text-white gap-4 py-20">
      <h1>Plaćanje</h1>

      <h2 className="text-xl">Podaci kupca</h2>

      {currentUser ? (
        <div className="flex flex-col gap-2">
          <p className="text-sm text-gray-500">Karte će biti poslate na:</p>

          <p className="font-medium">
            {currentUser.firstName} {currentUser.lastName}
          </p>

          <p>{currentUser.email}</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <Input
            label="Ime"
            id="firstName"
            type="text"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
          />

          <Input
            label="Prezime"
            id="lastName"
            type="text"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
          />

          <Input
            label="Email"
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
      )}

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
