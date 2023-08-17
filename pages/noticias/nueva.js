import Layout from "@/components/Layout";
import FormNew from "@/components/FormNew";

function NewNew() {
  return (
    <Layout>
        <div className="bg-white listWidthDefault text-center py-2 rounded-lg">
            <h1 className="font-medium">Nueva Noticia</h1>
        </div>
        <FormNew/>
    </Layout>
  )
}

export default NewNew;