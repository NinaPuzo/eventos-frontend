import type { Event } from "@shared/types/Event";
import Button from "../global/Button";

type CartItemProps = {
  event: Event;
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
};

function CartItem({
  event,
  quantity,
  onIncrease,
  onDecrease,
  onRemove,
}: CartItemProps) {
  const itemTotal = event.ticketCost * quantity;

  return <div></div>;
}
export default CartItem;
