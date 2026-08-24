import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEventsById } from "../api/eventsService";
import type { Event } from "@shared/types/Event";

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
    <div>
      <h1>Dogadjaj je: {event?.name}</h1>
      <p>Opis dogadjaja: {event?.description}</p>
    </div>
  );
}
export default EventDetailsPage;
