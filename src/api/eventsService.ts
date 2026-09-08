import type { CreateEventRequest } from "@shared/types/CreateEventRequest";
import type { Event } from "../shared/types/Event";
import { ApiClient } from "./apiClient";
import type { User } from "@shared/types/User";

export async function getEvents(): Promise<Event[]> {
  const response = await ApiClient.get<Event[]>("/api/events");

  return response.data;
}

export async function getEventsByCategory(
  categoryId: string,
): Promise<Event[]> {
  const response = await ApiClient.get<Event[]>(
    `/api/events/category/${categoryId}`,
  );

  return response.data;
}

export async function getEventsById(id: string): Promise<Event | undefined> {
  const response = await ApiClient.get(`/api/events/${id}`);

  return response.data;
}

export async function createEvent(
  eventData: CreateEventRequest,
): Promise<void> {
  await ApiClient.post("/api/events", eventData);
}

export async function getAvailableControllers(
  startTime: string,
): Promise<User[]> {
  const response = await ApiClient.post<User[] | undefined>(
    "/api/events/availablecontrollers",
    JSON.stringify(startTime),
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  return response.data ?? [];
}

export async function getMyEvents(): Promise<Event[]> {
  const response = await ApiClient.get<Event[]>("/api/events/myevents");

  return response.data;
}

export async function cancelEvent(eventId: string): Promise<boolean> {
  const response = await ApiClient.get(`/api/events/${eventId}/cancel`);

  return response.data;
}
