import { IAdminAction } from "@/app/admin/page";
import { useGuests } from "@/providers/useGuests";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  AiFillCheckCircle,
  AiFillCloseCircle,
  AiOutlineEdit,
  AiOutlineDelete,
} from "react-icons/ai";
import DeleteModal from "./DeleteModal";

interface IProps {
  setCardActive: React.Dispatch<React.SetStateAction<IAdminAction>>;
}

export default function GuestTable({ setCardActive }: IProps) {
  const { push } = useRouter();
  const { guests, loading } = useGuests();
  const pathname = usePathname();
  const [openModal, setOpenModal] = useState<string | undefined>();
  const [selectedGuest, setSelectedGuest] = useState<any>();

  return (
    <div>
      <table className="bg-gray-700 text-xs uppercase text-gray-400 ">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Recebeu convite?</th>
            <th>Status</th>
            <th>Editar</th>
            <th>Excluir</th>
          </tr>
        </thead>

        <tbody>
          {!loading &&
            guests &&
            guests.map((guest) => {
              return (
                <tr key={guest._id} className="border-gray-700 bg-gray-800">
                  <td>{guest.name}</td>
                  <td>
                    {guest.receivedInvitation ? (
                      <AiFillCheckCircle color="green" />
                    ) : (
                      <AiFillCloseCircle color="red" />
                    )}
                  </td>
                  <td>
                    {guest.status ? (
                      <AiFillCheckCircle color="green" />
                    ) : (
                      <AiFillCloseCircle color="red" />
                    )}
                  </td>
                  <td>
                    <AiOutlineEdit
                      size={18}
                      className="cursor-pointer focus:outline-none hover:text-blue-400 active:text-blue-600"
                      onClick={() => {
                        push(pathname + "?" + `id=${guest._id}`);
                        setCardActive("editGuest");
                      }}
                    />
                  </td>
                  <td>
                    <AiOutlineDelete
                      size={18}
                      className="cursor-pointer focus:outline-none hover:text-blue-400 active:text-blue-600"
                      onClick={() => {
                        setSelectedGuest(guest);
                        setOpenModal("DeleteGuest");
                      }}
                    />
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>

      {openModal === "DeleteGuest" && selectedGuest && (
        <DeleteModal
          openModal={openModal}
          setOpenModal={(modal) => {
            if (!modal) setSelectedGuest(null);
            setOpenModal(modal);
          }}
          guest={selectedGuest}
        />
      )}
    </div>
  );
}
