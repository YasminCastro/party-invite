import projectConfig from "@/config/project";
import { Modal } from "flowbite-react";

import { useRouter } from "next/navigation";

interface IProps {
  setOpenModal: React.Dispatch<React.SetStateAction<string | undefined>>;
  openModal: string | undefined;
}

export default function NotAttendingModal({ openModal, setOpenModal }: IProps) {
  const { push } = useRouter();

  return (
    <>
      <Modal
        show={openModal === "NotAttending"}
        onClose={() => {
          setOpenModal(undefined);
          push("/");
        }}
      >
        <Modal.Header>
          <div className="font-title text-red-400 text-3xl max-sm:text-2xl">
            Muito triste que você não vai :/
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className="font-text text-xl">
            <p>Talvez na próxima você consiga</p>
            <p>
              ps. caso mude de ideia pode confirmar se vai até o dia{" "}
              <span className="text-red-400">
                {projectConfig.lastDateToConfirm}
              </span>{" "}
              :)
            </p>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
