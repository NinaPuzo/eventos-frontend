import type { Event } from "@shared/types/Event";

type OrganizerEventCardProps = {
  event: Event;
  onViewSalesDetails: () => void;
  onEditEvent: () => void;
  onCancelEvent: () => Promise<boolean>;
};

function OrganizerEventCard({
  event,
  onViewSalesDetails,
  onEditEvent,
  onCancelEvent,
}: OrganizerEventCardProps) {
  return (
    <div>
      <div>
        <p>Slika događaja </p>
      </div>

      <div className="flex flex-1 flex-col p-6 md:p-8">
        <h2 className="text-[24px] font-semibold">{event.eventName}</h2>

        <p>{new Date(event.startTime).toLocaleDateString("sr-RS")}</p>

        <p className="text-[#777777]">{event.locationName}</p>

        <div className="mt-auto flex flex-col justify-end gap-3 sm:flex-row">
          <button
            type="button"
            onClick={onViewSalesDetails}
            className="rounded-full border px-7 py-2"
          >
            Pregledaj prodaju
          </button>

          <button
            type="button"
            onClick={onEditEvent}
            className="rounded-full border px-7 py-2"
          >
            Edituj
          </button>

          {event.isCanceled ? (
            <span className="font-semibold text-[#E98400]">Otkazan</span>
          ) : (
            <button
              type="button"
              onClick={onCancelEvent}
              className="rounded-full border bg-[#E98400] px-7 py-2"
            >
              Otkaži događaj
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
export default OrganizerEventCard;
