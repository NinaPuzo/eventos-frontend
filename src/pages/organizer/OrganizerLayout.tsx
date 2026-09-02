import { Outlet } from "react-router-dom";
import OrganizerSideBar from "../../components/organizer/OrganizerSideBar";

function OrganizerLayout() {
  return (
    /*<div className="flex min-h-screen flex-col bg-white md:flex-row">
      <OrganizerSideBar />

      <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-10">
        <Outlet />
      </main>
    </div>*/

    <div className="flex min-h-screen flex-col md:flex-row text-white">
      <OrganizerSideBar />

      <main className="min-w-0 flex-1">
        <Outlet />
      </main>
    </div>
  );
}
export default OrganizerLayout;
