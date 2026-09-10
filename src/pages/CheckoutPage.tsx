import {
  useContext,
  useEffect,
  useState,
  type ChangeEventHandler,
} from "react";
import Input from "../components/global/Input";
import Button from "../components/global/Button";
import { createOrder, createOrderNoAuth } from "../api/orderService";
import { useNavigate } from "react-router-dom";
import CartContext from "../context/CartContext";
import AuthContext from "../context/AuthContext";

function CheckoutPage() {
  const authContext = useContext(AuthContext);
  const cartContext = useContext(CartContext);
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [brojKartice, setBrojKartice] = useState("");
  const [datumIsteka, setDatumIsteka] = useState("");
  const [cvv, setCvv] = useState("");
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

    setIsLoading(true);
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
    setIsLoading(false);
  }

  useEffect(() => {
    if (currentUser) {
      setFirstName(currentUser.firstName);
      setLastName(currentUser.lastName);
      setEmail(currentUser.email);
    }
  }, []);

  return (
    <div className="flex flex-col items-start justify-center text-white gap-7 py-10 pl-[240px] pr-[240px]">
      <h1 className="text-[20px] font-bold">Plaćanje</h1>

      <div className="flex flex-row gap-6 w-full">
        <div className="flex flex-col gap-[10px] w-full">
          <div className="flex flex-row gap-[10px]">
            <Input
              label="Ime"
              id="firstName"
              type="text"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
              className="h-12 w-full rounded border border-[#5D5D5D] px-4 text-sm placeholder:text-[#1A1A1A] outline-none"
            />

            <Input
              label="Prezime"
              id="lastName"
              type="text"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
              className="h-12 w-full rounded border border-[#5D5D5D] px-4 text-sm placeholder:text-[#1A1A1A] outline-none"
            />
          </div>

          <Input
            label="Email"
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="h-12 w-full rounded border border-[#5D5D5D] px-4 text-sm placeholder:text-[#1A1A1A] outline-none"
          />
        </div>

        <div className="flex flex-col gap-6 w-full">
          <div className="flex flex-row w-full justify-between items-center">
            <p className="text-[20px] font-bold text-white">UKUPNO</p>
            <p className="text-[20px] font-bold text-white">6000 RSD</p>
          </div>
          <div className="h-[1px] bg-white w-full"></div>
          <div className="flex flex-col gap-[10px]">
            <Input
              label="Broj kartice"
              id="brojKartice"
              type="text"
              value={brojKartice}
              onChange={(event) => setBrojKartice(event.target.value)}
              className="h-12 w-full rounded border border-[#5D5D5D] px-4 text-sm placeholder:text-[#1A1A1A] outline-none"
            />
            <div className="flex flex-row gap-[10px]">
              <Input
                label="Datum isteka"
                id="datumIsteka"
                type="text"
                value={datumIsteka}
                onChange={(event) => setDatumIsteka(event.target.value)}
                className="h-12 w-full rounded border border-[#5D5D5D] px-4 text-sm placeholder:text-[#1A1A1A] outline-none"
              />

              <Input
                label="CVV"
                id="cvv"
                type="text"
                value={cvv}
                onChange={(event) => setCvv(event.target.value)}
                className="h-12 w-full rounded border border-[#5D5D5D] px-4 text-sm placeholder:text-[#1A1A1A] outline-none"
              />
            </div>
            {isLoading ? (
              <div className="flex w-full justify-center items-center cursor-pointer rounded-[10px] bg-[#E98400] px-4 py-2 text-l hover:bg-mauve-400">
                <div className="h-6 w-6 animate-spin rounded-full border-4 border-white/30 border-t-white" />
              </div>
            ) : (
              <Button
                label="Potvrdi kupovinu"
                type="submit"
                className="w-full cursor-pointer rounded-[10px] bg-[#E98400] px-4 py-2 text-l hover:bg-mauve-400"
                onClick={handleSubmitOrder}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default CheckoutPage;
