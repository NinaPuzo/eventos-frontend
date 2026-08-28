import type { CartItem } from "@shared/types/CartItem";

const cart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");

function CartPage() {
  return (
    <div>
      <h1>Korpa</h1>
    </div>
  );
}
export default CartPage;
