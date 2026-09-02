import { useContext } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

function OrganizerSideBar() {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("OrganizerSideBar mroa biti unutar AuthProvider-a.");
  }

  const { currentUser } = authContext;

  const initial = currentUser?.firstName?.charAt(0).toUpperCase() ?? "O";

  const linkClassName = ({ isActive }: { isActive: boolean }) =>
    `block rounded-lg px-4 py-3 transition-colors ${
      isActive
        ? "bg-[#353535] font-semibold text-white"
        : "text-gray-300 hover:bg-[#2C2C2C] hover:text-white"
    }`;

  return (
    <aside className="w-full border-b text-lg border-gray-600 p-4 md:min-h-screen md:w-86 md:border-r md:border-b-0  shadow-[0_6px_12px_-8px_rgba(0,0,0,0.7)] md:shadow-[8px_0_16px_-8px_rgba(0,0,0,0.7)]">
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
    </aside>
  );
}
export default OrganizerSideBar;
