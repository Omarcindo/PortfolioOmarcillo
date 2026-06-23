import type { IFormacion } from "@/model/interfaces/IFormacion";

interface Props {
  titulo: IFormacion;
}

export const FormacionItem = ({ titulo }: Props) => {
  return (
    <article className="flex flex-col bg-white border border-gray-200 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-gray-300">
      <div className="w-full h-48 overflow-hidden bg-gray-100">
        <img 
          src={titulo.imageUrl} 
          alt={titulo.title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
        />
      </div>
      <div className="p-6 flex flex-col grow">
        <div className="flex items-center gap-x-4 text-xs mb-3">
          <time dateTime={titulo.datetime} className="text-gray-500">
            {titulo.date}
          </time>
          <a
            href={titulo.category.href}
            className="relative z-10 rounded-full bg-gray-100 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-200 transition-colors"
          >
            {titulo.category.title}
          </a>
        </div>
        <div className="group relative">
          <h3 className="text-lg/6 font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-2">
            <a href={titulo.href}>
              <span className="absolute inset-0" />
              {titulo.title}
            </a>
          </h3>
        </div>
      </div>
    </article>
  );
};