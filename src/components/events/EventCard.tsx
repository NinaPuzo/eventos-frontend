import { formatEventDate } from "../../shared/functions/formatEventDate";
import type { Event } from "@shared/types/Event";
import { Link } from "react-router-dom";

type EventCardProps = {
  event: Event;
};

function EventCard({ event }: EventCardProps) {
  const { date, time } = formatEventDate(event.startTime);
  return (
    <div className="flex w-[216px] flex-col">
      <Link to={`/event/${event.id}`}>
        <img
          src={`https://eventosapi-abeueqcbg8grcqfe.austriaeast-01.azurewebsites.net/api/events/${event.id}/image`}
          alt="Slika dogadjaja"
          className="h-[312px] w-[216px] rounded-lg object-cover"
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
