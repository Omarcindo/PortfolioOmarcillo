import type { IProyecto } from "@/model/interfaces/IProyecto";
import { ProyectoItem } from "./ProyectoItem";

interface Props {
  proyectos: IProyecto[];
}

export const ProyectosCard = ({ proyectos }: Props) => {
  return (
    <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-12 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
      {proyectos.map((proyecto) => (
        <ProyectoItem 
            key={proyecto.id} 
            proyecto={proyecto} />
      ))}
    </div>
  );
};