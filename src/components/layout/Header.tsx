import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="flex w-full h-20 items-center justify-between p-10 bg-mauve-200">
      <Link to="/">Eventos</Link>

      <nav className="bg-mauve-400">Meni</nav>

      <div className="flex gap-4">
        <Link to="/login">Prijavi se</Link>
        <Link to="/register">Registruj se</Link>
      </div>
    </header>
  );
}
export default Header;
