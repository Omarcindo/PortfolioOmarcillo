import { useEffect, useState } from 'react';
import { supabase } from '@/model/utils/supabase';
import { ProyectosCard } from '@/components/main/proyectos/ProyectosCard';
import type { IProyecto } from '@/model/interfaces/IProyecto';

const Proyectos = () => {
  const [proyectos, setProyectos] = useState<IProyecto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProyectos = async () => {
      try {
        const { data, error } = await supabase
          .from('proyectos')
          .select('*')
          .order('id', { ascending: true });

        if (error) throw error;
        
        if (data) {
          const proyectosMapeados = data.map((p) => ({
            ...p,
            category: typeof p.category === 'string' 
              ? { title: p.category, href: '#' } 
              : p.category
          }));
          
          setProyectos(proyectosMapeados);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProyectos();
  }, []);

  return (
    <section id="proyectos" className="min-h-screen flex items-center justify-center bg-white">
      <div className="py-24 sm:py-32 w-full">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">Proyectos Destacados</h2>
            <p className="mt-2 text-lg/8 text-gray-600">Galería de trabajos, scripts y despliegues técnicos</p>
          </div>

          {loading ? (
            <div className="mt-20 text-center text-gray-500 text-xl font-medium">
              Conectando con la base de datos...
            </div>
          ) : proyectos.length > 0 ? (
            <ProyectosCard proyectos={proyectos} />
          ) : (
            <div className="mt-20 text-center text-gray-500">
              No se encontraron proyectos.
            </div>
          )}
          
        </div>
      </div>
    </section>
  )
}

export default Proyectos;