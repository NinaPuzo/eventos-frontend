import { NavLink } from "react-router-dom";

function AdminSidebar() {
  return (
    <aside className="min-h-screen w-86 border-r border-[#C8C2C2] bg-white p-6 shadow-xl">
      <nav className="flex flex-col gap-4">
        <NavLink
          to="/admin/users"
          className={({ isActive }) =>
            `rounded-xl px-4 py-3 transition ${
              isActive
                ? "bg-[#E98400] text-white"
                : "text-[#333333] hover:bg-[#FFF3E3]"
            }`
          }
        >
          Pregled korisnika
        </NavLink>
      </nav>
    </aside>
  );
}
export default AdminSidebar;
