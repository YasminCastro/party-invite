"use client";

import axios from "axios";
import { setCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { Button, Label, TextInput } from "flowbite-react";
import { useUser } from "@/providers/User";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import projectConfig from "@/config/project";

type Inputs = {
  name: string;
  password: string;
};

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Inputs>();
  const [guests, setGuests] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const { setUser } = useUser();
  const router = useRouter();

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

  const onSubmit: SubmitHandler<Inputs> = async ({ name, password }) => {
    setLoading(true);
    try {
      const { data } = await axios.post("/api/login", {
        name: name.trim().toLocaleLowerCase(),
        password,
      });

      if (data.message) {
        setError("root", { type: "custom", message: data.message });
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
  };

  return (
    <form
      className="flex w-1/2 flex-col space-y-3 rounded-lg bg-gray-500 bg-opacity-20 p-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <Label htmlFor="name" value="Nome" className="text-form" />
        <TextInput
          id="name"
          required
          type="text"
          list="guests"
          {...register("name")}
        />
        <datalist id="guests" className="display">
          {guests.map((guest) => (
            <option key={guest._id} value={guest.name} />
          ))}
        </datalist>
      </div>

      <div>
        <Label htmlFor="password" value="Senha" className="text-form" />
        <TextInput
          id="password"
          required
          type="password"
          {...register("password")}
        />
      </div>

      {errors.root && (
        <span className="w-fit self-center font-bold text-red-500">
          {errors.root.message}
        </span>
      )}
      <Button
        type="submit"
        disabled={loading}
        color={projectConfig.buttonColor}
      >
        {loading ? "Carregando..." : "Entrar"}
      </Button>
    </form>
  );
}
