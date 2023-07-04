import { useUser } from "@/providers/user";
import axios from "axios";
import { setCookie } from "cookies-next";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";

import "xp.css/dist/98.css";

export default function AdminForm() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { setUser } = useUser();

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post("/api/admin/login", {
        name: name.trim().toLocaleLowerCase(),
        password,
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
    } finally {
      setLoading(false);
    }
  }
  return (
    <form
      onSubmit={handleLogin}
      className="flex w-1/2 flex-col items-center justify-center gap-2 rounded-lg bg-gray-500 bg-opacity-20 bg-clip-padding p-4 max-sm:w-3/4"
    >
      <div className="flex w-full flex-col">
        <label className="text-base">Usuário</label>
        <input
          type="text"
          id="name"
          required
          className="h-6 p-2 text-base"
          onChange={(event) => setName(event.target.value)}
          list="guests"
        />
      </div>
      <div className="flex w-full flex-col">
        <label className="text-base">Senha</label>
        <input
          className="p h-6 text-base"
          onChange={(event) => setPassword(event.target.value)}
          type="password"
          id="password"
          required
        />
      </div>

      {error && <p className=" text-red-300">{error}</p>}
      <button className="mt-2 h-8 w-full" disabled={loading}>
        {loading ? "Carregando..." : "Entrar"}
      </button>
    </form>
  );
}
