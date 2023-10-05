import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import { Button, Label, TextInput, Radio } from "flowbite-react";
import { IStepActive } from "@/app/confirm/page";
import { useUser } from "@/providers/User";
import projectConfig from "@/config/project";
import GoBackButton from "@/components/GoBackButton/Index";

interface IProps {
  setCardActive: React.Dispatch<React.SetStateAction<IStepActive>>;
  setUser: React.Dispatch<React.SetStateAction<IStepActive>>;
  user: any;
}

export default function ConfirmCard({ setCardActive }: IProps) {
  const { user, setUser } = useUser();
  const [loading, setLoading] = useState(false);

  const [confirmValue, setConfirmValue] = useState(false);

  useEffect(() => {
    console.log(user);

    setConfirmValue(user.status);
  }, []);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);

    try {
      const { data } = await axios.put("/api/guests/update", {
        id: user._id,
        status: confirmValue,
      });
      console.log(data);

      setUser(data.user);
      if (confirmValue) {
        setCardActive("going");
      } else {
        setCardActive("notGoing");
      }
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="flex min-h-screen flex-row items-center  justify-evenly bg-home bg-cover">
        <form
          onSubmit={handleLogin}
          className="max-phone:w-full flex w-1/2 flex-col items-center justify-center gap-2 rounded-lg bg-gray-950 bg-opacity-30 bg-clip-padding p-4 max-md:w-2/3 max-sm:w-3/4"
        >
          <div className="w-full">
            <div>
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
            </div>

            <fieldset
              className="m-4 flex justify-center gap-8 text-white"
              id="radio"
            >
              <div className="flex items-center gap-2">
                <Radio
                  defaultChecked={user.status}
                  id="yes"
                  name="confirm"
                  value="yes"
                  onClick={() => setConfirmValue(true)}
                />
                <Label htmlFor="yes" className="text-lg text-white">
                  Vou :D
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Radio
                  id="no"
                  name="confirm"
                  value="no"
                  defaultChecked={!user.status}
                  onClick={() => setConfirmValue(false)}
                />
                <Label htmlFor="no" className="text-lg text-white">
                  Não vou :(
                </Label>
              </div>
            </fieldset>
          </div>

          <Button
            className="h-8 w-full text-base "
            disabled={loading}
            type="submit"
            color={projectConfig.buttonColor}
          >
            {loading ? "Carregando..." : "Confirmar"}
          </Button>

          <GoBackButton path="/" title="Voltar" />
        </form>
      </div>
    </>
  );
}
