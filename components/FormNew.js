import axios from "axios";
import { useState } from "react";
import Spinner from "@/components/Spinner";
import { useRouter } from "next/router";

function FormNew({
    _id,
    title: existingTitle,
    description: existingDescription,
}) {
  const [newTitle, setNewTitle] = useState(existingTitle || "");
  const [newDescription, setNewDescription] = useState(existingDescription || "");
  const [newImage, setNewImage] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter()

  async function saveNew(ev) {
    ev.preventDefault();
    const data = {
      newTitle,
      newDescription,
      newImage,
    };
    if (_id) {
        await axios.put("/api/news", {...data, _id})
    } else {
        await axios.post("/api/news", data);
    }
    router.push('/noticias')

    setNewTitle("");
    setNewDescription("");
    setNewImage("");
  }

  async function uploadImage(ev) {
    const files = ev.target?.files;

    if (files?.length > 0) {
      setIsUploading(true);
      const data = new FormData();
      for (const file of files) {
        data.append("file", file);
      }
      const res = await axios.post("/api/upload", data);
      setNewImage((oldImages) => {
        return [...oldImages, ...res.data.links];
      });
      setIsUploading(false);
    }
  }

  return (
      <div className="flex justify-center">
        <form
          onSubmit={saveNew}
          className="flex flex-col w-full gap-5 bg-white p-7 px-14 mt-7 rounded-lg"
        >
          <div className="flex flex-col">
            <label>Nombre de la noticia</label>
            <input
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="p-1 mt-2"
              type="text"
              placeholder="Escriba el nombre..."
            />
          </div>
          <div className="flex flex-col">
            <label>Descripcion</label>
            <input
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              className="p-1 mt-2"
              type="text"
              placeholder="Escriba la descripcion..."
            />
          </div>
          <div className="flex flex-col">
            <label>{_id ? 'Elige una nueva imagen' : 'Imagen'}</label>
            <div className="my-2 flex flex-wrap gap-2">
              
                {newImage.length > 0 && (
                  <div className="flex justify-center h-32 bg-white p-2 shadow-md rounded-sm">
                    <img src={newImage} className="rounded-md" alt="Imagen de la noticia" />
                  </div>
                )}
              
              {isUploading && (
                <div className="h-24 w-24 p-1 flex items-center">
                  <Spinner />
                </div>
              )}
              {newImage.length !== 1 && (
                <label className="cursor-pointer w-24 h-24 text-center flex flex-col items-center justify-center text-sm gap-1 text-primary rounded-sm bg-white shadow-md border border-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                    />
                  </svg>
                  <div>Subir</div>
                  <input
                    type="file"
                    className="hidden"
                    onChange={uploadImage}
                  />
                </label>
              )}
            </div>
          </div>
          <div>
            <button
              className="w-full bg-blue-300 py-2 rounded-md"
              type="submit"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
  );
}

export default FormNew;