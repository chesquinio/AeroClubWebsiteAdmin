import EditSections from "@/components/EditSections";
import Layout from "@/components/Layout";
import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function AeroClubPage() {
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
    axios.get("/api/aeroclubData").then((response) => {
      setId(response.data[0]._id);
      setPrimaryTitle(response.data[0].primaryTitle);
      setPrimaryInfo(response.data[0].primaryInfo);
      setPrimaryImage(response.data[0].primaryImage);
      setIsToggleBotton(response.data[0].activeBotton);
      setTextBotton(response.data[0].textBotton);
    });
  }, []);

  async function saveAeroClubData() {
    const data = {
      primaryTitle,
      primaryInfo,
      primaryImage,
      isToggleBotton,
      textBotton,
    };
    await axios.put("/api/aeroclubData", { ...data, _id: id });

    router.push("/aeronautica");
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
        <title>Aeronautica | Aero Club Admin</title>
      </Head>
      <Layout>
        <div className="bg-transparent text-white listWidth my-5 mx-auto text-center py-2 rounded text-xl">
          <h1 className="font-normal text-4xl">Apartado Aeronáutica</h1>
        </div>
        <div>
          <div className="flex flex-col justify-center listWidth mb-4 gap-4 mx-auto">
            <Link
              href={"/aeronautica/reservas"}
              className="bg-white text-gray-500 hover:shadow-lg shadow-gray-700 hover:text-black hover:bg-gray-100 transition-all py-2 rounded text-lg md:text-xl text-center w-full"
            >
              Reservas de Vuelos
            </Link>
            <button
              onClick={() => toggleSection()}
              className="bg-white text-gray-500 hover:shadow-lg shadow-gray-700 hover:text-black hover:bg-gray-100 transition-all py-2 rounded text-lg md:text-xl text-center w-full"
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
                saveData={saveAeroClubData}
              />
            )}
          </div>
        </div>
      </Layout>
    </>
  );
}

export default AeroClubPage;
