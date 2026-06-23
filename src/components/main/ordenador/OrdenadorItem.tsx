import { Link } from "react-router-dom";
import type { IOrdenador } from "@/model/interfaces/IOrdenador";

interface Props {
  pc: IOrdenador;
}

export const OrdenadorItem = ({ pc }: Props) => {
  return (
    <Link 
      to={`/servicios/${pc.id}`}
      className="group flex flex-col bg-white border border-gray-200 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-gray-300"
    >
      <div className="w-full h-56 bg-white p-4 flex items-center justify-center overflow-hidden">
        <img 
          src={pc.imagen_url} 
          alt={pc.nombre} 
          className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105" 
        />
      </div>

      <div className="p-6 flex flex-col grow border-t border-gray-100">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-1">
          {pc.marca}
        </span>
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 h-14 mb-4 transition-colors group-hover:text-indigo-600">
          {pc.nombre}
        </h3>
        
        <div className="mt-auto flex items-center justify-between gap-x-4">
          <span className="text-2xl font-black text-gray-900">
            {pc.precio}€
          </span>
          <span className="rounded-md bg-indigo-50 px-3 py-2 text-sm font-semibold text-indigo-600 shadow-sm ring-1 ring-inset ring-indigo-100 transition-colors group-hover:bg-indigo-100">
            Ver especificaciones
          </span>
        </div>
      </div>
    </Link>
  );
};