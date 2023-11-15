import Layout from "@/components/Layout";
import Link from "next/link";
import Modal from "react-modal";
import { useState, useEffect } from "react";
import axios from "axios";

function InscriptionsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredInscriptions, setFilteredInscriptions] = useState([]);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [idFormToDelete, setIdFormToDelete] = useState(null);
  const [ropaFilter, setRopaFilter] = useState(null);
  const [imagenFilter, setImagenFilter] = useState(null);

  useEffect(() => {
    fetchForms();
  }, [searchTerm, ropaFilter, imagenFilter]);

  async function fetchForms() {
    try {
      const response = await axios.get("/api/campingForm");
      const inscriptionArray = Object.values(response.data);

      inscriptionArray.sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return dateB - dateA;
      });

      setFilteredInscriptions(
        inscriptionArray.filter((inscription) => {
          const fullName =
            `${inscription.nombre} ${inscription.apellido}`.toLowerCase();
          const hasRopaAuthorization =
            ropaFilter === null || inscription.autorizacionRopa === ropaFilter;
          const hasImagenAuthorization =
            imagenFilter === null ||
            inscription.autorizacionImagen === imagenFilter;
          return (
            fullName.includes(searchTerm.toLowerCase()) &&
            hasRopaAuthorization &&
            hasImagenAuthorization
          );
        })
      );
    } catch (error) {
      console.error("Error fetching forms:", error);
    }
  }

  function toggleRopaFilter() {
    setRopaFilter((prevFilter) => {
      if (prevFilter === null) {
        return true;
      } else if (prevFilter === true) {
        return false;
      } else {
        return null;
      }
    });
  }

  function toggleImagenFilter() {
    setImagenFilter((prevFilter) => {
      if (prevFilter === null) {
        return true;
      } else if (prevFilter === true) {
        return false;
      } else {
        return null;
      }
    });
  }

  function openDeleteModal(id) {
    if (id) {
      setIdFormToDelete(id);
    }
    setDeleteModalIsOpen(true);
  }

  async function confirmDelete() {
    if (idFormToDelete) {
      const id = idFormToDelete;
      await axios.delete("/api/campingForm?_id=" + id);
      setIdFormToDelete(null);
      setDeleteModalIsOpen(false);
      fetchForms();
    } else {
      await axios.delete("/api/campingForm");
      setDeleteModalIsOpen(false);
      fetchForms();
    }
  }

  function closeDeleteModal() {
    setIdFormToDelete(null);
    setDeleteModalIsOpen(false);
  }

  return (
    <>
      <Layout>
        <div className="w-full flex flex-col sm:flex-row justify-center md:justify-end sm:gap-5 text-sm md:text-base">
          <div
            className={`flex flex-row items-center p-2 rounded h-10 w-full md:w-60 mt-5 hover:text-gray-900 ${
              ropaFilter === true || ropaFilter === false
                ? "bg-gray-100 shadow-sm shadow-gray-600"
                : "bg-white text-gray-600"
            }`}
          >
            {ropaFilter !== null ? (
              ropaFilter === true ? (
                <i className="bx bx-up-arrow-alt"></i>
              ) : (
                <i className="bx bx-x"></i>
              )
            ) : (
              <i className="bx bx-down-arrow-alt"></i>
            )}
            <button
              onClick={toggleRopaFilter}
              className="p-2 w-full"
              type="button"
            >
              Aut. Cambio de Ropa
            </button>
          </div>
          <div
            className={`flex flex-row items-center p-2 rounded h-10 w-full md:w-60 mt-5 hover:text-gray-900 ${
              imagenFilter === true || imagenFilter === false
                ? "bg-gray-100 shadow-sm shadow-gray-600"
                : "bg-white text-gray-600"
            }`}
          >
            {imagenFilter !== null ? (
              imagenFilter === true ? (
                <i className="bx bx-up-arrow-alt"></i>
              ) : (
                <i className="bx bx-x"></i>
              )
            ) : (
              <i className="bx bx-down-arrow-alt"></i>
            )}
            <button
              onClick={toggleImagenFilter}
              className="p-2 w-full"
              type="button"
            >
              Aut. de Imagen
            </button>
          </div>
          <div className="flex flex-row items-center bg-white p-2 rounded h-10 w-full md:w-60 mt-5">
            <i className="bx bx-search-alt"></i>
            <input
              type="text"
              placeholder="Buscar por nombre..."
              className="w-full p-2 mb-4 outline-none bg-transparent mt-4"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        {filteredInscriptions.length > 0 ? (
          <div className="grid grid-cols-1 gap-2 mt-5">
            {imagenFilter !== null && ropaFilter !== null ? (
              <div className="bg-white py-2 rounded mb-5">
                <h2 className="text-center text-gray-600 text-xl font-medium">
                  Colonos {imagenFilter === true ? "CON" : "SIN"} Autorización
                  de Imagen y {ropaFilter === true ? "CON" : "SIN"} Autorización
                  de Ropa
                </h2>
              </div>
            ) : (
              <>
                {imagenFilter !== null && (
                  <div className="bg-white py-2 rounded mb-5">
                    <h2 className="text-center text-gray-600 text-xl font-medium">
                      Colonos {imagenFilter === true ? "CON" : "SIN"}{" "}
                      Autorización de Imagen
                    </h2>
                  </div>
                )}
                {ropaFilter !== null && (
                  <div className="bg-white py-2 rounded mb-5">
                    <h2 className="text-center text-gray-600 text-xl font-medium">
                      Colonos {ropaFilter === true ? "CON" : "SIN"} Autorización
                      de Ropa
                    </h2>
                  </div>
                )}
              </>
            )}
            <div className="flex flex-row">
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-center bg-white py-2 px-4 shadow-md rounded">
                <p className="font-medium">Nombre / Apellido</p>
                <p className="hidden xl:inline font-medium">Documento</p>
                <p className="hidden lg:inline font-medium">Edad</p>
                <p className="hidden sm:inline font-medium">Email</p>
              </div>
              <button
                onClick={() => openDeleteModal()}
                className="w-10 ml-4 bg-white text-xl text-black rounded hover:shadow-md hover:shadow-gray-700 hover:bg-gray-100 hover:text-red-500 transition-all duration-500"
              >
                <i className="bx bxs-trash"></i>
              </button>
            </div>
            {filteredInscriptions.map((inscription) => (
              <div key={inscription.documento} className="flex flex-row">
                <Link
                  href={`/parque/colonia/${inscription.documento}`}
                  key={inscription._id}
                  className="flex-1 bg-white py-2 px-4 shadow-sm shadow-gray-700 rounded hover:shadow-md hover:shadow-gray-700 hover:bg-gray-100 transition-all"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 text-justify">
                    <p className="text-md font-medium">
                      {inscription.nombre} {inscription.apellido}
                    </p>
                    <p className="hidden xl:inline text-gray-600">
                      {inscription.documento}
                    </p>
                    <p className="hidden lg:inline text-gray-600">
                      {inscription.edadChico}
                    </p>
                    <p className="text-sm md:text-base text-gray-600 hidden sm:inline">
                      {inscription.email}
                    </p>
                  </div>
                </Link>
                <button
                  onClick={() => openDeleteModal(inscription._id)}
                  className="w-10 ml-4 text-xl bg-transparent text-white rounded hover:text-red-500 transition-all duration-500"
                >
                  <i className="bx bxs-trash"></i>
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-centerw-full mx-5 mt-5">
            <div className="py-2 px-4 rounded">
              <h3 className="font-normal text-3xl text-center text-white">
                No se encuentran inscripciones
              </h3>
              <div className="flex justify-center">
                <Link
                  href={"/parque"}
                  className="text-xl bg-white rounded py-2 text-gray-500 w-40 text-center hover:text-black hover:bg-gray-100 transition-all mt-4 duration-500"
                >
                  Volver
                </Link>
              </div>
            </div>
          </div>
        )}

        <Modal
          isOpen={deleteModalIsOpen}
          onRequestClose={closeDeleteModal}
          contentLabel="Confirm Delete Modal"
          className="Modal rounded-lg p-6 bg-white w-96 mx-auto"
          overlayClassName="Overlay fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-75"
        >
          <h2 className="text-xl font-semibold text-center mb-4">
            {idFormToDelete
              ? "¿Estás seguro de que deseas eliminar esta inscripción?"
              : "¿QUIERES ELIMINAR TODAS LAS INSCRIPCIONES?"}
          </h2>
          <div className="flex justify-center">
            <button
              onClick={closeDeleteModal}
              className="bg-gray-300 text-gray-800 px-3 py-2 rounded mx-2"
            >
              Cancelar
            </button>
            <button
              onClick={confirmDelete}
              className="bg-red-500 text-white px-3 py-2 rounded mx-2"
            >
              Eliminar
            </button>
          </div>
        </Modal>
      </Layout>
    </>
  );
}

export default InscriptionsPage;
