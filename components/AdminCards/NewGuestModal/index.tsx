import projectConfig from "@/config/project";
import { Button, Label, Modal, TextInput } from "flowbite-react";
import { useState } from "react";
import * as guestsService from "@/services/guests";

interface IProps {
  setOpenModal: React.Dispatch<React.SetStateAction<string | undefined>>;
  setReloadGuests: React.Dispatch<React.SetStateAction<string>>;
  openModal: string | undefined;
}

export default function NewGuestModal({
  openModal,
  setOpenModal,
  setReloadGuests,
}: IProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [name, setName] = useState("");

  const handleNewGuest = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await guestsService.createGuest(name);

      if (response.acknowledged) {
        setSuccess(
          `${name.toUpperCase()} foi adicionade na lista de convidados.`
        );
        setName("");
      } else {
        if (response.message === "Guest alredy exists") {
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
  };

  const handleCloseModal = () => {
    setOpenModal(undefined);
    setReloadGuests(new Date().toString());
  };

  return (
    <>
      <Modal show={openModal === "NewGuest"} onClose={handleCloseModal}>
        <Modal.Header>Criar Convidado</Modal.Header>
        <Modal.Body>
          <div className="space-y-2">
            <Label htmlFor="name" value="Nome" />
            <TextInput
              id="name"
              required
              type="text"
              aria-label="Nome do convidado"
              onChange={(event) => {
                setName(event.target.value);
                if (success) setSuccess("");
              }}
              value={name}
            />
            {error && (
              <p className="text-red-400 text-base leading-relaxed">{error}</p>
            )}
            {success && (
              <p className="text-green-400 text-base leading-relaxed">
                {success}
              </p>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            color={projectConfig.buttonColor}
            onClick={handleNewGuest}
            disabled={!!success || loading}
          >
            {loading ? "Carregando..." : "Salvar"}
          </Button>
          <Button color="gray" onClick={handleCloseModal} disabled={loading}>
            {success ? "Voltar" : "Cancelar"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
