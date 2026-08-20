import EventCard from "../components/events/EventCard";

function HomePage() {
  return (
    <div className="grid grid-cols-2 gap-5 p-20 place-items-center">
      <EventCard />
      <EventCard />
      <EventCard />
      <EventCard />
      <EventCard />
      <EventCard />
    </div>
  );
}

export default HomePage;
