import Layout from '@/components/Layout'
import Link from 'next/link'

function TennisPage() {
  return (
    <Layout>
        <div className='listWidth flex flex-col gap-4 text-center rounded-lg'>
            <Link href={'/tenis/usuarios'} className='bg-white py-2 rounded hover:bg-gray-100 transition'>Usuarios</Link>
            <Link href={'/tenis/turnos'} className='bg-white py-2 rounded hover:bg-gray-100 transition'>Turnos</Link>
        </div>
    </Layout>
  )
}

export default TennisPage