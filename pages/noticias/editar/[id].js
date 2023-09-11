import Layout from "@/components/Layout";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import FormNew from "@/components/FormNew";
import Link from "next/link";
import axios from "axios";

function EditNew() {
  const [newInfo, setNewInfo] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) return;
    axios.get("/api/news?id=" + id).then((response) => {
      setNewInfo(response.data);
    });
  }, [id]);

  return (
    <Layout>  
        <div className="bg-transparent text-white listWidthDefault mx-auto mt-5 text-center py-2 rounded-lg">
          <h1 className="font-normal text-4xl">Editar Noticia</h1>
        </div>
        <div className="listWidthDefault mx-auto my-5">
            {newInfo && <FormNew {...newInfo} />}
            <div className="flex justify-end items-end">
              <Link href={'/noticias'} className="bg-white font-normal text-lg rounded py-2 px-6 hover:bg-gray-200 transition-all">Atras</Link>
            </div>
        </div>
    </Layout>
  );
}

export default EditNew;
