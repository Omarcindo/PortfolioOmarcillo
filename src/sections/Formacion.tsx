import { useEffect, useState } from 'react';
import { supabase } from '@/model/utils/supabase';
import { FormacionCard } from '@/components/main/formacion/FormacionCard';
import type { IFormacion } from '@/model/interfaces/IFormacion';

const Formacion = () => {
  const [formaciones, setFormaciones] = useState<IFormacion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFormacion = async () => {
      try {
        const { data, error } = await supabase
          .from('formacion')
          .select('*')
          .order('id', { ascending: true });

        if (error) throw error;

        if (data) {
          const formacionMapeada = data.map((f) => ({
            ...f,
            category: typeof f.category === 'string'
              ? { title: f.category, href: '#' }
              : f.category
          }));

          setFormaciones(formacionMapeada);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchFormacion();
  }, []);

  return (
    <section id="formacion" className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="py-24 sm:py-32 w-full">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">Titulaciones Académicas</h2>
            <p className="mt-2 text-lg/8 text-gray-600">Títulos de Formación Profesional y Especializaciones Técnicas</p>
          </div>

          {loading ? (
            <div className="mt-20 text-center text-gray-500 text-xl font-medium">
              Conectando con la base de datos...
            </div>
          ) : formaciones.length > 0 ? (
            <FormacionCard formaciones={formaciones} />
          ) : (
            <div className="mt-20 text-center text-gray-500">
              No se encontraron titulaciones.
            </div>
          )}

        </div>
      </div>
    </section>
  )
}

export default Formacion;