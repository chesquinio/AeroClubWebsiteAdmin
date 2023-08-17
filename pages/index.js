import Layout from '@/components/Layout'
import { useSession } from "next-auth/react";

function HomePage() {
  const {data: session} = useSession()

  if (!session) return;

  return (
      <Layout>
        <div className='bg-blue-300'>Home</div>
      </Layout>
  )
}


export default HomePage