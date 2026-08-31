import type { Event } from "@shared/types/Event";
import { Link } from "react-router-dom";

type EventCardProps = {
  event: Event;
};

function EventCard({ event }: EventCardProps) {
  return (
    <Link to={`/event/${event.id}`}>
      <div className="border rounded-lg p-4 w-64 h-40">
        <h2>{event.eventName}</h2>
        <p>{event.description}</p>
      </div>
    </Link>
  );
}
export default EventCard;
