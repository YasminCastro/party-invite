import projectConfig from "@/config/project";
import { updateGuest } from "@/lib/guest";
import { useGuests } from "@/providers/Guests";
import { Button, Label, Modal, Radio, TextInput } from "flowbite-react";
import { useState } from "react";

interface IProps {
  setOpenModal: React.Dispatch<React.SetStateAction<string | undefined>>;
  openModal: string | undefined;
  guest: any;
}

export default function EditModal({ openModal, setOpenModal, guest }: IProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [name, setName] = useState(guest.name);
  const [receivedInvitation, setReceivedInvitation] = useState(
    guest.receivedInvitation
  );
  const { fetchGuests } = useGuests();

  const handleEditGuest = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const { message } = await updateGuest({
        id: guest._id,
        name: guest.name,
        receivedInvitation,
      });

      if (message) {
        await fetchGuests();
        setSuccess("Convidado atualizado com sucesso.");
      }
    } catch (error) {
      setError("Erro interno tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Modal
        show={openModal === "EditGuest"}
        onClose={() => setOpenModal(undefined)}
      >
        <Modal.Header>Editar Convidado</Modal.Header>
        <Modal.Body>
          <div className="space-y-2">
            <Label htmlFor="name" value="Nome" />
            <TextInput
              id="name"
              required
              type="text"
              defaultValue={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>

          <fieldset className="m-4 flex justify-center gap-8 " id="radio">
            <Label
              htmlFor="radio"
              value="Recebeu o convite?"
              className="max-sm:text-xs"
            />
            <div className="flex items-center gap-2">
              <Radio
                defaultChecked={receivedInvitation}
                id="yes"
                name="confirm"
                value="yes"
                onClick={() => setReceivedInvitation(true)}
              />
              <Label htmlFor="yes" className="max-sm:text-xs">
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
              <Label htmlFor="no" className="max-sm:text-xs">
                Não
              </Label>
            </div>
          </fieldset>

          {error && (
            <p className="text-red-400 text-base leading-relaxed">{error}</p>
          )}
          {success && (
            <p className="text-green-400 text-base leading-relaxed">
              {success}
            </p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            color={projectConfig.buttonColor}
            onClick={handleEditGuest}
            disabled={!!success || loading}
          >
            {loading ? "Salvando..." : "Salvar"}
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
