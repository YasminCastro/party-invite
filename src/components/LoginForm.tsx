import { useUser } from "@/providers/user";
import axios from "axios";
import { setCookie } from "cookies-next";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";

import "xp.css/dist/98.css";

export default function LoginForm() {
  const [name, setName] = useState("");
  const [secret, setSecret] = useState("");
  const [error, setError] = useState("");
  const [guests, setGuests] = useState<any[]>([]);
  const router = useRouter();
  const { setUser } = useUser();

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

  useEffect(() => {}, [guests]);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const { data } = await axios.post("/api/login", {
        name: name.trim().toLocaleLowerCase(),
        secret,
      });

      if (data.message) {
        setError(data.message);
      } else {
        setCookie("token", data.token);
        setUser(data.user);
        router.push("/");
      }
    } catch (error: any) {
      console.log(error.message);
    }
  }
  return (
    <form
      onSubmit={handleLogin}
      className="flex w-1/2 flex-col items-center justify-center gap-2 rounded-lg bg-gray-500 bg-opacity-20 bg-clip-padding p-4 max-sm:w-3/4"
    >
      <div className="flex w-full flex-col">
        <label className="text-base">Nome</label>
        <input
          type="text"
          id="name"
          required
          className="h-6 p-2 text-base"
          onChange={(event) => setName(event.target.value)}
          list="guests"
        />
        <datalist id="guests" className="display">
          {guests.map((guest) => (
            <option key={guest._id} value={guest.name} />
          ))}
        </datalist>
      </div>
      <div className="flex w-full flex-col">
        <label className="text-base">Senha</label>
        <input
          className="p h-6 text-base"
          onChange={(event) => setSecret(event.target.value)}
          type="password"
          id="password"
          required
        />
      </div>

      {error && <p className=" text-red-300">{error}</p>}
      <button className="mt-2 h-8 w-full">Entrar</button>
    </form>
  );
}
