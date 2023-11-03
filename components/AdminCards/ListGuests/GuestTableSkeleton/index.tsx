import "react-loading-skeleton/dist/skeleton.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { CustomFlowbiteTheme, Flowbite, Table } from "flowbite-react";

interface IProps {
  isAdminPage: boolean;
}

export default function GuestTableSkeleton({ isAdminPage }: IProps) {
  const customTheme: CustomFlowbiteTheme = {
    table: {
      root: {
        base: "w-full max-[370px]:text-xs",
      },
      head: {
        base: "text-gray-400 group/head",
        cell: { base: "bg-gray-700 p-3 max-sm:p-2" },
      },
      row: {
        base: "border-gray-700 bg-gray-800 text-white",
        hovered: "hover:bg-gray-600",
      },
    },
  };

  return (
    <Flowbite theme={{ theme: customTheme }}>
      <Table className="bg-gray-700 text-xs uppercase text-gray-400 ">
        <Table.Head>
          <Table.HeadCell>Nome</Table.HeadCell>
          {isAdminPage && <Table.HeadCell>Recebeu convite?</Table.HeadCell>}
          <Table.HeadCell>Status</Table.HeadCell>
          {isAdminPage && <Table.HeadCell>Editar</Table.HeadCell>}
          {isAdminPage && <Table.HeadCell>Excluir</Table.HeadCell>}
        </Table.Head>
        <Table.Body>
          {Array.from({ length: 5 }).map((_, index) => (
            <Table.Row key={index} className="border-gray-700 bg-gray-800">
              <SkeletonTheme baseColor="#2c3e50" highlightColor="#34495e">
                <Table.Cell>
                  <Skeleton />
                </Table.Cell>
                <Table.Cell>
                  <Skeleton />
                </Table.Cell>
                {isAdminPage && (
                  <>
                    <Table.Cell>
                      <Skeleton />
                    </Table.Cell>
                    <Table.Cell>
                      <Skeleton />
                    </Table.Cell>
                    <Table.Cell>
                      <Skeleton />
                    </Table.Cell>
                  </>
                )}
              </SkeletonTheme>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Flowbite>
  );
}
