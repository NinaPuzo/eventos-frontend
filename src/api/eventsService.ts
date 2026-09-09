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
): Promise<boolean> {
  try {
    const formData = new FormData();

    formData.append("userId", eventData.userId);
    formData.append("categoryId", eventData.categoryId);
    formData.append("eventName", eventData.eventName);
    formData.append("description", eventData.description);
    formData.append("locationName", eventData.locationName);
    formData.append("capacity", eventData.capacity.toString());
    formData.append("ticketCost", eventData.ticketCost.toString());
    formData.append("isCanceled", eventData.isCanceled.toString());
    formData.append("startTime", eventData.startTime);
    formData.append("endTime", eventData.endTime);

    console.log(eventData.image);

    if (eventData.image) {
      formData.append("imageFile", eventData.image);
    }

    eventData.controllerIds.forEach((controllerId) => {
      formData.append("controllerIds", controllerId);
    });

    await ApiClient.post("/api/events", formData);

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
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
