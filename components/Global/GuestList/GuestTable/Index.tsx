import { IGuest } from "@/interface/guests";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
            <TableCell>{guest.status}</TableCell>
            <TableCell>{guest.receivedInvitation}</TableCell>
            {isAdmin && <TableCell>Editar</TableCell>}
            {isAdmin && <TableCell>Excluir</TableCell>}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
