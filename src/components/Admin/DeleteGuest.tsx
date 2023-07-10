import "xp.css/dist/98.css";
import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { IStepActive } from "@/pages/admin";

interface IProps {
  setCardActive: React.Dispatch<React.SetStateAction<IStepActive>>;
}

const DeleteGuest: React.FC<IProps> = ({ setCardActive }) => {
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
          setTimeout(() => setLoadingScreen(false), 1000);
        }
      } catch (error: any) {
        console.log(error.message);
      }
    };

    getGests();
  }, [query.id]);

  async function handleDeleteGuest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSavingLoading(true);
    setError("");
    setMessage("");

    try {
      const { data } = await axios.post("/api/delete-guest", {
        id: query.id,
      });

      if (data.message) {
        setError("Erro interno tente novamente mais tarde.");
      } else {
        setMessage(
          "Convidado deletado com sucesso. Voltando para lista em 5s..."
        );
        setTimeout(() => setCardActive("listGuests"), 5000);
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
            onSubmit={handleDeleteGuest}
            className="flex flex-col justify-center gap-2"
          >
            <div className="flex flex-col items-center">
              <h3 className="font-bebas text-2xl  text-white max-lg:text-3xl max-md:text-xl ">
                Certeza que deseja desconvidar:
              </h3>
              <h3 className="font-bebas text-3xl  text-yellow-400 max-lg:text-3xl max-md:text-xl ">
                {name}
              </h3>
            </div>

            <div className="flex gap-2">
              <button
                className="mb-2 mt-2 h-8 w-full text-base"
                disabled={savingLoading}
              >
                {savingLoading ? "Carregando..." : "Sim"}
              </button>
              <button
                className="mb-2 mt-2 h-8 w-full text-base"
                disabled={savingLoading}
                onClick={() => {
                  setCardActive("listGuests");
                }}
              >
                Não
              </button>
            </div>

            {error && <p className=" text-base text-red-300">{error}</p>}
            {message && <p className=" text-base text-green-400">{message}</p>}
          </form>
        </div>
      )}
    </div>
  );
};

export default DeleteGuest;
