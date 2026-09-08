import { Link, useNavigate } from "react-router-dom";
import NavBar from "./Navbar";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import logo from "../../assets/logo.svg";
import cartIcon from "../../assets/icons/cartIcon.svg";
import CartContext from "../../context/CartContext";
import { useLocation } from "react-router-dom";

type HeaderProps = {
  isOverlay?: boolean;
};

function Header({ isOverlay = false }: HeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage =
    location.pathname === "/" ||
    location.pathname === "/login" ||
    location.pathname === "/register";

  const isProfilePage = location.pathname === "/profile";
  const isUserTicketPage = location.pathname === "/profile/tickets";

  const authContext = useContext(AuthContext);
  const cartContext = useContext(CartContext);

  if (!authContext) {
    throw new Error("Header mora biti unutar AuthContext.Provider-a");
  }

  if (!cartContext) {
    throw new Error("Header mora biti unutar CartProvider-a.");
  }

  const { currentUser, setCurrentUser } = authContext;
  const { cartCount } = cartContext;

  function handleLogout() {
    setCurrentUser(null);

    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    navigate("/");
  }

  return (
    <header
      className={`top-0 left-0 z-20 flex w-full h-16 px-60 text-white items-center justify-between 
        ${isHomePage ? "absolute bg-transparent" : "relative bg-[#181818]"} 
        ${isProfilePage ? "px-8 lg:px-16" : "px-6 md:px-16 xl:px-60"}
        ${isUserTicketPage ? "px-8 lg:px-16" : "px-6 md:px-16 xl:px-60"}`}
    >
      <div className="flex items-center justify-center gap-10">
        <Link to="/">
          <img src={logo} alt="Logo" />
        </Link>

        <NavBar />
      </div>

      <div className="flex items-center justify-center gap-10">
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

            <Link
              to="/cart"
              className="relative p-2 bg-[#3B3B3B] border border-[#3D3D3D] rounded-full"
            >
              <div className="absolute -right-2 -top-2 rounded-full flex justify-center items-center h-4 w-4  bg-white text-black text-[12px]">
                {cartCount}
              </div>
              <img src={cartIcon} alt="cart" className="scale-125" />
            </Link>
          </>
        ) : (
          <>
            <Link to="/login">Prijavi se</Link>
            <Link to="/register">Registruj se</Link>

            <Link
              to="/cart"
              className="relative p-2 bg-[#3B3B3B] border border-[#3D3D3D] rounded-full"
            >
              <div className="absolute -right-2 -top-2 rounded-full flex justify-center items-center h-4 w-4  bg-white text-black text-[12px]">
                {cartCount}
              </div>
              <img src={cartIcon} alt="cart" className="scale-125" />
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
export default Header;
