import Link from "next/link"
import {useRouter} from "next/router";

function Nav() {
  const inactiveLink = 'flex my-2 p-1 px-5'
  const activeLink = inactiveLink+' bg-primary rounded-md text-white font-medium'
  const router = useRouter()
  const {pathname} = router

  return (
    <aside>
        <nav className="bg-white flex flex-col mt-5 ml-8 p-5 rounded-lg font-light text-xl">
            <Link className={pathname === '/' ? activeLink : inactiveLink} href={'/'}>Inicio</Link>
            <Link className={pathname === '/noticias' || pathname === '/noticias/nueva' || pathname === '/noticias/editar/[id]' ? activeLink : inactiveLink} href={'/noticias'}>Noticias</Link>
            <Link className={pathname === '/tenis' ? activeLink : inactiveLink} href={'/tenis'}>Tenis</Link>
            <Link className={pathname === '/aeroclub' ? activeLink : inactiveLink} href={'/aeroclub'}>AeroClub</Link>
            <Link className={pathname === '/colonia' || pathname === '/colonia/inscripciones' || pathname === '/colonia/inscripciones/[documento]' ? activeLink : inactiveLink} href={'/colonia'}>Colonia</Link>
        </nav>
    </aside>
  )
}

export default Nav