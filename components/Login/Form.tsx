"use client";

import { Button, Label, TextInput } from "flowbite-react";
import { SubmitHandler, useForm } from "react-hook-form";

import { useAuth } from "@/providers/useAuth";
import { customButton } from "../CustomButtonCss";
import { useEffect, useState } from "react";
import { IGuest } from "@/interface/guests";
import * as guestsService from "@/services/guests";

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
  const { login, loading } = useAuth();
  const [guests, setGuests] = useState<IGuest[]>([]);

  const getGuests = async () => {
    try {
      const response = await guestsService.getGuests();
      setGuests(response.guests);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getGuests();
  }, []);

  const onSubmit: SubmitHandler<Inputs> = async ({ name, password }) => {
    try {
      await login(name, password);
    } catch (error: any) {
      setError("root", { type: "custom", message: error.message });
    }
  };

  return (
    <form
      className="flex w-1/2 flex-col space-y-3 rounded-lg bg-gray-500 bg-opacity-20 p-4 max-md:w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <Label htmlFor="name" value="Nome" className="text-white" />
        <TextInput
          id="name"
          required
          type="text"
          list="guests"
          {...register("name")}
        />
        {guests && (
          <datalist id="guests" className="display">
            {guests.map((guest) => (
              <option key={guest._id} value={guest.name} />
            ))}
          </datalist>
        )}
      </div>

      <div>
        <Label htmlFor="password" value="Senha" className="text-white" />
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
        theme={customButton}
        color="primary"
      >
        {loading ? "Carregando..." : "Entrar"}
      </Button>
    </form>
  );
}
