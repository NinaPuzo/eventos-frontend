import { useSearchParams } from "react-router-dom";
import EventCard from "../components/events/EventCard";
import { useEffect, useState } from "react";
import type { Event } from "@shared/types/Event";
import { getEvents } from "../api/eventsService";

function EventPage() {
  const [events, setEvents] = useState<Event[]>([]);

  const [searchParams] = useSearchParams();
  const selectedCategoryId = searchParams.get("categoryId");

  function filterEventsByCategory() {
    if (!selectedCategoryId) {
      return events;
    }

    return events.filter((event) => event.categoryId === selectedCategoryId);
  }

  const filteredEvents = filterEventsByCategory();

  useEffect(() => {
    async function loadEvents() {
      try {
        const receivedEvents = await getEvents();

        setEvents(receivedEvents);
      } catch (error) {
        console.error("Greška pri učitavanju događaja.", error);
      }
    }

    loadEvents();
  }, []);

  /*useEffect(() => {
    const filter = events.filter(
      (events) =>
        events.category.toLowerCase() === selectedCategory?.toLowerCase(),
    );

    setFilteredEvents(filter);
  }, [searchParams, events]);*/

  return (
    <div>
      {filteredEvents.length === 0 ? (
        <p className="text-lg text-white p-10 px-60">
          Trenutno nema događaja u ovoj kategoriji.
        </p>
      ) : (
        filteredEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))
      )}
    </div>
  );
}

export default EventPage;
