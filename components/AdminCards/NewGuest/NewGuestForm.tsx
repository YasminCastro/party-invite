import axios from "axios";
import { FormEvent, useState } from "react";
import { Button, Label, TextInput } from "flowbite-react";
import projectConfig from "@/config/project";

interface IProps {
  setMessage: React.Dispatch<React.SetStateAction<string>>;
}

const NewGuestForm: React.FC<IProps> = ({ setMessage }) => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleNewGuest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post("/api/guests/new", {
        name: name.trim().toLocaleLowerCase(),
      });

      if (data.acknowledged) {
        setMessage("Convidado criado com sucesso!");
        setName("");
      } else {
        if (data.message === "Guest alredy exists") {
          setError("Convidado já registrado.");
        } else {
          setError("Erro interno tente novamente mais tarde.");
        }
      }
    } catch (error: any) {
      setError("Erro interno tente novamente mais tarde.");
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  }
  return (
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
          aria-label="Nome do convidado"
          onChange={(event) => setName(event.target.value)}
          value={name}
        />
      </div>

      {error && <p className=" text-base text-red-300">{error}</p>}
      <Button
        className="mb-2 mt-2 w-full"
        disabled={loading || !name.trim()}
        color={projectConfig.buttonColor}
        type="submit"
      >
        {loading ? "Carregando..." : "Salvar"}
      </Button>
    </form>
  );
};

export default NewGuestForm;
