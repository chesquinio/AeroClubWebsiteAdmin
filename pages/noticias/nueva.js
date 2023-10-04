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
        <div className="flex justify-strat items-end">
          <Link
            href={"/noticias"}
            className="bg-white font-normal text-lg rounded-full py-2 px-3 mb-2 ml-2 hover:bg-gray-100 hover:shadow-md shadow-gray-700 transition-all"
          >
            <i class="bx bx-arrow-back"></i>
          </Link>
        </div>
        <FormNew />
      </div>
    </Layout>
  );
}

export default NewNew;
