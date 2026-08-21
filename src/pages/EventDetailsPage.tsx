import { useParams } from "react-router-dom";

function EventDetailsPage() {
  const { id } = useParams();

  return (
    <div>
      <h1>Detalji dogadjaja {id}</h1>
    </div>
  );
}
export default EventDetailsPage;
