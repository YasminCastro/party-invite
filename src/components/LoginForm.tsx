import axios from "axios";
import { setCookie } from "cookies-next";
import { FormEvent, useEffect, useState } from "react";
import "xp.css/dist/98.css";

export default function LoginForm() {
  const [name, setName] = useState("");
  const [secret, setSecret] = useState("");
  const [error, setError] = useState("");
  const [guests, setGuests] = useState<any[]>([]);
  useEffect(() => {
    const getGests = async () => {
      try {
        const { data } = await axios.get("/api/get-guest");
        setGuests(data);
      } catch (error: any) {
        console.log(error.message);
      }
    };

    getGests();
  }, []);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const { data } = await axios.post("/api/login", {
        name,
        secret,
      });

      if (data.message) {
        setError(data.message);
      } else {
        setCookie("token", data);
      }
    } catch (error: any) {
      console.log(error.message);
    }
  }
  return (
    <form className="flex w-1/2 flex-col items-center justify-center gap-2 rounded-lg bg-gray-500 bg-opacity-20 bg-clip-padding p-4 max-sm:w-3/4">
      <div className="flex w-full flex-col">
        <label className="text-base">Nome</label>
        <input className="h-6" />
        <datalist id="guests">
          {guests.map((guest) => (
            <option key={guest._id} value={guest.name} />
          ))}
        </datalist>
      </div>
      <div className="flex w-full flex-col">
        <label className="text-base">Senha</label>
        <input className="h-6" />
      </div>

      {error && <p className=" text-red-300">{error}</p>}
      <button className="mt-2 h-8 w-full">Entrar</button>
    </form>
  );
}
