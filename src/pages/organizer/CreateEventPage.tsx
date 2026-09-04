import { useContext, useEffect, useState } from "react";
import { getCategories } from "../../api/categoryService";
import { getAvailableControllers } from "../../api/userService";
import Input from "../../components/global/Input";
import Select from "../../components/global/Select";
import DatePicker from "react-datepicker";
import DataTable, { type TableColumn } from "react-data-table-component";
import Button from "../../components/global/Button";
import type { User } from "@shared/types/User";
import type { Category } from "@shared/types/Category";
import "react-datepicker/dist/react-datepicker.css";
import AuthContext from "../../context/AuthContext";
import type { CreateEventRequest } from "@shared/types/CreateEventRequest";
import { createEvent } from "../../api/eventsService";

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

  const [controllerSearch, setControllerSearch] = useState("");

  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("CreateEventPage mora biti unutar AuthProvider-a.");
  }

  const { currentUser } = authContext;

  const controllerColumns: TableColumn<User>[] = [
    {
      name: "Ime",
      selector: (controller) => controller.firstName,
      sortable: true,
    },
    {
      name: "Prezime",
      selector: (controller) => controller.lastName,
      sortable: true,
    },

    {
      name: "Email",
      selector: (controller) => controller.email,
    },
  ];

  const filterController = availableControllers.filter((controller) => {
    const searchValue = controllerSearch.toLowerCase();

    return (
      controller.firstName.toLowerCase().includes(searchValue) ||
      controller.lastName.toLowerCase().includes(searchValue) ||
      controller.email.toLowerCase().includes(searchValue)
    );
  });

  useEffect(() => {
    async function loadCategories() {
      const receivedCategories = await getCategories();
      setCategories(receivedCategories);
    }

    loadCategories();
  }, []);

  function handleSelectedRows(selection: { selectedRows: User[] }) {
    const selectedControllers = selection.selectedRows;

    const selectedControllersIds = selectedControllers.map(
      (controller) => controller.id,
    );

    setControllerIds(selectedControllersIds);
  }
  {
    /* funkcija kada bude povezano sa apijem */
  }
  /*async function handleAvailableControllers() {
    if (!startTime || !endTime) {
      alert("Prvo unesite datum i vreme početka i završetka događaja.");
      return;
    }

    try {
      const controllers = await getAvailableControllers(startTime, endTime);
      setAvailableControllers(controllers);
    } catch (error) {
      console.error("Greška pri učitavanju kontrolora:", error);
    }
  }*/

  async function handleAvailableControllers() {
    if (!startTime) {
      return;
    }

    const controllers = await getAvailableControllers(startTime);
    setAvailableControllers(controllers);
  }

  async function handleSubmit() {
    if (!currentUser) {
      alert("Morate biti prijavljeni da biste kreirali događaj.");
      return;
    }

    const newEvent: CreateEventRequest = {
      userId: currentUser.id,
      categoryId,
      imagePath,
      eventName,
      description,
      locationName,
      capacity,
      ticketCost,
      isCanceled: false,
      startTime: new Date(startTime).toISOString(),
      endTime: new Date(endTime).toISOString(),
    };

    try {
      await createEvent(newEvent);
      alert("Događaj je uspešno kreiran!");
    } catch (error) {
      console.error("Greska");
    }
  }

  return (
    <div className="h-full rounded-[54px] border-2 border-[#B0B0B0] p-14 text-[#333333]">
      <h1 className="mb-8 text-[36px] font-semibold">Kreiraj događaj</h1>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* LEVA STRANA */}
        <div className="flex flex-col gap-4">
          <Input
            id="eventName"
            type="text"
            value={eventName}
            onChange={(event) => setEventName(event.target.value)}
            label="Naziv događaja"
          />

          <Input
            id="eventDescription"
            type="text"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            label="Opis događaja"
          />

          <Select
            label="Kategorija"
            id="category"
            value={categoryId}
            onChange={(event) => setCategoryId(event.target.value)}
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
          />

          <Input
            id="eventCapacity"
            type="number"
            value={capacity}
            onChange={(event) => setCapacity(Number(event.target.value))}
            label="Maksimalni kapacitet"
          />

          <Input
            id="ticketCost"
            type="number"
            value={ticketCost}
            onChange={(event) => setTicketCost(Number(event.target.value))}
            label="Cena"
          />

          <Input
            id="imagePath"
            type="text"
            value={imagePath}
            onChange={(event) => setImagePath(event.target.value)}
            label="Fotografija događaja"
          />
        </div>

        {/* DESNA STRANA */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="flex flex-1 flex-col gap-2">
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
                wrapperClassName="w-full"
                className="w-full rounded-md border border-gray-300 px-4 py-3"
              />
            </div>

            <div className="flex flex-1 flex-col gap-2">
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
                wrapperClassName="w-full"
                className="w-full rounded-md border border-gray-300 px-4 py-3"
              />
            </div>
          </div>

          <Button
            type="button"
            label="Prikaži dostupne kontrolore"
            onClick={handleAvailableControllers}
            className="flex cursor-pointeritems-center justify-center rounded-xl border "
          />

          <div className="flex flex-col gap-2">
            <label htmlFor="controllerSearch">Izaberi kontrolore</label>

            <input
              id="controllerSearch"
              type="text"
              value={controllerSearch}
              onChange={(event) => setControllerSearch(event.target.value)}
              placeholder="Pretraga kontrolora"
              className="rounded-md border border-gray-300 bg-white px-4 py-3 text-[#333333] outline-none"
            />
          </div>

          <div className="overflow-hidden rounded-md border border-gray-300">
            <DataTable
              columns={controllerColumns}
              data={filterController}
              selectableRows
              onSelectedRowsChange={handleSelectedRows}
              noDataComponent="Nema dostupnih kontrolora"
            />
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <Button type="button" label="Kreiraj događaj" onClick={handleSubmit} />
      </div>
    </div>
  );
}
export default CreateEventPage;
