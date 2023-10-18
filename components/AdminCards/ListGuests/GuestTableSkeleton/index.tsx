import "react-loading-skeleton/dist/skeleton.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

interface IProps {
  isAdminPage: boolean;
}

export default function GuestTableSkeleton({ isAdminPage }: IProps) {
  return (
    <div>
      <table className="bg-gray-700 text-xs uppercase text-gray-400 ">
        <thead>
          <tr>
            <th>Nome</th>
            {isAdminPage && <th>Recebeu convite?</th>}
            <th>Status</th>
            {isAdminPage && <th>Editar</th>}
            {isAdminPage && <th>Excluir</th>}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 5 }).map((_, index) => (
            <tr key={index} className="border-gray-700 bg-gray-800">
              <SkeletonTheme baseColor="#2c3e50" highlightColor="#34495e">
                <td>
                  <Skeleton />
                </td>
                <td>
                  <Skeleton />
                </td>
                {isAdminPage && (
                  <>
                    <td>
                      <Skeleton />
                    </td>
                    <td>
                      <Skeleton />
                    </td>
                    <td>
                      <Skeleton />
                    </td>
                  </>
                )}
              </SkeletonTheme>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
