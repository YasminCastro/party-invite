import { SetStateAction, useState } from "react";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import * as guestsService from "@/services/guests";
import { IGuest } from "@/interface/guests";

interface IProps {
  setOpenDeleteGuest: React.Dispatch<SetStateAction<boolean>>;
  setRefreshList: React.Dispatch<SetStateAction<string>>;
  openDeleteGuest: boolean;
  guest: IGuest;
}

export default function DeleteGuest({
  setOpenDeleteGuest,
  openDeleteGuest,
  setRefreshList,
  guest,
}: IProps) {
  const [successMessage, setSuccessMessage] = useState("");

  async function handleDelete() {
    setSuccessMessage("");
    try {
      const response = await guestsService.deleteGuest(guest._id);

      if (response === 200) {
        setSuccessMessage("Convidado excluído com sucesso!");
      } else {
        console.log("Erro ao deletar usuário");
      }
    } catch (error) {
      console.log("Erro ao deletar usuário");
    }
  }

  return (
    <Dialog
      open={openDeleteGuest}
      onOpenChange={() => {
        setOpenDeleteGuest(false);
        setRefreshList(new Date().toString());
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Deletar convidado</DialogTitle>
        </DialogHeader>

        {!successMessage && (
          <div className="flex flex-col gap-4">
            <p className="text-base leading-relaxed text-gray-500">
              Você tem certeza que deseja excluir{" "}
              <span className="text-lg font-bold uppercase text-red-400">
                {guest.name}
              </span>{" "}
              da lista de convidados?
            </p>
            <div className="flex gap-10">
              <Button
                size="lg"
                className="w-full bg-red-500 hover:bg-red-400"
                onClick={() => {
                  setOpenDeleteGuest(false);
                }}
              >
                Não
              </Button>
              <Button
                size="lg"
                className="w-full bg-green-500 hover:bg-green-400"
                onClick={handleDelete}
              >
                Sim
              </Button>
            </div>
          </div>
        )}

        {successMessage && (
          <div className="flex flex-col space-y-4">
            <p className="text-lg leading-relaxed text-green-500">
              {successMessage}
            </p>
            <Button
              onClick={() => {
                setOpenDeleteGuest(false);
                setRefreshList(new Date().toString());
              }}
            >
              Voltar
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
