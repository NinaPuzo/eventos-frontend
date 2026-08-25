import { Link, useNavigate } from "react-router-dom";
import NavBar from "./Navbar";
import type { User } from "@shared/types/User";

type HeaderProps = {
  currentUser: User | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
};

function Header({ currentUser, setCurrentUser }: HeaderProps) {
  const navigate = useNavigate();

  function handleLogout() {
    setCurrentUser(null);

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
          </>
        )}
      </div>
    </header>
  );
}
export default Header;
