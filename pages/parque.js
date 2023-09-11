import EditSections from "@/components/EditSections";
import Layout from "@/components/Layout";
import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";

function CampingPage() {
  const [id, setId] = useState("");
  const [primaryTitle, setPrimaryTitle] = useState("");
  const [primaryInfo, setPrimaryInfo] = useState("");
  const [primaryImage, setPrimaryImage] = useState("");
  const [isToggleBotton, setIsToggleBotton] = useState(false);
  const [textBotton, setTextBotton] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const [isToggleSection, setIsToggleSection] = useState(false);
  const router = useRouter();

  useEffect(() => {
    axios.get("/api/campingData").then((response) => {
      setId(response.data[0]._id);
      setPrimaryTitle(response.data[0].primaryTitle);
      setPrimaryInfo(response.data[0].primaryInfo);
      setPrimaryImage(response.data[0].primaryImage);
      setIsToggleBotton(response.data[0].activeBotton);
      setTextBotton(response.data[0].textBotton);
    });
  }, []);

  async function saveCampingData() {
    const data = {
      primaryTitle,
      primaryInfo,
      primaryImage,
      isToggleBotton,
      textBotton,
    };
    await axios.put("/api/campingData", { ...data, _id: id });

    router.push("/parque");
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

  const toggleSection = () => {
    setIsToggleSection(!isToggleSection);
  };

  return (
    <>
      <Head>
        <title>Parque | Aero Club Admin</title>
      </Head>
      <Layout>
        <div className="bg-transparent text-white listWidth text-center py-2 rounded text-xl mx-auto mt-5 mb-10">
          <h1 className="font-normal text-4xl">Apartado Parque</h1>
        </div>
        <div>
          <div className="flex flex-col justify-center listWidth mb-4 gap-4 mx-auto">
            <Link
              href={"/colonia/inscripciones"}
              className="bg-white text-gray-500 hover:shadow-lg hover:text-black hover:bg-gray-100 transition-all duration-500 py-2 rounded text-lg md:text-xl text-center w-full"
            >
              Incripciones Colonia
            </Link>
            <button
              onClick={() => toggleSection()}
              className="bg-white text-gray-500 hover:shadow-lg hover:text-black hover:bg-gray-100 transition-all duration-500 py-2 rounded text-lg md:text-xl text-center w-full"
            >
              Editar Sección
            </button>
          </div>
          <div className="flex flex-col justify-center mb-4 mx-auto">
            {isToggleSection && (
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
                saveData={saveCampingData}
              />
            )}
          </div>
        </div>
      </Layout>
    </>
  );
}

export default CampingPage;
