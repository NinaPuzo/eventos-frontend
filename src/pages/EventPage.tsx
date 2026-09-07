import { useSearchParams } from "react-router-dom";
import EventCard from "../components/events/EventCard";
import { useEffect, useState } from "react";
import type { Event } from "@shared/types/Event";
import { getEvents } from "../api/eventsService";

function EventPage() {
  const [events, setEvents] = useState<Event[]>([]);
  //const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);

  //const [searchParams] = useSearchParams();
  //const selectedCategory = searchParams.get("category");

  useEffect(() => {
    async function loadEvents() {
      const receivedEvents = await getEvents();

      setEvents(receivedEvents);
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
    /*<div>
      {filteredEvents.map((events) => (
        <EventCard key={events.id} event={events} />
      ))}
    </div>*/

    <div>
      {events &&
        events.map((event) => <EventCard key={event.id} event={event} />)}
    </div>
  );
}

export default EventPage;
