import { useEffect, useState } from "react";
import Input from "../../components/global/Input";
import Select from "../../components/global/Select";
import type { Category } from "@shared/types/Category";
import { getCategories } from "../../api/categoryService";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import type { User } from "@shared/types/User";

function CreateEventPage() {
  const [eventName, setEventName] = useState("");
  const [description, setDescription] = useState("");
  const [locationName, setLocationName] = useState("");
  const [capacity, setCapacity] = useState(0);
  const [ticketCost, setTicketCost] = useState(0);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [imagePath, setImagePath] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [availableControllers, setAvailableControllers] = useState<User[]>([]);
  const [controllerIds, setControllerIds] = useState<string[]>([]);

  useEffect(() => {
    async function loadCategories() {
      const receivedCategories = await getCategories();
      setCategories(receivedCategories);
    }

    loadCategories();
  }, []);

  function handleChange(controllerId: string) {
    setControllerIds((controllerIds) =>
      controllerIds.includes(controllerId)
        ? controllerIds.filter((id) => id !== controllerId)
        : [...controllerIds, controllerId],
    );
  }

  return (
    <div className="flex flex-col border-[2px] rounded-[54px] border-[#B0B0B0] p-14 h-full">
      <h1 className="text-[36px] font-semibold">Kreiraj događaj</h1>
      <div className="grid grid-cols-2">
        <Input
          id="eventName"
          type="text"
          value={eventName}
          onChange={(event) => setEventName(event.target.value)}
          label="Naziv događaja"
          className="col-span-2"
        />

        <Input
          id="eventDescription"
          type="text"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          label="Opis događaja"
          className="col-span-2"
        />

        <Select
          label="Kategorija"
          id="category"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          options={categories.map((category) => ({
            value: category.id,
            label: category.categoryName,
          }))}
        />

        <Input
          id="eventLocation"
          type="text"
          value={locationName}
          onChange={(event) => setLocationName(event.target.value)}
          label="Lokacija"
          className="col-span-2"
        />

        <div className="col-span-2">
          <div className="flex flex-row gap-3">
            <div className="flex flex-col gap-3">
              <label htmlFor="startTime">Početak događaja</label>

              <DatePicker
                id="startTime"
                selected={startTime ? new Date(startTime) : null}
                onChange={(date: Date | null) =>
                  setStartTime(date ? date.toISOString() : "")
                }
                showTimeSelect
                dateFormat="dd.MM.yyyy HH:mm"
                placeholderText="Izaberi datum i vreme"
              />
            </div>

            <div className="flex flex-col gap-3">
              <label htmlFor="endTime">Kraj događaja</label>

              <DatePicker
                id="endTime"
                selected={endTime ? new Date(endTime) : null}
                onChange={(date: Date | null) =>
                  setEndTime(date ? date.toISOString() : "")
                }
                showTimeSelect
                dateFormat="dd.MM.yyyy HH:mm"
                placeholderText="Izaberi datum i vreme"
              />
            </div>
          </div>
        </div>

        <Input
          id="eventCapacity"
          type="number"
          value={capacity}
          onChange={(event) => setCapacity(Number(event.target.value))}
          label="Maksimalni kapacitet"
          className="col-span-2"
        />

        <Input
          id="ticketCost"
          type="number"
          value={ticketCost}
          onChange={(event) => setTicketCost(Number(event.target.value))}
          label="Cena"
          className="col-span-2"
        />

        <Input
          id="imagePath"
          type="text"
          value={imagePath}
          onChange={(event) => setImagePath(event.target.value)}
          label="Fotografija događaja"
          className="col-span-2"
        />

        <div className="col-span-2 flex flex-col gap-2">
          <p className="text-white">Izaberi kontrolore</p>

          {availableControllers.map((controller) => (
            <label key={controller.id} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={controllerIds.includes(controller.id)}
                onChange={() => handleChange(controller.id)}
              />
              {controller.firstName} {controller.lastName}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
export default CreateEventPage;
