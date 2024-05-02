import projectConfig from "@/config/project";

import { useRouter } from "next/navigation";
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

export default function NotAttendingModal({ openModal, setOpenModal }: IProps) {
  const { push } = useRouter();

  let trigger = false;

  if (openModal === "NotAttending") {
    trigger = true;
  }

  return (
    <>
      <Dialog
        open={trigger}
        onOpenChange={() => {
          setOpenModal(undefined);
          push("/");
        }}
      >
        <DialogContent className="w-1/2 max-w-full max-xl:w-screen">
          <DialogHeader>
            <DialogTitle className="text-3xl text-red-400">
              Muito triste que você não vai :/
            </DialogTitle>
          </DialogHeader>
          <DialogDescription>
            <div className="font-text text-xl max-sm:text-base">
              <p>Talvez na próxima você consiga.</p>
              <p>
                ps. caso mude de ideia, confirme sua presença até o dia{" "}
                <span className="font-bold text-red-400">
                  {projectConfig.lastDateToConfirm}
                </span>
                .
              </p>
            </div>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </>
  );
}
