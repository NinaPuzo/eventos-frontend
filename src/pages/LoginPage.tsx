import React, { useState } from "react";
import { login } from "../api/authService";
import { useNavigate } from "react-router-dom";
import type { User } from "@shared/types/User";
import Button from "../components/global/Button";

type LoginPageProps = {
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
};

function LoginPage({ setCurrentUser }: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const user = await login(email, password);

    if (user) {
      setCurrentUser(user);
      setError("");
      navigate("/");
    } else {
      setError("Pogresan e-mail ili lozinka.");
      setPassword("");
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
