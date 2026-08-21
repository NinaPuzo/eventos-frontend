import { Link } from "react-router-dom";
import NavBar from "./Navbar";

function Header() {
  return (
    <header className="flex w-full h-20 items-center justify-between p-10 bg-mauve-200">
      <Link to="/">Eventos</Link>

      <NavBar />

      <div className="flex gap-4">
        <Link to="/login">Prijavi se</Link>
        <Link to="/register">Registruj se</Link>
      </div>
    </header>
  );
}
export default Header;
