import "xp.css/dist/98.css";
import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";

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
          const { data } = await axios.get("/api/find-guest", {
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
      const { data } = await axios.post("/api/update-guest", {
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
        <h2 className="mb-2 font-bungee text-4xl text-white max-lg:text-3xl max-md:text-xl">
          Carregando...
        </h2>
      ) : (
        <div className="rounded-lg bg-gray-950 bg-opacity-30 bg-clip-padding p-4 max-md:w-2/3 max-sm:w-3/4 max-phone:w-full">
          <form
            onSubmit={handleEditGuest}
            className="flex flex-col justify-center gap-2"
          >
            <h3 className="font-bungee text-3xl  text-white max-lg:text-3xl max-md:text-xl">
              Editar Convidado
            </h3>
            <div className="flex w-full flex-col">
              <label className="text-base">Nome</label>
              <input
                type="text"
                id="name"
                required
                className="h-6 p-2 text-base"
                defaultValue={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <div className="flex flex-col gap-4">
              <label className="text-base">Recebeu o convite?</label>
              <input
                id="yes"
                type="radio"
                name="confirm"
                onClick={() => setReceivedInvitation(true)}
                defaultChecked={receivedInvitation}
              />
              <label htmlFor="yes" className="text-base">
                Sim
              </label>

              <input
                id="no"
                type="radio"
                name="confirm"
                onClick={() => setReceivedInvitation(false)}
                defaultChecked={!receivedInvitation}
              />
              <label htmlFor="no" className="text-base">
                Não
              </label>
            </div>

            <button
              className="mb-2 mt-2 h-8 w-full text-base"
              disabled={savingLoading}
            >
              {savingLoading ? "Carregando..." : "Salvar"}
            </button>
            {error && <p className=" text-base text-red-300">{error}</p>}
            {message && <p className=" text-base text-green-400">{message}</p>}
          </form>
        </div>
      )}
    </div>
  );
};

export default EditGuest;
