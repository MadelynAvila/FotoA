import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom'

export default function PublicLayout(){
  return (
    <div className="min-h-screen flex flex-col bg-sand text-slate-700">
      <Navbar />
       {/*AQUI VA EL CONTENIDO DE CADA PAGINA, PUEDO EDITAR LOS BORDES QUE QUIERO LIBRES DONDE NO HAY CONTENIDO///*/}
      <main className="flex-1 pt-4 md:pt-0">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
