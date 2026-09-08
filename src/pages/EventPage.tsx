import { useSearchParams } from "react-router-dom";
import EventCard from "../components/events/EventCard";
import { useEffect, useState } from "react";
import type { Event } from "@shared/types/Event";
import { getEvents, getEventsByCategory } from "../api/eventsService";

function EventPage() {
  const [events, setEvents] = useState<Event[]>([]);

  const [searchParams] = useSearchParams();
  const selectedCategoryId = searchParams.get("categoryId");

  useEffect(() => {
    async function loadEvents() {
      try {
        const receivedEvents = selectedCategoryId
          ? await getEventsByCategory(selectedCategoryId)
          : await getEvents();

        setEvents(receivedEvents);
      } catch (error) {
        console.error("Greška pri učitavanju događaja.", error);
        setEvents([]);
      }
    }

    loadEvents();
  }, [selectedCategoryId]);

  return (
    <div className="w-full">
      {events.length === 0 ? (
        <p className="text-lg text-white p-10 px-60">
          Trenutno nema događaja u ovoj kategoriji.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-5 px-6 py-20 md:grid-cols-2 md:px-20">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
}

export default EventPage;
