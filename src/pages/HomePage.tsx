import EventCard from "../components/events/EventCard";
import { events } from "../data/events";

function HomePage() {
  return (
    <div>
      <h1>Dogadjaji</h1>

      <div className="grid grid-cols-2 gap-5 p-20 place-items-center">
        {events.map((events) => (
          <EventCard key={events.id} event={events} />
        ))}
      </div>
    </div>
  );
}

export default HomePage;
