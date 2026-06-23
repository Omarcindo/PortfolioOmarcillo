import { Terminal } from 'lucide-react';

export default function SobreMi() {
  return (
    <section id="sobremi" className="py-24 bg-white border-t border-slate-100">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-10">Sobre Mí</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            <div className="lg:col-span-2 bg-slate-50 border border-slate-200 rounded-3xl p-8 sm:p-10">
              <h3 className="text-xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <Terminal className="h-5 w-5 text-indigo-600" />
                Perfil Técnico
              </h3>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>
                  Soy un apasionado de la tecnología con una visión orientada a la eficiencia. Mi base organizativa me enseñó a optimizar procesos, y ahora aplico esa misma mentalidad a la administración de sistemas informáticos y redes.
                </p>
                <p>
                  Más allá de administrar servidores y gestionar infraestructuras, programo mis propias herramientas. Me enfoco en desarrollar scripts en Python para el análisis y filtrado de datos financieros, y en levantar entornos de servidor privados (Ubuntu Server, Jellyfin, Tailscale) para controlar mi propia infraestructura.
                </p>
                <p>
                  Mantengo una estricta disciplina técnica y de gestión de riesgos, enfocándome en soluciones estructuradas y escalables para resolver problemas IT complejos.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white border border-slate-200 rounded-3xl p-6 flex flex-col justify-center items-center text-center shadow-sm">
                <span className="text-3xl font-bold text-slate-900">1º</span>
                <span className="text-xs font-medium text-slate-500 uppercase mt-1">Año ASIR</span>
              </div>
              <div className="bg-white border border-slate-200 rounded-3xl p-6 flex flex-col justify-center items-center text-center shadow-sm">
                <span className="text-3xl font-bold text-indigo-600">+6</span>
                <span className="text-xs font-medium text-slate-500 uppercase mt-1">Proyectos</span>
              </div>
              <div className="bg-white border border-slate-200 rounded-3xl p-6 flex flex-col justify-center items-center text-center shadow-sm">
                <span className="text-3xl font-bold text-slate-900">+500</span>
                <span className="text-xs font-medium text-slate-500 uppercase mt-1">Horas de Lab</span>
              </div>
              <div className="bg-slate-900 rounded-3xl p-6 flex flex-col justify-center items-center text-center shadow-sm">
                <span className="text-3xl font-bold text-white">100%</span>
                <span className="text-xs font-medium text-slate-400 uppercase mt-1">Motivación</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}