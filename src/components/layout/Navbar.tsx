import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav className="flex flex-row gap-10 bg-gray-300 pr-20 pl-20">
      <Link to="/">Pocetna strana</Link>
      <Link to="/sport">Sport</Link>
      <Link to="/concerts">Koncerti</Link>
      <Link to="/festivals">Festivali</Link>
    </nav>
  );
}
export default NavBar;
