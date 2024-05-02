"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

import { useAuth } from "@/providers/useAuth";
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
    <Card className="w-96 max-sm:w-screen">
      <CardHeader></CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                required
                type="text"
                list="guests"
                {...register("name")}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                required
                type="password"
                {...register("password")}
                list="guests"
              />
              {guests && (
                <datalist id="guests" className="display">
                  {guests.map((guest) => (
                    <option key={guest._id} value={guest.name} />
                  ))}
                </datalist>
              )}
            </div>

            {errors.root && (
              <span className="w-fit self-center font-bold text-red-500">
                {errors.root.message}
              </span>
            )}
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          type="submit"
          disabled={loading}
          onClick={handleSubmit(onSubmit)}
        >
          {loading ? "Carregando..." : "Entrar"}
        </Button>
      </CardFooter>
    </Card>
  );
}
