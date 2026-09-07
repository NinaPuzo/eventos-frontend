import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminPage from "./pages/admin/AdminPage";
import AdminLayout from "./pages/admin/AdminLayout";
import { useContext, useEffect, useState } from "react";
import RegisterPage from "./pages/RegisterPage";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import EventDetailsPage from "./pages/EventDetailsPage";
import EventPage from "./pages/EventPage";
import CartPage from "./pages/CartPage";
import { getUser } from "./api/userService";
import AuthContext from "./context/AuthContext";
import CheckoutPage from "./pages/CheckoutPage";
import OrganizerLayout from "./pages/organizer/OrganizerLayout";
import OrganizerEventsPage from "./pages/organizer/OrganizerEventsPage";
import CreateEventPage from "./pages/organizer/CreateEventPage";

function App() {
  const authContext = useContext(AuthContext);
  const location = useLocation();

  const isOrganizerPage = location.pathname.startsWith("/organizer");
  const isAdminPage = location.pathname.startsWith("/admin");

  const [error, setError] = useState("");

  if (!authContext) {
    throw new Error("App mora biti unutar AuthProvider-a");
  }

  const { currentUser } = authContext;

  useEffect(() => {
    async function getCurrentUser() {
      const user = await getUser();
      authContext?.setCurrentUser(user);
    }

    if (localStorage.getItem("accessToken")) {
      getCurrentUser();
    }
  }, []);

  return (
    <div
      className={`flex flex-col min-h-screen ${
        isOrganizerPage || isAdminPage ? "bg-[#232323]" : "bg-[#1A1A1A]"
      }`}
    >
      {!isOrganizerPage && !isAdminPage && <Header />}

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/events" element={<EventPage />} />
          <Route path="/event/:id" element={<EventDetailsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute
                element={<AdminLayout />}
                allowedRoleIds={["3FF45A87-26B1-4D17-A18A-EC3A63EF9969"]}
                userRoleId={currentUser?.roleId ?? ""}
              ></ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="users" replace />} />
            <Route path="users" element={<AdminPage />} />
          </Route>

          {/* Vratiti ProtectedRoute kada backend počne da vraća roleId */}
          <Route path="/organizer" element={<OrganizerLayout />}>
            <Route index element={<Navigate to="events" replace />} />
            <Route path="events" element={<OrganizerEventsPage />} />
            <Route path="events/create" element={<CreateEventPage />} />
          </Route>
        </Routes>
      </main>

      {!isOrganizerPage && !isAdminPage && <Footer />}
    </div>
  );
}

export default App;
