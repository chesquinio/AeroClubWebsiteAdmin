import Link from 'next/link'
import {useRouter} from "next/router";

function ResponsiveNav() {
  const router = useRouter()

  const logoutSession = () => {
    localStorage.removeItem("token"); 
    router.push("/iniciar"); 
  }

  return (
    <div>
        <nav className='flex flex-col items-center bg-primary w-screen'>
            <Link className='text-xl font-medium py-5 text-white hover:text-gray-200 transition' href={'/'}>Inicio</Link>
            <Link className='text-xl font-medium py-5 text-white hover:text-gray-200 transition' href={'/noticias'}>Noticias</Link>
            <Link className='text-xl font-medium py-5 text-white hover:text-gray-200 transition' href={'/aeronautica'}>Aeronáutica</Link>
            <Link className='text-xl font-medium py-5 text-white hover:text-gray-200 transition' href={'/tenis'}>Tenis</Link>
            <Link className='text-xl font-medium py-5 text-white hover:text-gray-200 transition' href={'/parque'}>Parque</Link>
            <button onClick={logoutSession} className='text-xl font-medium py-5 text-white hover:text-gray-200 transition'>Cerrar Sesión</button>
        </nav>
    </div>
  )
}

export default ResponsiveNav