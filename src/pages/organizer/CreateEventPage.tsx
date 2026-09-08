import { useContext, useEffect, useState } from "react";
import { getCategories } from "../../api/categoryService";
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
import { createEvent, getAvailableControllers } from "../../api/eventsService";

function CreateEventPage() {
  const [eventName, setEventName] = useState("");
  const [description, setDescription] = useState("");
  const [locationName, setLocationName] = useState("");
  const [capacity, setCapacity] = useState("");
  const [ticketCost, setTicketCost] = useState("");
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

  useEffect(() => {
    if (!startTime || !endTime) {
      setAvailableControllers([]);
      setControllerIds([]);
    }
  }, [startTime, endTime]);

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
  async function handleAvailableControllers() {
    if (!startTime) {
      setAvailableControllers([]);
      setControllerIds([]);
      alert("Prvo unesite datum i vreme početka događaja.");
      return;
    }

    try {
      const controllers = await getAvailableControllers(startTime);
      setAvailableControllers(controllers);
    } catch (error) {
      console.error("Greška pri učitavanju kontrolora:", error);
      setAvailableControllers([]);
      setControllerIds([]);
    }
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
      capacity: Number(capacity),
      ticketCost: Number(ticketCost),
      isCanceled: false,
      startTime: new Date(startTime).toISOString(),
      endTime: new Date(endTime).toISOString(),
      controllerIds: controllerIds,
    };

    try {
      await createEvent(newEvent);
      alert("Događaj je uspešno kreiran!");
    } catch (error) {
      console.error("Greska");
    }
  }

  return (
    <div className="mx-auto h-full w-full max-w-6xl rounded-[10px] border border-[#E5E5E5] p-4 text-[#333333] md:p-6 lg:p-10">
      <h1 className="mb-8 text-3xl font-semibold md:text-4xl">
        Kreiraj događaj
      </h1>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="flex min-w-0 flex-col gap-4">
          <Select
            label="Kategorija"
            id="category"
            value={categoryId}
            onChange={(event) => setCategoryId(event.target.value)}
            options={
              categories &&
              categories.map((category) => ({
                value: category.id,
                label: category.categoryName,
              }))
            }
            className="w-full h-[48px] rounded-[10px] px-5 text-[16px] text-[#A5A5A5]"
          />

          <Input
            id="eventName"
            type="text"
            value={eventName}
            onChange={(event) => setEventName(event.target.value)}
            label="Naziv događaja"
            className="border rounded-[10px] h-[48px] w-full px-5 pb-1 text-[16px] text-[#A5A5A5] focus:border-transparent focus:outline-none focus:ring-0"
            autoComplete="off"
          />

          <textarea
            id="eventDescription"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Opis"
            className="border rounded-[10px]  w-full px-5 text-[16px] text-[#A5A5A5]"
          />

          <Input
            id="eventLocation"
            type="text"
            value={locationName}
            onChange={(event) => setLocationName(event.target.value)}
            label="Lokacija"
            className="border rounded-[10px] h-[48px] w-full px-5 text-[16px] text-[#A5A5A5]"
            autoComplete="off"
          />

          <Input
            id="eventCapacity"
            type="number"
            value={capacity}
            onChange={(event) => setCapacity(event.target.value)}
            label="Maksimalni kapacitet"
            className="border rounded-[10px] h-[48px] w-full px-5 text-[16px] text-[#A5A5A5]"
            autoComplete="off"
          />

          <Input
            id="ticketCost"
            type="number"
            value={ticketCost}
            onChange={(event) => setTicketCost(event.target.value)}
            label="Cena"
            className="border rounded-[10px] h-[48px] w-full px-5 text-[16px] text-[#A5A5A5]"
            autoComplete="off"
          />

          <Input
            id="imagePath"
            type="text"
            value={imagePath}
            onChange={(event) => setImagePath(event.target.value)}
            label="Fotografija događaja"
            className="border rounded-[10px] h-[48px] w-full px-5 text-[16px] text-[#A5A5A5]"
            autoComplete="off"
          />
        </div>

        <div className="flex min-w-0 flex-col gap-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="min-w-0">
              <label htmlFor="startTime" className="mb-2 block">
                Početak događaja
              </label>

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

            <div className="flex flex-1 flex-col ">
              <label htmlFor="endTime" className="mb-2 block">
                Kraj događaja
              </label>

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
            className="flex h-[48px] w-full cursor-pointer items-center justify-center rounded-[10px] border "
          />

          <div className="flex flex-col gap-2">
            <label htmlFor="controllerSearch">Izaberi kontrolore</label>

            <input
              id="controllerSearch"
              type="text"
              value={controllerSearch}
              onChange={(event) => setControllerSearch(event.target.value)}
              placeholder="Pretraga kontrolora"
              className="w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-[#333333] outline-none"
            />
          </div>

          <div className="w-full overflow-hidden rounded-md border border-gray-300">
            <DataTable
              columns={controllerColumns}
              data={availableControllers}
              selectableRows
              onSelectedRowsChange={handleSelectedRows}
              noDataComponent="Nema dostupnih kontrolora"
            />
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <Button
          type="button"
          label="Kreiraj događaj"
          onClick={handleSubmit}
          className=" w-full flex cursor-pointer bg-[#E98400] items-center justify-center h-[48px] rounded-[10px] font-semibold text-xl text-white "
        />
      </div>
    </div>
  );
}
export default CreateEventPage;
