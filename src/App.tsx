import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminPage from "./pages/AdminPage";
import { useState } from "react";
import RegisterPage from "./pages/RegisterPage";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import EventDetailsPage from "./pages/EventDetailsPage";
import EventPage from "./pages/EventPage";
import type { User } from "@shared/types/User";

function App() {
  const [userRoleId, setUserRoleId] = useState("1");

  const [currentUser, setCurrentUser] = useState<User | null>(null);

  return (
    <div className="flex flex-col min-h-screen">
      <BrowserRouter>
        <Header currentUser={currentUser} setCurrentUser={setCurrentUser} />

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/login"
              element={<LoginPage setCurrentUser={setCurrentUser} />}
            />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/events" element={<EventPage />} />
            <Route path="/event/:id" element={<EventDetailsPage />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute
                  element={<AdminPage />}
                  allowedRoleIds={["1"]}
                  userRoleId={userRoleId}
                ></ProtectedRoute>
              }
            />
          </Routes>
        </main>

        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
