import type { Event } from "../shared/types/Event";
import { ApiClient } from "./apiClient";

export async function getEvents(): Promise<Event[]> {
  const response = await ApiClient.get<Event[]>("/api/events");

  return response.data;
}

export async function getEventsById(id: string): Promise<Event | undefined> {
  const response = await ApiClient.get(`/api/events/${id}`);

  return response.data;
}
