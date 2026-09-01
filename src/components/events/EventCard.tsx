import type { Event } from "@shared/types/Event";
import { Link } from "react-router-dom";
type EventCardProps = {
  event: Event;
};

function EventCard({ event }: EventCardProps) {
  const startDate = new Date(event.startTime);
  const date = startDate.toLocaleDateString("sr-Latn-RS", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
  const time = startDate.toLocaleTimeString("sr-RS", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="flex flex-col w-[216px]">
      <Link to={`/event/${event.id}`}>
        <img
          alt="Slika dogadjaja"
          className="border rounded-lg p-4 w-[216px] h-[312px] text-white"
        />
      </Link>

      <div className="pt-2">
        <h2 className="text-white text-[18px] font-semibold">
          {event.eventName}
        </h2>
        <p className="text-[#8B8B8B] text-[17px]">
          {date} - {time}
        </p>

        <p className="text-[#8B8B8B] text-[17px]">{event.locationName}</p>
      </div>
    </div>
  );
}
export default EventCard;
