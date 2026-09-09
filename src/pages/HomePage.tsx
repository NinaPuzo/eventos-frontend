import { useEffect, useState } from "react";
import EventCard from "../components/events/EventCard";
import { getEvents } from "../api/eventsService";
import type { Event } from "@shared/types/Event";
import heroImage from "../images/hero.jpg";

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
    <div className=" w-full  bg-[#181818]">
      <section className="relative h-screen w-full overflow-hidden">
        <img
          src={heroImage}
          alt="Hero slika"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-black/25 to-transparent" />
      </section>
      <div className="grid grid-cols-2 gap-5 py-20 place-items-center">
        {events &&
          events.map((events) => <EventCard key={events.id} event={events} />)}
      </div>
    </div>
  );
}

export default HomePage;
