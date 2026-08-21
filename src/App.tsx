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
import SportsPage from "./pages/SportsPage";
import ConcertsPage from "./pages/ConcertsPage";
import FestivalsPage from "./pages/FestivalsPage";

function App() {
  const [userRoleId, setUserRoleId] = useState("1");

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/events/:id" element={<EventDetailsPage />} />
        <Route path="/sport" element={<SportsPage />} />
        <Route path="/concerts" element={<ConcertsPage />} />
        <Route path="/festivals" element={<FestivalsPage />} />
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

      <Footer />
    </BrowserRouter>
  );
}

export default App;
