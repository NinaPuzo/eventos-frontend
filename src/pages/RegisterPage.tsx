import { useState } from "react";
import { register } from "../api/authService";
import { useNavigate } from "react-router-dom";
import Input from "../components/global/Input";

function RegisterPage() {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const user = await register(name, lastname, email, password);

    if (user) {
      navigate("/login");
    }
  }

  return (
    <div className="flex justify-center px-20 py-5">
      <form
        onSubmit={handleSubmit}
        className="flex w-[45%] flex-col gap-5 rounded-lg bg-gray-100 p-5 px-15"
      >
        <h1 className="text-center text-xl font-semibold">Registracija</h1>

        <Input
          label="Ime"
          id="name"
          type="text"
          value={name}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setName(event.target.value)
          }
          className="border"
        />

        <Input
          label="Prezime"
          id="lastname"
          type="text"
          value={lastname}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setLastname(event.target.value)
          }
          className="border"
        />

        <Input
          label="E-mail"
          id="email"
          type="email"
          value={email}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(event.target.value)
          }
          className="border"
        />

        <Input
          label="Lozinka"
          id="password"
          type="password"
          value={password}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(event.target.value)
          }
          className="border"
        />

        <button type="submit" className="cursor-pointer bg-blue-200 p-2">
          Registruj se
        </button>
      </form>
    </div>
  );
}
export default RegisterPage;
