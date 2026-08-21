import EventCard from "../components/events/EventCard";
import { events } from "../data/events";

function ConcertsPage() {
  const concertEvents = events.filter(
    (events) => events.category === "Koncert",
  );

  return (
    <div>
      <h1>Koncerti</h1>

      {concertEvents.map((events) => (
        <EventCard key={events.id} event={events} />
      ))}
    </div>
  );
}
export default ConcertsPage;
