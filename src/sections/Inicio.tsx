import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Inicio() {
  return (
    <section id="inicio" className="relative pt-24 pb-32 sm:pt-32 sm:pb-40 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none lg:grid lg:grid-cols-2 lg:gap-x-16 lg:gap-y-6 xl:gap-x-24">
          
          <div className="flex flex-col justify-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-800 ring-1 ring-inset ring-slate-200 w-fit">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Sistema Operativo
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl">
              Hola, soy <span className="text-indigo-600">Omar</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              Estudiante de <strong>1º ASIR</strong> especializado en automatización, administración de servidores y desarrollo web. Transformo procesos manuales en infraestructuras eficientes.
            </p>
            
            <div className="mt-8 flex items-center gap-x-6">
              <Link
                to="/proyectos"
                className="rounded-md bg-slate-900 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 transition-colors"
              >
                Ver mis proyectos
              </Link>
              <Link to="/contacto" className="text-sm font-semibold leading-6 text-slate-900 group flex items-center gap-1">
                Contactar <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          <div className="mt-16 sm:mt-24 lg:mt-0 flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-sm lg:max-w-md">
              <div className="absolute -inset-2 rounded-3xl bg-indigo-100/50 blur-2xl"></div>
              
              <img
                src="../../public/img/perfil.PNG" 
                alt="Omar - Perfil Técnico"
                className="relative w-full rounded-2xl shadow-xl ring-1 ring-slate-900/5 object-cover aspect-[4/5] transition-transform duration-500 hover:-translate-y-2"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}