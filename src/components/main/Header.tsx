import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link, useLocation } from 'react-router-dom' 
import './Header.css'

const navigation = [
  { name: 'Inicio', href: '/' },
  { name: 'Formación', href: '/formacion' },
  { name: 'Proyectos', href: '/proyectos' },
  { name: 'Servicios', href: '/servicios' },
  { name: 'Contacto', href: '/contacto' },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Header() {
  const location = useLocation()

  return (
    <Disclosure
      as="nav"
      className="fixed top-0 w-full bg-white/80 backdrop-blur-md shadow-sm z-50 border-b border-gray-200"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:outline-2 focus:-outline-offset-1 focus:outline-indigo-500">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
            </DisclosureButton>
          </div>

          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="hidden sm:block">
              <nav className="flex space-x-2">
                {navigation.map((item) => {
                  const isCurrent = location.pathname === item.href;
                  
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      aria-current={isCurrent ? 'page' : undefined}
                      className={classNames(
                        isCurrent
                          ? 'bg-slate-100 text-slate-900'
                          : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900', 
                        'rounded-md px-4 py-2 text-sm font-medium transition-colors',
                      )}
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>

          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div className="flex flex-col items-end text-right">
              <span className="text-xl font-bold tracking-tight text-slate-900">
                Omar<span className="text-indigo-600">MMQ</span>
              </span>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[10px] font-mono font-medium tracking-widest text-slate-400 uppercase">
                  sysadmin
                </span>
                <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                <span className="text-[10px] font-mono font-medium tracking-widest text-slate-400 uppercase">
                  dev
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>

      <DisclosurePanel className="sm:hidden border-t border-gray-100 bg-white">
        <div className="space-y-1 px-2 pt-2 pb-3">
          {navigation.map((item) => {
            const isCurrent = location.pathname === item.href;

            return (
              <DisclosureButton
                key={item.name}
                as={Link}
                to={item.href}
                aria-current={isCurrent ? 'page' : undefined}
                className={classNames(
                  isCurrent
                    ? 'bg-slate-50 text-slate-900'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900',
                  'block rounded-md px-3 py-2 text-base font-medium transition-colors',
                )}
              >
                {item.name}
              </DisclosureButton>
            );
          })}
        </div>
      </DisclosurePanel>
    </Disclosure>
  )
}