import { events } from "../data/events";
import type { Event } from "../shared/types/Event";

export function getEvents(): Promise<Event[]> {
  return Promise.resolve(events);
}

export function getEventsById(id: number): Promise<Event | undefined> {
  const event = events.find((event) => event.id === id);

  return Promise.resolve(event);
}
