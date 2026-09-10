import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import Button from "../global/Button";
import { useNavigate } from "react-router-dom";

function OrganizerSideBar() {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("OrganizerSideBar mroa biti unutar AuthProvider-a.");
  }

  const { currentUser, setCurrentUser } = authContext;

  const initial = currentUser?.firstName?.charAt(0).toUpperCase() ?? "O";

  const linkClassName = ({ isActive }: { isActive: boolean }) =>
    `block rounded-lg px-4 py-3 transition-colors ${
      isActive
        ? "bg-[#EAEAEA] font-semibold text-[#333333]"
        : "text-[#777777] hover:bg-[#F3F3F3]"
    }`;

  function handleLogout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setCurrentUser(null);
    navigate("/");
  }
  return (
    <aside className="flex flex-col h-screen shrink-0 overflow-y-auto z-10 w-full border-b border-[#C8C2C2] bg-white p-4 text-lg md:min-h-screen md:w-86 md:border-b-0 md:border-r md:shadow-[12px_0_25px_rgba(0,0,0,0.14)]">
      <div className="mb-6 flex items-center gap-3 border-b border-gray-700 pb-5">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-mauve-300 text-lg font-semibold text-white">
          {initial}
        </div>

        <div className="min-w-0">
          <p className="truncate font-semibold text-white">
            {currentUser
              ? `${currentUser.firstName} ${currentUser.lastName}`
              : "Organizator"}
          </p>

          <p className="truncate text-sm text-gray-400">{currentUser?.email}</p>
        </div>
      </div>

      <nav className="flex flex-col gap-4">
        <NavLink to="/organizer/events" end className={linkClassName}>
          Pregled događaja
        </NavLink>

        <NavLink to="/organizer/events/create" className={linkClassName}>
          Kreiraj novi događaj
        </NavLink>

        <NavLink to="/">Pogledaj javnu stranicu</NavLink>
      </nav>

      <Button
        type="button"
        label="Odjavi se"
        onClick={handleLogout}
        className="mt-auto w-full rounded-lg px-4 py-3 text-left cursor-pointer"
      />
    </aside>
  );
}
export default OrganizerSideBar;
