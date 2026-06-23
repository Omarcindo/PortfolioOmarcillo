import { Outlet } from 'react-router-dom'
import Footer from '../components/main/Footer'
import Header from '../components/main/Header'

export const MainLayout = () => {
  return (
    <div className='min-h-screen flex flex-col w-full bg-slate-50 text-slate-900'>
        <Header/>
        
        <main className="flex-grow pt-16">
          <Outlet />
        </main>

        <Footer/>
    </div>
  )
}