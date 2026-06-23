import type { IFormacion } from "@/model/interfaces/IFormacion";
import { FormacionItem } from "./FormacionItem";

interface Props {
  formaciones: IFormacion[];
}

export const FormacionCard = ({ formaciones }: Props) => {
  return (
    <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-12 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
      {formaciones.map((item) => (
        <FormacionItem key={item.id} titulo={item} />
      ))}
    </div>
  );
};