import Link from "next/link"
import {useRouter} from "next/router";

function Nav() {
  const inactiveLink = 'flex my-2 p-1 px-5'
  const activeLink = inactiveLink+' bg-blue-300 rounded-md'
  const router = useRouter()
  const {pathname} = router

  return (
    <aside>
        <nav className="bg-white flex flex-col mt-5 ml-8 p-5 rounded-lg">
            <Link className={pathname === '/noticias' || pathname === '/noticias/nueva' ? activeLink : inactiveLink} href={'/noticias'}>Noticias</Link>
            <Link className={pathname === '/usuarios' ? activeLink : inactiveLink} href={'/usuarios'}>Usuarios</Link>
            <Link className={pathname === '/tenis' || pathname === '/tenis/usuarios' || pathname === '/tenis/turnos' ? activeLink : inactiveLink} href={'/tenis'}>Tenis</Link>
            <Link className={pathname === '/aeroclub' ? activeLink : inactiveLink} href={'/aeroclub'}>AeroClub</Link>
            <Link className={pathname === '/camping' ? activeLink : inactiveLink} href={'/camping'}>Camping</Link>
        </nav>
    </aside>
  )
}

export default Nav