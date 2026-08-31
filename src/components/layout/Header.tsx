import { Link, useNavigate } from "react-router-dom";
import NavBar from "./Navbar";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import logo from "../../assets/logo.svg";
import cartIcon from "../../assets/icons/cartIcon.svg";
import CartContext from "../../context/CartContext";

function Header() {
  const navigate = useNavigate();

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
    <header className="flex w-full h-16 px-48 text-white items-center justify-between  bg-[#232323]">
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
