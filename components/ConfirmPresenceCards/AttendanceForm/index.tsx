import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import { Button, Label, TextInput, Radio } from "flowbite-react";

import { IConfirmPresenceStepActive } from "@/app/confirm-presence/page";
import { useUser } from "@/providers/User";
import projectConfig from "@/config/project";
import GoBackButton from "@/components/GoBackButton/Index";

interface IProps {
  setCardActive: React.Dispatch<
    React.SetStateAction<IConfirmPresenceStepActive>
  >;
}

export default function AttendanceForm({ setCardActive }: IProps) {
  const { user, setUser } = useUser();
  const [isLoading, setIsLoading] = useState(true);
  const [loadingResponse, setLoadingResponse] = useState(false);

  useEffect(() => {
    if (user) {
      setIsLoading(false);
    }
  }, [user]);

  if (isLoading) {
    <div className="flex min-h-screen flex-row items-center  justify-evenly bg-home bg-cover">
      <p className="text-xl">Carregando...</p>
    </div>;
  }

  const [confirmValue, setConfirmValue] = useState(user?.status || false);

  async function handleConfirmation(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoadingResponse(true);

    try {
      const { data } = await axios.put("/api/guests/update", {
        id: user._id,
        status: confirmValue,
      });

      setUser(data.user);
      if (confirmValue) {
        setCardActive("Attending");
      } else {
        setCardActive("NotAttending");
      }
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setLoadingResponse(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-row items-center  justify-evenly bg-home bg-cover">
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
            defaultValue={user.name}
          />
          <fieldset
            className="m-4 flex justify-center gap-8 text-white"
            id="radio"
          >
            <div className="flex items-center gap-2">
              <Radio
                checked={confirmValue}
                id="yes"
                name="confirm"
                value="yes"
                onClick={() => setConfirmValue(true)}
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
                checked={!confirmValue}
                id="no"
                name="confirm"
                value="no"
                onClick={() => setConfirmValue(false)}
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
