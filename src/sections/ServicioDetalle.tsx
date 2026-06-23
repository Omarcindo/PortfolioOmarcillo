import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getOrdenadorById } from "@/model/api/main/ordenadores";
import type { IOrdenador } from "@/model/interfaces/IOrdenador";

const ServicioDetalle = () => {
  const { id } = useParams();
  const [pc, setPc] = useState<IOrdenador | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPcDetalle = async () => {
      const data = await getOrdenadorById(Number(id));
      setPc(data);
      setLoading(false);
    };

    fetchPcDetalle();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-xl text-gray-500">Cargando especificaciones técnicas...</p>
      </div>
    );
  }

  if (!pc) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Equipo no encontrado</h2>
        <p className="text-gray-600 mb-8">El ordenador solicitado no existe en nuestra base de datos.</p>
        <Link to="/servicios" className="bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-500 font-semibold transition-colors">
          Volver al catálogo
        </Link>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-white py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 mt-8">
        <Link to="/servicios" className="text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-x-2 mb-8">
          &larr; Volver al catálogo
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-10">
          <div className="bg-slate-50 border border-gray-100 rounded-2xl p-8 flex items-center justify-center h-[450px]">
            <img src={pc.imagen_url} alt={pc.nombre} className="max-h-full max-w-full object-contain" />
          </div>

          <div className="flex flex-col justify-between">
            <div>
              <span className="text-sm font-bold uppercase tracking-wider text-indigo-600">{pc.marca}</span>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mt-1 mb-4">{pc.nombre}</h1>
              <p className="text-4xl font-black text-gray-950 mb-8">{pc.precio}€</p>
              
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Especificaciones Técnicas</h3>
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-sm">
                  <div className="border-b border-gray-100 pb-2">
                    <dt className="text-gray-500 font-medium">Procesador</dt>
                    <dd className="text-gray-900 font-semibold mt-0.5">{pc.procesador}</dd>
                  </div>
                  <div className="border-b border-gray-100 pb-2">
                    <dt className="text-gray-500 font-medium">Memoria RAM</dt>
                    <dd className="text-gray-900 font-semibold mt-0.5">{pc.ram}</dd>
                  </div>
                  <div className="border-b border-gray-100 pb-2">
                    <dt className="text-gray-500 font-medium">Almacenamiento</dt>
                    <dd className="text-gray-900 font-semibold mt-0.5">{pc.almacenamiento}</dd>
                  </div>
                  <div className="border-b border-gray-100 pb-2">
                    <dt className="text-gray-500 font-medium">Tarjeta Gráfica</dt>
                    <dd className="text-gray-900 font-semibold mt-0.5">{pc.grafica}</dd>
                  </div>
                </dl>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6 mt-8">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2">Descripción del Equipo</h3>
              <p className="text-gray-600 text-base leading-relaxed">{pc.descripcion}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicioDetalle;