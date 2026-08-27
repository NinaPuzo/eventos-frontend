import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEventsById } from "../api/eventsService";
import type { Event } from "@shared/types/Event";
import EventInfo from "../components/events/EventInfo";

function EventDetailsPage() {
  const { id } = useParams();
  const [event, setEvent] = useState<Event | undefined>(undefined);

  useEffect(() => {
    async function loadEvent() {
      const receivedEvent = await getEventsById(Number(id));

      setEvent(receivedEvent);
    }

    loadEvent();
  }, [id]);

  return (
    <div className="flex flex-col  w-full py-10 ">
      <div className="flex flex-row mx-auto w-[90%] bg-mauve-100 p-10 gap-10 min-h-[400px]">
        <div className="flex w-[35%] justify-center border bg-mauve-200">
          <img alt="Slika dogadjaja"></img>
        </div>

        {event && <EventInfo event={event} />}
      </div>

      <div className="mx-auto mt-10 w-[90%] border p-10">
        <h2 className="text-xl font-semibold">Opis dogadjaja</h2>
        <p>{event?.description}</p>
      </div>
    </div>
  );
}
export default EventDetailsPage;
