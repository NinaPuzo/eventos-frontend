import React, { useContext, useState } from "react";
import { login } from "../api/authService";
import { useNavigate } from "react-router-dom";
import Button from "../components/global/Button";
import AuthContext from "../context/AuthContext";
import { AuthStatus } from "../shared/constants/AuthStatus";
import { getUser } from "../api/userService";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const organizerRoleId = "22FEA888-84E5-49C5-9953-9B94FAA386A2";

  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("LoginPage mora biti unutar AuthContext.Provider-a");
  }

  const { setCurrentUser } = authContext;

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const authStatus = await login({ email, password });

    if (authStatus === AuthStatus.AUTHORIZED) {
      // pozovi get user
      const user = await getUser();

      setCurrentUser(user);

      if (user.roles.includes("organisator")) {
        navigate("/organizer/events");
      } else {
        navigate("/");
      }
      console.log(user);

      console.log("Uspeo sam");
    } else if (authStatus === AuthStatus.UNAUTHORIZED) {
      setError("Pogresan e-mail ili lozinka.");
      setPassword("");
    } else {
      setError("Doslo je do neocekivane greske.");
    }
  }

  return (
    <div className="flex justify-center px-20 py-12">
      <form
        onSubmit={handleSubmit}
        className="flex w-[45%] flex-col gap-10 rounded-lg bg-gray-100 p-10 px-15"
      >
        <h1 className="text-center text-xl font-semibold">Prijava</h1>

        <div className="flex flex-col gap-1">
          <label>E-mail adresa</label>
          <input
            id="email"
            type="email"
            value={email}
            className="border"
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label>Lozinka</label>
          <input
            id="password"
            type="password"
            value={password}
            className="border"
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>

        {error && <p className="text-center text-sm text-red-600">{error}</p>}

        <Button
          type="submit"
          className="cursor-pointer bg-blue-200 p-2"
          label="Prijavi se"
        />
      </form>
    </div>
  );
}

export default LoginPage;
