"use client";

import { Button, Label, TextInput } from "flowbite-react";
import { SubmitHandler, useForm } from "react-hook-form";

import projectConfig from "@/config/project";

import { useAuth } from "@/providers/useAuth";
import { useGuests } from "@/providers/useGuests";

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
  const { guests } = useGuests();

  const onSubmit: SubmitHandler<Inputs> = async ({ name, password }) => {
    try {
      await login(name, password);
    } catch (error: any) {
      setError("root", { type: "custom", message: error.message });
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
        {guests && (
          <datalist id="guests" className="display">
            {guests.map((guest) => (
              <option key={guest._id} value={guest.name} />
            ))}
          </datalist>
        )}
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