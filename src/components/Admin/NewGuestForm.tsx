import axios from "axios";
import { FormEvent, useState } from "react";
import { Button, Label, TextInput } from "flowbite-react";

const NewGuestForm: React.FC = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function handleNewGuest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post("/api/guests/new", {
        name: name.trim().toLocaleLowerCase(),
      });

      if (data.acknowledged) {
        setMessage("Convidado criado com sucesso!");
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
    <div className="rounded-lg bg-gray-950 bg-opacity-30 bg-clip-padding p-4 max-phone:w-full">
      {message ? (
        <div>
          <h2 className="mb-2 font-sans text-3xl font-bold text-white">
            {message}
          </h2>
          <Button
            className="mb-2 mt-2 w-full text-base"
            onClick={() => {
              setMessage("");
            }}
            color="gray"
          >
            Criar novo convidado
          </Button>
        </div>
      ) : (
        <form
          onSubmit={handleNewGuest}
          className="flex flex-col items-center justify-center gap-2"
        >
          <h3 className="font-sans text-3xl font-bold  text-white max-phone:text-xl">
            Criar Convidado
          </h3>

          <div className="w-full">
            <div className="mb-2 block">
              <Label htmlFor="name" value="Nome" className="text-white" />
            </div>
            <TextInput
              id="name"
              required
              type="text"
              onChange={(event) => setName(event.target.value)}
            />
          </div>

          {error && <p className=" text-base text-red-300">{error}</p>}
          <Button
            className="mb-2 mt-2 w-full"
            disabled={loading}
            color="gray"
            type="submit"
          >
            {loading ? "Carregando..." : "Salvar"}
          </Button>
        </form>
      )}
    </div>
  );
};

export default NewGuestForm;
