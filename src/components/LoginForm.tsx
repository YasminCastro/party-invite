import { useUser } from "@/providers/user";
import axios from "axios";
import { setCookie } from "cookies-next";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
import { Button, Label, TextInput } from "flowbite-react";

export default function LoginForm() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [secret, setSecret] = useState("");
  const [error, setError] = useState("");
  const [guests, setGuests] = useState<any[]>([]);
  const router = useRouter();
  const { setUser } = useUser();

  useEffect(() => {
    const getGests = async () => {
      try {
        const { data } = await axios.get("/api/guests/get");
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
    setLoading(true);

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
    } finally {
      setLoading(false);
    }
  }
  return (
    <form
      onSubmit={handleLogin}
      className="flex w-1/2 flex-col items-center justify-center rounded-lg bg-gray-500 bg-opacity-20 bg-clip-padding p-4 max-lg:m-0  max-sm:w-3/4"
    >
      <div className="flex w-full flex-col gap-4">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="name" value="Nome" className="text-white" />
          </div>
          <TextInput
            id="name"
            required
            type="text"
            list="guests"
            onChange={(event) => setName(event.target.value)}
          />
          <datalist id="guests" className="display">
            {guests.map((guest) => (
              <option key={guest._id} value={guest.name} />
            ))}
          </datalist>
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password" value="Senha" className="text-white" />
          </div>
          <TextInput
            id="password"
            required
            type="password"
            onChange={(event) => setSecret(event.target.value)}
          />
        </div>

        {error && <p className=" text-red-300">{error}</p>}
        <Button type="submit" disabled={loading} gradientDuoTone="purpleToBlue">
          {loading ? "Carregando..." : "Entrar"}
        </Button>
      </div>
    </form>
  );
}
