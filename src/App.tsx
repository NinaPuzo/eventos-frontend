import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminPage from "./pages/AdminPage";
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

function App() {
  const [userRoleId, setUserRoleId] = useState("1");

  const authContext = useContext(AuthContext);

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
    <div className="flex flex-col min-h-screen">
      <Header />

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
                element={<AdminPage />}
                allowedRoleIds={["1"]}
                userRoleId={userRoleId}
              ></ProtectedRoute>
            }
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
