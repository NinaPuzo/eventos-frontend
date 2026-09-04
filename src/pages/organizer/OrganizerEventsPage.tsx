import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import { getEvents } from "../../api/eventsService";
import type { Event } from "@shared/types/Event";
import { useNavigate } from "react-router-dom";
import OrganizerEventCard from "../../components/organizer/OrganizerEventCard";

function OrganizerEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error(
      "OrganizerEventsPage mora biti unutar AuthContext.Provider-a",
    );
  }

  const { currentUser } = authContext;

  useEffect(() => {
    async function loadOrganizerEvents() {
      if (!currentUser) {
        return;
      }

      try {
        const receivedEvents = await getEvents();

        const organizerEvents = receivedEvents.filter(
          (event) => event.userId === currentUser.id,
        );

        setEvents(organizerEvents);
      } catch (error) {
        setError("Nije moguce ucitati dogadjaje.");
      }
    }

    loadOrganizerEvents();
  }, [currentUser]);

  return (
    <div className="p-8 text-[#333333]">
      <div className="mb-10">
        <h1> Pregled događaja</h1>

        <p className="mt-2 text-[#777777]">
          Pregled događaja koje ste kreirali
        </p>
      </div>

      {events.length === 0 ? (
        <p>Trenutno nemate kreiranih događaja.</p>
      ) : (
        <div className="flex flex-col gap-6">
          {events.map((event) => (
            <OrganizerEventCard
              key={event.id}
              event={event}
              onViewSalesDetails={() => navigate("/organizer/events/sales")}
              onEditEvent={() => navigate("/organizer/events/edit")}
            />
          ))}
        </div>
      )}
    </div>
  );
}
export default OrganizerEventsPage;
