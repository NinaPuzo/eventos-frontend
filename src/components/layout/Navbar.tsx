import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav className="flex flex-row gap-10 ">
      <Link to="/">Početna strana</Link>
      <Link to="/events?category=sport">Sport</Link>
      <Link to="/events?category=koncert">Koncerti</Link>
      <Link to="/events?category=festival">Festivali</Link>
    </nav>
  );
}
export default NavBar;
