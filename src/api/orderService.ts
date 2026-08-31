import type { CartItemType } from "@shared/types/CartItemType";
import { ApiClient } from "./apiClient";

export type CreateOrderItemsRequest = {
  eventId: string;
  quantity: number;
};

export type CreateOrderRequest = {
  email: string;
  firstName: string;
  lastName: string;
  events: CreateOrderItemsRequest[];
};

export async function createOrder(
  orderData: CreateOrderRequest,
): Promise<boolean> {
  try {
    const response = await ApiClient.post("/api/orders/noauth", orderData);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
