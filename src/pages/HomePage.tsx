import { useEffect, useState } from "react";
import EventCard from "../components/events/EventCard";
import { getEvents } from "../api/eventsService";
import type { Event } from "@shared/types/Event";

function HomePage() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    async function loadEvents() {
      const receivedEvents = await getEvents();
      setEvents(receivedEvents);
    }

    loadEvents();
  }, []);

  return (
    <div>
      <div className="grid grid-cols-2 gap-5 py-20 place-items-center">
        {events.map((events) => (
          <EventCard key={events.id} event={events} />
        ))}
      </div>
    </div>
  );
}

export default HomePage;
