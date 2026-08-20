import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminPage from "./pages/AdminPage";
import { useState } from "react";

function App() {
  const [userRoleId, setUserRoleId] = useState("1");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
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
    </BrowserRouter>
  );
}

export default App;
