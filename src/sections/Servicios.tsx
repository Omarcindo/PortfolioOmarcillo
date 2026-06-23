import { useEffect, useState } from 'react';
import { getOrdenadores } from '@/model/api/main/ordenadores';
import { OrdenadorCard } from '@/components/main/ordenador/OrdenadorCard';
import type { IOrdenador } from '@/model/interfaces/IOrdenador';

const Servicios = () => {
  const [pcs, setPcs] = useState<IOrdenador[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPcs = async () => {
      const data = await getOrdenadores();
      setPcs(data);
      setLoading(false);
    };

    fetchPcs();
  }, []);

  return (
    <section id="servicios" className="min-h-screen flex bg-slate-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 w-full">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">Tienda de Equipos</h2>
          <p className="mt-2 text-lg text-gray-600">Configuración, montaje y venta de ordenadores de alto rendimiento.</p>
        </div>

        {loading ? (
          <div className="mt-20 text-center text-gray-500 text-xl font-medium">
            Cargando catálogo...
          </div>
        ) : pcs.length > 0 ? (
          <OrdenadorCard pcs={pcs} />
        ) : (
          <div className="mt-20 text-center text-gray-500">
            No hay equipos disponibles en el catálogo en este momento.
          </div>
        )}
      </div>
    </section>
  );
};

export default Servicios;