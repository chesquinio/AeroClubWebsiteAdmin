import Layout from "@/components/Layout";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import FormNew from "@/components/FormNew";
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
      
        <div className="bg-white listWidthDefault text-center py-2 rounded-lg">
          <h1 className="font-medium">Editar Noticia</h1>
        </div>
        <div className="listWidthDefault">
            {newInfo && <FormNew {...newInfo} />}
        </div>
    </Layout>
  );
}

export default EditNew;
