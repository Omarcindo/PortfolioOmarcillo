import { Link, Outlet, useLocation } from 'react-router-dom';
import { 
  ComputerDesktopIcon, 
  BriefcaseIcon, 
  AcademicCapIcon, 
  ArrowLeftOnRectangleIcon,
  HomeIcon
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: HomeIcon },
  { name: 'Equipos', href: '/admin/equipos', icon: ComputerDesktopIcon },
  { name: 'Proyectos', href: '/admin/proyectos', icon: BriefcaseIcon },
  { name: 'Formación', href: '/admin/formacion', icon: AcademicCapIcon },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export const BackendLayout = () => {
  const location = useLocation();

  return (
    <div className="flex h-screen bg-white font-sans text-slate-950">
      
      <div className="hidden md:flex md:w-64 md:flex-col border-r border-slate-200 bg-slate-50/50">
        <div className="flex flex-grow flex-col overflow-y-auto pt-6">
          
          <div className="flex shrink-0 items-center px-6 mb-6">
            <div className="flex items-center gap-2 font-semibold text-slate-900 text-base tracking-tight">
              <div className="h-6 w-6 bg-slate-950 rounded-[4px] text-white flex items-center justify-center text-xs font-bold">
                P
              </div>
              Portfolio<span className="text-slate-500 font-normal">Admin</span>
            </div>
          </div>

          <div className="mt-2 flex flex-grow flex-col">
            <nav className="flex-1 space-y-1 px-4 pb-4">
              {navigation.map((item) => {
                const isCurrent = location.pathname === item.href || location.pathname.startsWith(`${item.href}/`);
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={classNames(
                      isCurrent 
                        ? 'bg-slate-200/50 text-slate-900 font-medium' 
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
                      'group flex items-center rounded-md px-3 py-2 text-sm transition-all duration-200'
                    )}
                  >
                    <item.icon
                      className={classNames(
                        isCurrent ? 'text-slate-900' : 'text-slate-400 group-hover:text-slate-600',
                        'mr-3 h-[18px] w-[18px] shrink-0 transition-colors'
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="p-4 px-4 mt-auto">
            <Link
              to="/"
              className="group flex items-center rounded-md px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
            >
              <ArrowLeftOnRectangleIcon className="mr-3 h-[18px] w-[18px] text-slate-400 group-hover:text-slate-600" aria-hidden="true" />
              Volver a la Web
            </Link>
          </div>

        </div>
      </div>

      <div className="flex flex-1 flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto bg-white focus:outline-none">
          <Outlet /> 
        </main>
      </div>

    </div>
  );
};