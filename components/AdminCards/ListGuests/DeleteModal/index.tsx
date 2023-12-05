import projectConfig from "@/config/project";
import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import * as guestsService from "@/services/guests";

interface IProps {
  setOpenModal: React.Dispatch<React.SetStateAction<string | undefined>>;
  openModal: string | undefined;
  guest: any;
  setReloadGuests: React.Dispatch<React.SetStateAction<string>>;
}

export default function DeleteModal({
  openModal,
  setOpenModal,
  guest,
  setReloadGuests,
}: IProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleDelete = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await guestsService.deleteGuest(guest._id);

      if (response === 200) {
        setReloadGuests(new Date().toString());
        setSuccess("Convidado excluído com sucesso!");
      } else {
        setError("Algo deu errado. Tente novamente mais tarde.");
      }
    } catch (error: any) {
      setError("Erro interno tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Modal
        show={openModal === "DeleteGuest"}
        onClose={() => setOpenModal(undefined)}
      >
        <Modal.Header>Deletar convidado</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            {success && (
              <p className="text-base leading-relaxed text-green-400">
                {success}
              </p>
            )}

            {!success && (
              <p className="text-base leading-relaxed text-gray-500">
                Você tem certeza que deseja excluir{" "}
                <span className="text-red-400 font-bold text-lg uppercase">
                  {guest.name}
                </span>{" "}
                da lista de convidados?
              </p>
            )}

            {error && (
              <p className="text-red-400 text-base leading-relaxed">{error}</p>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            color={projectConfig.buttonColor}
            onClick={handleDelete}
            disabled={!!success || loading}
          >
            {loading ? "Deletando..." : "Deletar"}
          </Button>
          <Button
            color="gray"
            onClick={() => setOpenModal(undefined)}
            disabled={loading}
          >
            {success ? "Voltar" : "Cancelar"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
