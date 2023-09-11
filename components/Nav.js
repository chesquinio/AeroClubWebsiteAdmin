import Link from "next/link"
import {useRouter} from "next/router";

function Nav() {
  const inactiveLink = 'flex my-2 p-1 px-5 hover:bg-primary hover:text-white rounded-md transition-all duration-500'
  const activeLink = inactiveLink+' bg-primary text-white font-medium'
  const router = useRouter()
  const {pathname} = router

  const logoutSession = () => {
    localStorage.removeItem("token"); 
    router.push("/iniciar"); 
  }

  return (
    <aside>
        <nav className="flex flex-col mt-5 ml-8 font-light text-xl">
            <div className="bg-white rounded-lg p-5">
              <Link className={pathname === '/' ? activeLink : inactiveLink} href={'/'}>Inicio</Link>
              <Link className={pathname === '/noticias' || pathname === '/noticias/nueva' || pathname === '/noticias/editar/[id]' ? activeLink : inactiveLink} href={'/noticias'}>Noticias</Link>
              <Link className={pathname === '/aeronautica' ? activeLink : inactiveLink} href={'/aeronautica'}>Aeronáutica</Link>
              <Link className={pathname === '/tenis' ? activeLink : inactiveLink} href={'/tenis'}>Tenis</Link>
              <Link className={pathname === '/parque' || pathname === '/parque/colonia' || pathname === '/parque/colonia/[documento]' ? activeLink : inactiveLink} href={'/parque'}>Parque</Link>
            </div>
            <div className="bg-white rounded-lg py-2 px-5 mt-5">
              <button onClick={logoutSession} className={inactiveLink}>Cerrar Sesión</button>
            </div>
        </nav>
    </aside>
  )
}

export default Nav