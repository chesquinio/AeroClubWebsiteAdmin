import React from "react";
import Spinner from "@/components/Spinner";

function EditSections({
  primaryTitle,
  setPrimaryTitle,
  primaryInfo,
  setPrimaryInfo,
  primaryImage,
  setPrimaryImage,
  isUploading,
  uploadImage,
  isToggleBotton,
  handleToggle,
  textBotton,
  setTextBotton,
  saveData,
}) {

  return (
    <form
      onSubmit={saveData}
      className="w-full xl:w-4/5 mx-auto bg-white p-5 xl:p-10 rounded-md"
    >
      <div class="flex flex-col lg:flex-row ">
        <div className="w-full lg:w-3/5 xl:w-1/2 mx-auto lg:mx-0 mt-6 lg:mt-0">
          <div className="bg-gray-200 h-52 w-4/5 mx-auto rounded-lg flex justify-center items-center">
            {isUploading && primaryImage && (
              <div className="h-24 w-24 flex justify-center items-center">
                <Spinner />
              </div>
            )}
            {!isUploading && primaryImage && (
              <img
                src={primaryImage}
                className="object-cover rounded-lg h-52 w-full"
                alt="Tenis AeroClub"
              />
            )}
          </div>
          <div className="flex justify-center">
            <label className="bg-white w-4/5 rounded my-4 py-2 text-md lg:text-lg border text-primary border-primary hover:shadow-xl hover:bg-gray-100 transition-all duration-500">
              <div className="flex justify-center items-center text-center">
                <p className="text-2xl mr-2">
                  <i className="bx bx-upload"></i>
                </p>
                Cambiar Imagen
              </div>
              <input type="file" className="hidden" onChange={uploadImage} />
            </label>
          </div>
        </div>
        <div className="flex flex-col text-center lg:text-left mt-4 lg:mt-0 xl:w-1/2">
          <div className="flex flex-col gap-2">
            <input
              type="text"
              className="text-2xl px-4 py-2 mb-2 border rounded focus:outline-none border-none"
              value={primaryTitle}
              onChange={(e) => setPrimaryTitle(e.target.value)}
              placeholder="Escriba un titulo principal..."
            />
          </div>
          <div className="flex flex-col gap-2">
            <textarea
              className="text-md px-4 py-2 h-40 rounded focus:outline-none resize-none border-none"
              value={primaryInfo}
              onChange={(e) => setPrimaryInfo(e.target.value)}
              placeholder="Escriba una descripcion..."
            ></textarea>
          </div>
        </div>
      </div>
      <div className="h-px flex bg-primary mt-7 mb-10 mx-4"></div>
      <div className="flex justify-center h-20 my-5">
        <div className="hidden lg:block lg:w-1/2"></div>
        <div className="flex flex-row justify-start lg:w-1/2 gap-5">
          <div>
            <button
              className={`border ${
                !isToggleBotton
                  ? `border-green-600 text-green-600 hover:bg-green-600 `
                  : `border-red-500 text-red-500 hover:bg-red-500 `
              } hover:text-white text-lg rounded py-2 px-4 transition-all duration-500`}
              onClick={handleToggle}
            >
              {!isToggleBotton ? "Activar Formulario" : "Desactivar Formulario"}
            </button>
          </div>
          {isToggleBotton && (
            <div className="flex flex-col">
              <label className="mb-1 text-lg">Texto del Boton:</label>
              <input
                type="text"
                value={textBotton}
                className="py-2 px-1 bg-transparent"
                placeholder="Escriba un texto..."
                onChange={(e) => setTextBotton(e.target.value)}
              />
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-center">
        <button
          className="w-1/2 md:w-1/3 xl:w-1/4 bg-primary hover:bg-cyan-700 transition-all text-white py-2 rounded-md"
          type="submit"
        >
          Guardar
        </button>
      </div>
    </form>
  );
}

export default EditSections;
