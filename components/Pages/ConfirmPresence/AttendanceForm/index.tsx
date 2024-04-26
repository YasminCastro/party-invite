import { FormEvent, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";

import { useUser } from "@/providers/User";
import GoBackButton from "@/components/Global/GoBackButton/Index";
import * as guestsService from "@/services/guests";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface IProps {
  setOpenModal: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export default function AttendanceForm({ setOpenModal }: IProps) {
  const { user, setUser } = useUser();
  const [isLoading, setIsLoading] = useState(true);
  const [loadingResponse, setLoadingResponse] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    name: user?.name || "",
    status: user?.status || false,
  });

  useEffect(() => {
    if (user) {
      setCurrentUser(user);
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  }, [user]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen justify-center bg-home bg-cover bg-center">
        <div className="flex w-1/2 flex-col items-center justify-center gap-2 p-4 max-md:w-2/3 max-sm:w-full">
          <Skeleton className="h-1/4 w-full" />
          <GoBackButton path="/" title="Voltar" />
        </div>
      </div>
    );
  }

  async function handleConfirmation(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoadingResponse(true);

    try {
      const response = await guestsService.updateGuests({
        _id: user._id,
        status: currentUser.status,
      });

      setUser(response);
      if (currentUser.status) {
        setOpenModal("Attending");
      } else {
        setOpenModal("NotAttending");
      }
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setLoadingResponse(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-row items-center  justify-evenly bg-home bg-cover bg-center">
      <form
        onSubmit={handleConfirmation}
        className="flex w-1/2 flex-col items-center justify-center gap-2 rounded-lg bg-gray-950 bg-opacity-10 bg-clip-padding p-4 max-md:w-2/3 max-sm:w-full"
      >
        <div className="w-full">
          <div className="mb-2 block">
            <Label htmlFor="name" className="text-primary">
              Nome
            </Label>
          </div>
          <Input
            id="name"
            required
            type="text"
            disabled
            defaultValue={currentUser.name}
          />
          <RadioGroup className="m-4 flex justify-center gap-8 text-white">
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                checked={currentUser.status}
                id="yes"
                value="yes"
                onClick={() => setCurrentUser({ ...currentUser, status: true })}
                onChange={() =>
                  setCurrentUser({ ...currentUser, status: true })
                }
              />
              <Label htmlFor="yes" className="text-xl">
                Vou :D
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                checked={!currentUser.status}
                id="no"
                value="no"
                onClick={() =>
                  setCurrentUser({ ...currentUser, status: false })
                }
                onChange={() =>
                  setCurrentUser({ ...currentUser, status: false })
                }
              />
              <Label htmlFor="no" className="text-xl">
                Não vou :(
              </Label>
            </div>
          </RadioGroup>
        </div>

        <Button
          className="h-8 w-full text-base"
          disabled={loadingResponse}
          type="submit"
        >
          {loadingResponse ? "Carregando..." : "Confirmar"}
        </Button>

        <GoBackButton path="/" title="Voltar" />
      </form>
    </div>
  );
}
