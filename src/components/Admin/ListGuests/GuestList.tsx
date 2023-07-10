import { IStepActive } from "@/pages/admin";
import { useRouter } from "next/router";
import {
  AiFillCheckCircle,
  AiFillCloseCircle,
  AiOutlineEdit,
  AiOutlineDelete,
} from "react-icons/ai";

interface IProps {
  guests: any[];
  setCardActive: React.Dispatch<React.SetStateAction<IStepActive>>;
}

export default function GuestList({ guests, setCardActive }: IProps) {
  const { push } = useRouter();

  return (
    <table className="table-auto bg-gray-700 text-xs uppercase text-gray-400">
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
        {guests &&
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
                    className="cursor-pointer"
                    onClick={() => {
                      push({ query: { id: guest._id } });
                      setCardActive("editarConvidado");
                    }}
                  />
                </td>
                <td>
                  <AiOutlineDelete
                    size={18}
                    className="cursor-pointer"
                    onClick={() => {
                      console.log("delete");
                    }}
                  />
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
}
