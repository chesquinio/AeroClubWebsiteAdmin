import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import EditSections from "@/components/EditSections";

function TennisPage() {
  const [id, setId] = useState("");
  const [primaryTitle, setPrimaryTitle] = useState("");
  const [primaryInfo, setPrimaryInfo] = useState("");
  const [primaryImage, setPrimaryImage] = useState("");
  const [isToggleBotton, setIsToggleBotton] = useState(false);
  const [textBotton, setTextBotton] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    axios.get("/api/tennisData").then((response) => {
      setId(response.data[0]._id);
      setPrimaryTitle(response.data[0].primaryTitle);
      setPrimaryInfo(response.data[0].primaryInfo);
      setPrimaryImage(response.data[0].primaryImage);
      setIsToggleBotton(response.data[0].activeBotton);
      setTextBotton(response.data[0].textBotton);
    });
  }, []);

  async function saveTennisData() {
    const data = {
      primaryTitle,
      primaryInfo,
      primaryImage,
      isToggleBotton,
      textBotton,
    };
    await axios.put("/api/tennisData", { ...data, _id: id });

    router.push("/tenis");
  }

  async function uploadImage(ev) {
    const files = ev.target?.files;

    if (files?.length > 0) {
      setIsUploading(true);

      const currentOldImageLink = primaryImage;

      const data = new FormData();
      for (const file of files) {
        data.append("file", file);
      }
      const res = await axios.post("/api/upload", data, {
        params: { oldImageLink: currentOldImageLink },
      });
      setPrimaryImage(res.data.links);
      setIsUploading(false);
    }
  }

  const handleToggle = (e) => {
    e.preventDefault();
    setIsToggleBotton(!isToggleBotton);
  };

  return (
    <Layout>
      <div className="bg-white listWidth my-5 mx-auto text-center py-2 rounded text-xl">
        <h1 className="font-light text-2xl">Apartado Tenis</h1>
      </div>
      <EditSections
        primaryTitle={primaryTitle}
        setPrimaryTitle={setPrimaryTitle}
        primaryInfo={primaryInfo}
        setPrimaryInfo={setPrimaryInfo}
        primaryImage={primaryImage}
        setPrimaryImage={setPrimaryImage}
        isUploading={isUploading}
        uploadImage={uploadImage}
        isToggleBotton={isToggleBotton}
        handleToggle={handleToggle}
        textBotton={textBotton}
        setTextBotton={setTextBotton}
        saveData={saveTennisData}
      />
    </Layout>
  );
}

export default TennisPage;
