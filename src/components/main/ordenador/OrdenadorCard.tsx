import type { IOrdenador } from "@/model/interfaces/IOrdenador";
import { OrdenadorItem } from "./ordenadorItem";

interface Props {
  pcs: IOrdenador[];
}

export const OrdenadorCard = ({ pcs }: Props) => {
  return (
    <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 xl:grid-cols-4">
      {pcs.map((pc) => (
        <OrdenadorItem key={pc.id} pc={pc} />
      ))}
    </div>
  );
};