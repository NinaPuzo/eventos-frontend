import EventCard from "../components/events/EventCard";
import { events } from "../data/events";

function FestivalsPage() {
  const festivalEvents = events.filter(
    (events) => events.category === "Festival",
  );

  return (
    <div>
      <h1>Festivali</h1>

      {festivalEvents.map((events) => (
        <EventCard key={events.id} event={events} />
      ))}
    </div>
  );
}
export default FestivalsPage;
