import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Button, Label, Radio, TextInput } from "flowbite-react";

const EditGuest: React.FC = () => {
  const [name, setName] = useState("");
  const [receivedInvitation, setReceivedInvitation] = useState(false);
  const [loadingScreen, setLoadingScreen] = useState(true);
  const [savingLoading, setSavingLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const { query } = useRouter();

  useEffect(() => {
    const getGests = async () => {
      try {
        if (query.id) {
          const { data } = await axios.get("/api/guests/get-one", {
            params: { id: query.id },
          });
          setName(data.name);
          setReceivedInvitation(data.receivedInvitation);
          setTimeout(() => setLoadingScreen(false), 1000);
        }
      } catch (error: any) {
        console.log(error.message);
      }
    };

    getGests();
  }, [query.id]);

  async function handleEditGuest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSavingLoading(true);
    setError("");
    setMessage("");

    try {
      const { data } = await axios.post("/api/guests/update", {
        name: name.trim().toLocaleLowerCase(),
        receivedInvitation: receivedInvitation,
        id: query.id,
      });

      if (data.message) {
        setError("Erro interno tente novamente mais tarde.");
      } else {
        setMessage("Convidado atualizado com sucesso.");
      }
    } catch (error: any) {
      setError("Erro interno tente novamente mais tarde.");
    } finally {
      setSavingLoading(false);
    }
  }
  return (
    <div>
      {loadingScreen ? (
        <h2 className="mb-2 font-bungee text-4xl text-white max-lg:text-2xl">
          Carregando...
        </h2>
      ) : (
        <div className="rounded-lg bg-gray-950 bg-opacity-30 bg-clip-padding p-4  max-phone:w-full">
          <form
            onSubmit={handleEditGuest}
            className="flex flex-col justify-center gap-2"
          >
            <h3 className="font-bebas text-3xl  text-white ">
              Editar Convidado
            </h3>

            <div className="w-full">
              <div className="mb-2 block">
                <Label htmlFor="name" value="Nome" className="text-white" />
              </div>
              <TextInput
                id="name"
                required
                type="text"
                defaultValue={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>

            <fieldset
              className="m-4 flex justify-center gap-8 text-white"
              id="radio"
            >
              <Label
                htmlFor="radio"
                value="Recebeu o convite?"
                className="text-lg text-white"
              />
              <div className="flex items-center gap-2">
                <Radio
                  defaultChecked={receivedInvitation}
                  id="yes"
                  name="confirm"
                  value="yes"
                  onClick={() => setReceivedInvitation(true)}
                />
                <Label htmlFor="yes" className="text-lg text-white">
                  Sim
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Radio
                  id="no"
                  name="confirm"
                  value="no"
                  defaultChecked={!receivedInvitation}
                  onClick={() => setReceivedInvitation(false)}
                />
                <Label htmlFor="no" className="text-lg text-white">
                  Não
                </Label>
              </div>
            </fieldset>

            <Button
              className="mb-2 mt-2 w-full text-base"
              disabled={savingLoading}
              type="submit"
              color="gray"
            >
              {savingLoading ? "Carregando..." : "Salvar"}
            </Button>
            {error && <p className=" text-base text-red-300">{error}</p>}
            {message && <p className=" text-base text-green-400">{message}</p>}
          </form>
        </div>
      )}
    </div>
  );
};

export default EditGuest;
