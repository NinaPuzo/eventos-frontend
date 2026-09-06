import { Outlet } from "react-router-dom";
import AdminSidebar from "../../components/admin/AdminSidebar";

function AdminLayout() {
  return (
    <div className="flex min-h-screen flex-col md:flex-row bg-[#F4F4F4]">
      <AdminSidebar />

      <main className="min-w-0 flex-1 px-30 py-20 bg-white">
        <Outlet />
      </main>
    </div>
  );
}
export default AdminLayout;
