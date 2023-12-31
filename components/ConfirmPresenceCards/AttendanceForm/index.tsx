import { FormEvent, useEffect, useState } from "react";
import { Button, Label, TextInput, Radio, Spinner } from "flowbite-react";

import { useUser } from "@/providers/User";
import projectConfig from "@/config/project";
import GoBackButton from "@/components/GoBackButton/Index";
import * as guestsService from "@/services/guests";

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
      <div className="flex min-h-screen flex-row items-center  justify-evenly bg-home bg-cover bg-center">
        <Spinner aria-label="Carregando..." size="xl" />
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
        className="flex w-1/2 flex-col items-center justify-center gap-2 rounded-lg bg-gray-950 bg-opacity-30 bg-clip-padding p-4 max-md:w-2/3 max-sm:w-full"
      >
        <div className="w-full">
          <div className="mb-2 block">
            <Label htmlFor="name" value="Nome" className="text-white" />
          </div>
          <TextInput
            id="name"
            required
            type="text"
            disabled
            defaultValue={currentUser.name}
          />
          <fieldset
            className="m-4 flex justify-center gap-8 text-white"
            id="radio"
          >
            <div className="flex items-center gap-2">
              <Radio
                checked={currentUser.status}
                id="yes"
                name="confirm"
                value="yes"
                onClick={() => setCurrentUser({ ...currentUser, status: true })}
                onChange={() =>
                  setCurrentUser({ ...currentUser, status: true })
                }
              />
              <Label
                htmlFor="yes"
                className="text-lg text-white max-phone:text-base"
              >
                Vou :D
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <Radio
                checked={!currentUser.status}
                id="no"
                name="confirm"
                value="no"
                onClick={() =>
                  setCurrentUser({ ...currentUser, status: false })
                }
                onChange={() =>
                  setCurrentUser({ ...currentUser, status: false })
                }
              />
              <Label
                htmlFor="no"
                className="text-lg text-white max-phone:text-base"
              >
                Não vou :(
              </Label>
            </div>
          </fieldset>
        </div>

        <Button
          className="h-8 w-full text-base"
          disabled={loadingResponse}
          type="submit"
          color={projectConfig.buttonColor}
        >
          {loadingResponse ? "Carregando..." : "Confirmar"}
        </Button>

        <GoBackButton path="/" title="Voltar" />
      </form>
    </div>
  );
}
