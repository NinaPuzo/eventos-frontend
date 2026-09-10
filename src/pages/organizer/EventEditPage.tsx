import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  addControllersToEvent,
  getAssignedControllers,
  getAvailableControllers,
  getEventImage,
  getEventsById,
  updateEvent,
} from "../../api/eventsService";
import type { Event } from "@shared/types/Event";
import Select from "../../components/global/Select";
import Input from "../../components/global/Input";
import DatePicker from "react-datepicker";
import Button from "../../components/global/Button";
import DataTable, { type TableColumn } from "react-data-table-component";
import type { Category } from "@shared/types/Category";
import type { User } from "@shared/types/User";
import { getCategories } from "../../api/categoryService";

function EventEditingPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");

  const [event, setEvent] = useState<Event | null>(null);

  const [eventName, setEventName] = useState("");
  const [description, setDescription] = useState("");
  const [locationName, setLocationName] = useState("");
  const [capacity, setCapacity] = useState("");
  const [ticketCost, setTicketCost] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  //const [imagePath, setImagePath] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [categoryId, setCategoryId] = useState("");
  const [availableControllers, setAvailableControllers] = useState<User[]>([]);
  const [controllerIds, setControllerIds] = useState<string[]>([]);

  const [assignedControllers, setAssignedControllers] = useState<User[]>([]);

  const [controllerSearch, setControllerSearch] = useState("");

  const [isControllerModalOpen, setIsControllerModalOpen] = useState(false);

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

  useEffect(() => {
    async function loadEvent() {
      if (!id) {
        return;
      }

      try {
        const receivedEvent = await getEventsById(id);
        setEvent(receivedEvent);

        if (!receivedEvent) return;

        //const eventImage = await getEventImage(receivedEvent.id);

        setEventName(receivedEvent.eventName);
        setDescription(receivedEvent.description ?? "");
        setLocationName(receivedEvent.locationName);
        setCapacity(String(receivedEvent.capacity ?? 0));
        setTicketCost(String(receivedEvent.ticketCost));
        setCategoryId(receivedEvent.categoryId);
        setStartTime(receivedEvent.startTime);
        setEndTime(receivedEvent.endTime ?? "");
        //setImage(eventImage);
      } catch (error) {
        console.error("Greška pri učitavanju događaja.", error);
      }
    }

    loadEvent();
  }, [id]);

  useEffect(() => {
    async function loadCategories() {
      const receivedCategories = await getCategories();
      setCategories(receivedCategories);
    }

    loadCategories();
  }, []);

  useEffect(() => {
    async function loadAssignedControllers() {
      if (!id) return;

      try {
        const receivedControllers = await getAssignedControllers(id);
        setAssignedControllers(receivedControllers);
      } catch (error) {
        console.error("Greška pri učitavanju kontrolora.", error);
      }
    }

    console.log(assignedControllers);
    loadAssignedControllers();
  }, [id]);

  function handleSelectedRows(selection: { selectedRows: User[] }) {
    const selectedControllers = selection.selectedRows;

    const selectedControllersIds = selectedControllers.map(
      (controller) => controller.id,
    );

    setControllerIds(selectedControllersIds);
  }

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const selectedImage = event.target.files?.[0];

    if (!selectedImage) {
      setImage(null);
      return;
    }

    setImage(selectedImage);
    console.log(selectedImage);
  }

  async function handleOpenControllerModal() {
    try {
      const receivedControllers = await getAvailableControllers(startTime);

      setAvailableControllers(receivedControllers);
      setIsControllerModalOpen(true);
    } catch (error) {
      console.error("Greška pri učitavanju dostupnih kontrolora.", error);
    }
  }

  // function handleAddControllers() {
  //   const selectedControllers = availableControllers.filter((controller) =>
  //     controllerIds.includes(controller.id),
  //   );

  //   setAssignedControllers((currentControllers) => [
  //     ...currentControllers,
  //     ...selectedControllers.filter(
  //       (selectedController) =>
  //         !currentControllers.some(
  //           (controller) => controller.id === selectedController.id,
  //         ),
  //     ),
  //   ]);

  //   setIsControllerModalOpen(false);
  // }
  async function handleAddControllers() {
    if (!id || controllerIds.length === 0) return;

    try {
      await addControllersToEvent(id, controllerIds);

      const updatedControllers = await getAssignedControllers(id);

      console.log("Kontrolori posle dodavanja:", updatedControllers);

      setAssignedControllers(updatedControllers);

      setControllerIds([]);
      setIsControllerModalOpen(false);
    } catch (error) {
      console.error("Greška pri dodavanju kontrolora.", error);
    }
  }

  async function handleUpdateEvent() {
    if (!id || !event || !startTime) {
      setMessage("Nedostaju podaci potrebni za izmenu događaja.");
      return;
    }

    try {
      setIsSaving(true);
      setMessage("");

      const isUpdated = await updateEvent(id, {
        userId: event.userId,
        categoryId,
        image,
        eventName,
        description,
        locationName,
        capacity: Number(capacity),
        ticketCost: Number(ticketCost),
        isCanceled: event.isCanceled,
        startTime,
        endTime,
        controllerIds: assignedControllers.map((controller) => controller.id),
      });

      if (isUpdated) {
        navigate("/organizer/events");
      } else {
        setMessage("Izmena događaja nije uspela.");
      }
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="mx-auto min-h-full w-full max-w-6xl rounded-[10px] border border-[#E5E5E5] p-4 text-[#333333] md:p-6 lg:p-10">
      <h1 className="mb-8 text-3xl font-semibold md:text-4xl">
        Izmeni događaj
      </h1>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="flex min-w-0 flex-col gap-4">
          <Select
            id="category"
            label="Kategorija"
            value={categoryId}
            onChange={(event) => setCategoryId(event.target.value)}
            options={
              categories &&
              categories.map((category) => ({
                value: category.id,
                label: category.categoryName,
              }))
            }
            className="w-full h-[48px] rounded-[10px] px-5 text-[16px] text-black placeholder:text-[#ADADAD]"
          />

          <Input
            id="eventName"
            type="text"
            value={eventName}
            onChange={(event) => setEventName(event.target.value)}
            placeholder="Naziv događaja"
            inputClassName="h-12 w-full rounded-[10px] border border-[#ADADAD] px-4 text-[16px] text-black placeholder:text-[#ADADAD] outline-none"
            autoComplete="off"
          />

          <textarea
            id="eventDescription"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Opis"
            rows={5}
            className="w-full resize-none rounded-[10px] border border-[#ADADAD] px-5 py-3 text-[16px] text-[#333333] placeholder:text-[#A5A5A5] outline-none focus:border-[#E98400]"
          />

          <Input
            id="eventLocation"
            type="text"
            value={locationName}
            onChange={(event) => setLocationName(event.target.value)}
            placeholder="Lokacija"
            inputClassName="h-12 w-full rounded-[10px] border border-[#ADADAD] px-4 text-[16px] text-black placeholder:text-[#ADADAD] outline-none"
            autoComplete="off"
          />

          <Input
            id="eventCapacity"
            type="number"
            value={capacity}
            onChange={(event) => setCapacity(event.target.value)}
            placeholder="Maksimalni kapacitet"
            inputClassName="h-12 w-full rounded-[10px] border border-[#ADADAD] px-4 text-[16px] text-black placeholder:text-[#ADADAD] outline-none"
            autoComplete="off"
          />

          <Input
            id="ticketCost"
            type="number"
            value={ticketCost}
            onChange={(event) => setTicketCost(event.target.value)}
            placeholder="Cena"
            inputClassName="h-12 w-full rounded-[10px] border border-[#ADADAD] px-4 text-[16px] text-black placeholder:text-[#ADADAD] outline-none"
            autoComplete="off"
          />

          <div className="flex flex-col items-center gap-12">
            <div className="flex h-11 w-full items-center gap-4">
              <label
                htmlFor="image"
                className="flex h-11 w-[250px] shrink-0 cursor-pointer items-center justify-center whitespace-nowrap rounded-[10px] border border-[#181818] bg-white text-sm font-medium text-[#181818] transition hover:bg-gray-100"
              >
                Izaberi novu sliku
              </label>

              <input
                id="image"
                type="file"
                accept="image/jpeg,image/png,image/gif,image/webp"
                onChange={handleImageChange}
                className="hidden"
              />

              <div className="flex h-12 min-w-0 flex-1 items-center rounded-[10px] border border-gray-300 px-4">
                <span className="truncate text-sm text-gray-500">
                  {image ? image.name : "Slika nije izabrana"}
                </span>
              </div>
            </div>
          </div>
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

          {/* <Button
            type="button"
            label="Prikaži dostupne kontrolore"
            onClick={handleAvailableControllers}
            className="flex h-[48px] w-full cursor-pointer items-center justify-center rounded-[10px] border "
          /> */}

          <Button
            type="button"
            label="Dodaj kontrolore"
            onClick={handleOpenControllerModal}
            className="flex h-[48px] w-full cursor-pointer items-center justify-center rounded-[10px] border whitespace-nowrap rounded-[10px] border border-[#181818] bg-white text-sm font-medium text-[#181818] transition hover:bg-gray-100"
          />

          <div className="w-full overflow-hidden rounded-md border border-gray-300">
            <DataTable
              columns={controllerColumns}
              data={assignedControllers}
              noDataComponent="Nema izabranih kontrolora"
            />
          </div>

          {/* <div className="flex flex-col gap-2">
            <label htmlFor="controllerSearch">Izaberi kontrolore</label>

            <input
              id="controllerSearch"
              type="text"
              value={controllerSearch}
              onChange={(event) => setControllerSearch(event.target.value)}
              placeholder="Pretraga kontrolora"
              className="w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-[#333333] outline-none"
            />
          </div> */}

          {/* <div className="w-full overflow-hidden rounded-md border border-gray-300">
            <DataTable
              columns={controllerColumns}
              data={availableControllers}
              selectableRows
              onSelectedRowsChange={handleSelectedRows}
              noDataComponent="Nema dostupnih kontrolora"
              fixedHeader
              fixedHeaderScrollHeight="300px"
            />
          </div> */}
        </div>

        {/* <div className="mt-8 flex justify-end">
          <button
            type="button"
            onClick={handleUpdateEvent}
            disabled={isSaving}
            className="rounded-[10px] bg-[#181818] px-8 py-3 font-medium text-white transition hover:scale-[1.03] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSaving ? "Čuvanje..." : "Sačuvaj izmene"}
          </button>
        </div> */}
      </div>

      <div className="mt-8 flex justify-end">
        <button
          type="button"
          onClick={handleUpdateEvent}
          disabled={isSaving}
          className=" w-full flex cursor-pointer bg-[#E98400] items-center justify-center h-[48px] rounded-[10px] font-semibold text-xl text-white transition hover:scale-[1.03] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSaving ? "Čuvanje..." : "Sačuvaj izmene"}
        </button>
      </div>

      {isControllerModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 ">
          <div className="w-full max-w-2xl rounded-[10px] bg-white p-10">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Dodaj kontrolore</h2>

              <button
                type="button"
                onClick={() => setIsControllerModalOpen(false)}
                className="cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="w-full overflow-hidden rounded-md border border-gray-300">
              <DataTable
                columns={controllerColumns}
                data={availableControllers}
                selectableRows
                onSelectedRowsChange={handleSelectedRows}
                noDataComponent="Nema dostupnih kontrolora"
                fixedHeader
                fixedHeaderScrollHeight="300px"
              />
            </div>

            <div className="mt-6 flex justify-end">
              <Button
                type="button"
                label="Potvrdi izbor kontrolora"
                onClick={handleAddControllers}
                className="rounded-[10px] bg-[#E98400] px-6 py-3 text-white w-full cursor-pointer  w-full origin-center rounded-[10px] bg-[#F18700] py-3 text-white transition-all duration-200 ease-out hover:scale-[1.02] hover:bg-[#D97800] hover:shadow-md active:scale-[0.99]"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default EventEditingPage;
