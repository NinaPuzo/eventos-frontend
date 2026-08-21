import EventCard from "../components/events/EventCard";
import { events } from "../data/events";

function SportsPage() {
  const sportEvents = events.filter((events) => events.category === "Sport");

  return (
    <div>
      <h1>Sportovi</h1>

      {sportEvents.map((events) => (
        <EventCard key={events.id} event={events} />
      ))}
    </div>
  );
}
export default SportsPage;
