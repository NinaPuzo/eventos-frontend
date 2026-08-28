import { Link, useNavigate } from "react-router-dom";
import NavBar from "./Navbar";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";

function Header() {
  const navigate = useNavigate();

  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("Header mora biti unutar AuthContext.Provider-a");
  }

  const { currentUser, setCurrentUser } = authContext;

  function handleLogout() {
    setCurrentUser(null);

    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    navigate("/");
  }

  return (
    <header className="flex w-full h-20 items-center justify-between p-10 bg-mauve-200">
      <Link to="/">Eventos</Link>

      <NavBar />

      <div className="flex gap-4">
        {currentUser ? (
          <>
            <Link to="/profile">Profil</Link>
            <button
              type="button"
              onClick={handleLogout}
              className="cursor-pointer"
            >
              Odjavi se
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Prijavi se</Link>
            <Link to="/register">Registruj se</Link>
            <Link to="/cart">Korpa</Link>
          </>
        )}
      </div>
    </header>
  );
}
export default Header;
