import { IGuest } from "@/interface/guests";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";
import { Checkbox } from "@/components/ui/checkbox";

interface IProps {
  isAdmin: boolean;
  guests: IGuest[];
}

export default function GuestTable({ isAdmin, guests }: IProps) {
  console.log(guests);
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nome</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Recebeu convite?</TableHead>
          {isAdmin && <TableHead>Editar</TableHead>}
          {isAdmin && <TableHead>Excluir</TableHead>}
        </TableRow>
      </TableHeader>
      <TableBody>
        {guests.map((guest) => (
          <TableRow>
            <TableCell>{guest.name}</TableCell>
            <TableCell>
              {guest.status ? (
                <AiFillCheckCircle className="text-lg text-green-500" />
              ) : (
                <AiFillCloseCircle className="text-lg text-red-500" />
              )}
            </TableCell>
            <TableCell>
              <Checkbox checked={guest.receivedInvitation} />
            </TableCell>
            {isAdmin && <TableCell>Editar</TableCell>}
            {isAdmin && <TableCell>Excluir</TableCell>}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
