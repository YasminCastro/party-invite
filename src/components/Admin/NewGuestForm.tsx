import "xp.css/dist/98.css";
import axios from "axios";
import { FormEvent, useState } from "react";
import { IStepActive } from "@/pages/admin";

const NewGuestForm: React.FC = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function handleNewGuest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post("/api/new-guest", {
        name: name.trim().toLocaleLowerCase(),
      });

      if (data.acknowledged) {
        setMessage("Convidado criado com sucesso.");
      } else {
        if (data.message === "Guest alredy exists") {
          setError("Convidado já registrado.");
        } else {
          setError("Erro interno tente novamente mais tarde.");
        }
      }
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="rounded-lg bg-gray-950 bg-opacity-30 bg-clip-padding p-4 max-md:w-2/3 max-sm:w-3/4 max-phone:w-full">
      {message ? (
        <div>
          <h2 className="mb-2 font-bungee text-3xl text-white max-lg:text-3xl max-md:text-xl">
            {message}
          </h2>
          <button
            className="mb-2 mt-2 h-8 w-full text-base"
            onClick={() => {
              setMessage("");
            }}
          >
            Criar novo convidado
          </button>
        </div>
      ) : (
        <form
          onSubmit={handleNewGuest}
          className="flex flex-col items-center justify-center gap-2"
        >
          <h3 className="font-bungee text-3xl  text-white max-lg:text-3xl max-md:text-xl">
            Criar Convidado
          </h3>
          <div className="flex w-full flex-col">
            <label className="text-base">Nome</label>
            <input
              type="text"
              id="name"
              required
              className="h-6 p-2 text-base"
              onChange={(event) => setName(event.target.value)}
            />
          </div>

          {error && <p className=" text-base text-red-300">{error}</p>}
          <button className="mb-2 mt-2 h-8 w-full text-base" disabled={loading}>
            {loading ? "Carregando..." : "Salvar"}
          </button>
        </form>
      )}
    </div>
  );
};

export default NewGuestForm;