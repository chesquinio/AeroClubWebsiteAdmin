import Layout from "@/components/Layout";
import FormNew from "@/components/FormNew";
import Link from "next/link";

function NewNew() {
  return (
    <Layout>
        <div className="bg-transparent text-white listWidthDefault mx-auto mt-5 text-center py-2 rounded-lg">
          <h1 className="font-normal text-4xl">Nueva Noticia</h1>
        </div>
        <div className="listWidthDefault mx-auto my-5">
          <FormNew/>
          <div className="flex justify-end items-end">
            <Link href={'/noticias'} className="bg-white font-normal text-lg rounded py-2 px-6 hover:bg-gray-200 transition-all">Atras</Link>
          </div>
        </div>
    </Layout>
  )
}

export default NewNew;