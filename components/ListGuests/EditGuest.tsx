"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface IProps {
  setOpenModal: React.Dispatch<React.SetStateAction<string | undefined>>;
  openModal: string | undefined;
}

export default function EditGuest({ openModal, setOpenModal }: IProps) {
  let trigger = false;

  if (openModal === "EditGuest") {
    trigger = true;
  }

  return (
    <Dialog
      open={trigger}
      onOpenChange={() => {
        setOpenModal(undefined);
      }}
    >
      <DialogContent className="w-1/2 max-w-full">
        <DialogHeader>
          <DialogTitle className="text-3xl text-green-600">
            Oba! Vou adorar ter você comigo!
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="flex gap-2">
          <div className="w-2/3 flex flex-col justify-between">
            <ul className="list-disc list-inside space-y-1 text-lg">
              <li>
                Nesse ano, decidi fazer algo diferente, tô pedindo para cada
                convidado levar 2kg de alimentos não perecíveis, os quais serão
                utilizados na produção de marmitas para moradores de rua.
              </li>
              <li>Não se esqueça de levar sua bebida e caixa térmica!</li>
              <li>After na Roxy!</li>
              <li>
                Quer me ajudar nos comes e bebes (vai ter pinga e doses) manda
                10zao no pix (se quiser mandar mais, pode).
              </li>
            </ul>
            <div className="gap-2 flex"></div>
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
