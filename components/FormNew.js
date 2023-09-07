import axios from "axios";
import { useState } from "react";
import Spinner from "@/components/Spinner";
import { useRouter } from "next/router";
import { ReactSortable } from "react-sortablejs";
import Modal from "react-modal";

function FormNew({
  _id,
  title: existingTitle,
  description: existingDescription,
  images: existingImages,
}) {
  const [newTitle, setNewTitle] = useState(existingTitle || "");
  const [newDescription, setNewDescription] = useState(
    existingDescription || ""
  );
  const [newImages, setNewImages] = useState(existingImages || null);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [selectedEditImage, setSelectedEditImage] = useState(null);
  const router = useRouter();

  async function saveNew(ev) {
    ev.preventDefault();
    const data = {
      newTitle,
      newDescription,
      newImages,
    };
    if (_id) {
      await axios.put("/api/news", { ...data, _id });
    } else {
      await axios.post("/api/news", data);
    }
    router.push("/noticias");

    setNewTitle("");
    setNewDescription("");
    setNewImages("");
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
      setNewImages((oldImages) => {
        return [...oldImages, ...res.data.links];
      });
      setIsUploading(false);
    }
  }

  async function uploadOldImage(ev) {
    const files = ev.target?.files;

    if (files?.length > 0) {
      setIsUploading(true);

      const currentOldImageLink = selectedEditImage;

      const data = new FormData();
      for (const file of files) {
        data.append("file", file);
      }
      const res = await axios.post("/api/upload", data, {
        params: { oldImageLink: selectedEditImage },
      });
      setNewImages((oldImages) =>
        oldImages.map((link) =>
          link === currentOldImageLink ? res.data.links[0] : link
        )
      );

      setEditMode(false);
      setIsUploading(false);
    }
  }

  function updateImagesOrder(newImages) {
    setNewImages(newImages);
  }

  const openImageModal = (imageLink) => {
    setSelectedImage(imageLink);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  const changeEditMode = () => {
    if (editMode) {
      setSelectedEditImage(null);
    }
    setEditMode(!editMode);
  };

  return (
    <div className="flex justify-center">
      <form
        onSubmit={saveNew}
        className="flex flex-col w-full gap-5 bg-white p-7 px-5 mb-5 rounded-lg"
      >
        <div className="flex flex-col">
          <label className="text-xl font-normal">Nombre de la noticia</label>
          <input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="p-2 mt-2"
            type="text"
            placeholder="Escriba el nombre..."
          />
        </div>
        <div className="flex flex-col">
          <label className="text-xl font-normal">Descripcion</label>
          <textarea
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            className="p-2 mt-2 resize-none h-20"
            placeholder="Escriba la descripcion..."
          />
        </div>
        <div className="flex justify-between">
          <label className="text-xl font-normal">
            {editMode ? "Selecciona una imagen a editar" : "Imagenes"}
          </label>
          <div
            onClick={changeEditMode}
            className="inline text-center text-md text-black cursor-pointer"
          >
            {editMode ? (
              <div className="flex justify-center items-center hover:text-red-400 transition-all">
                <p className="text-2xl mx-2 pt-1">
                  <i className="bx bx-x"></i>
                </p>
              </div>
            ) : (
              <div className="flex justify-center items-center hover:text-primary transition-all">
                <p className="text-2xl mx-2 pt-1">
                  <i className="bx bx-edit"></i>
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="mb-2 flex flex-wrap gap-2">
          <ReactSortable
            list={newImages || []}
            className="flex flex-wrap gap-3"
            setList={updateImagesOrder}
          >
            {!!newImages?.length &&
              newImages.map((link) => (
                <div key={link}>
                  {isUploading && selectedEditImage === link ? (
                    <div className="h-24 w-36 p-1 flex items-center justify-center">
                      <Spinner />
                    </div>
                  ) : (
                    <div
                      className={`w-36 h-24 mb-3 bg-white p-1 shadow-md rounded-sm hover:opacity-50 ${
                        editMode && selectedEditImage === link
                          ? "opacity-50"
                          : ""
                      } transition-all`}
                    >
                      <img
                        src={link}
                        alt="Noticia"
                        className="object-contain h-full w-full rounded-md"
                        onClick={() => {
                          if (editMode) {
                            setSelectedEditImage(link);
                          } else {
                            openImageModal(link);
                          }
                        }}
                      />
                    </div>
                  )}
                </div>
              ))}
          </ReactSortable>
          {editMode && selectedEditImage && (
            <label className="cursor-pointer w-full h-10 text-md text-center flex flex-row items-center justify-center gap-1 text-primary rounded-lg bg-white hover:shadow-xl transition-all duration-500 border border-primary">
              <div className="flex justify-center items-center text-center">
                <p className="text-2xl mr-2">
                  <i className="bx bx-upload"></i>
                </p>
                Cambiar imagen
              </div>
              <input type="file" className="hidden" onChange={uploadOldImage} />
            </label>
          )}

          <Modal
            isOpen={!!selectedImage}
            onRequestClose={closeImageModal}
            contentLabel="Imagen"
            className="fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-500"
            overlayClassName="fixed inset-0 bg-black bg-opacity-40 transition-opacity duration-500"
          >
            <div className="max-w-3xl mx-auto p-4 rounded-lg">
              <img
                src={selectedImage}
                alt="Noticia"
                className="max-w-full h-auto"
              />
              <button
                className="block mx-auto mt-5 text-xl text-white"
                onClick={closeImageModal}
              >
                Cerrar
              </button>
            </div>
          </Modal>

          {isUploading && !editMode && (
            <div className="h-24 w-36 p-1 flex items-center">
              <Spinner />
            </div>
          )}

          {!editMode && (
            <label className="cursor-pointer w-full h-10 text-md text-center flex flex-row items-center justify-center gap-1 text-primary rounded-lg bg-white hover:shadow-xl transition-all duration-500 border border-primary">
              <div className="flex justify-center items-center text-center">
                <p className="text-2xl mr-2">
                  <i className="bx bx-upload"></i>
                </p>
                Subir
              </div>
              <input type="file" className="hidden" onChange={uploadImage} />
            </label>
          )}
        </div>

        <div>
          <button
            className="w-full bg-primary hover:bg-cyan-700 transition-all text-white py-2 rounded-md"
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
