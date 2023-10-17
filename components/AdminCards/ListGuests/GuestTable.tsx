import { useState } from "react";
import {
  AiFillCheckCircle,
  AiFillCloseCircle,
  AiOutlineEdit,
  AiOutlineDelete,
} from "react-icons/ai";
import DeleteModal from "./DeleteModal";
import EditModal from "./EditModal";
import { useGuests } from "@/providers/Guests";
import { Checkbox } from "flowbite-react";
import { updateGuest } from "@/lib/guest";

interface IProps {}

export default function GuestTable({}: IProps) {
  const { guests, loading } = useGuests();
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
                  <td className="text-center">
                    <Checkbox
                      className=" text-green-500 bg-gray-100  focus:ring-green-500"
                      defaultChecked={guest.receivedInvitation}
                      onChange={() => {
                        updateGuest({
                          id: guest._id,
                          name: guest.name,
                          receivedInvitation: !guest.receivedInvitation,
                        });
                      }}
                    />
                  </td>
                  <td className="text-center">
                    {guest.status ? (
                      <AiFillCheckCircle color="green" />
                    ) : (
                      <AiFillCloseCircle color="red" />
                    )}
                  </td>
                  <td className="text-center">
                    {!guest.isAdmin && (
                      <AiOutlineEdit
                        size={18}
                        className="cursor-pointer focus:outline-none hover:text-blue-400 active:text-blue-600"
                        onClick={() => {
                          setSelectedGuest(guest);
                          setOpenModal("EditGuest");
                        }}
                      />
                    )}
                  </td>
                  <td className="text-center">
                    {!guest.isAdmin && (
                      <AiOutlineDelete
                        size={18}
                        className="cursor-pointer focus:outline-none hover:text-blue-400 active:text-blue-600"
                        onClick={() => {
                          setSelectedGuest(guest);
                          setOpenModal("DeleteGuest");
                        }}
                      />
                    )}
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
      {openModal === "EditGuest" && selectedGuest && (
        <EditModal
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
