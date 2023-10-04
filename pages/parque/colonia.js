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

  useEffect(() => {
    fetchForms();
  }, [fetchForms]);

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
          return fullName.includes(searchTerm.toLowerCase());
        })
      );
    } catch (error) {
      console.error("Error fetching forms:", error);
    }
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
        <div className="w-full flex justify-center md:justify-end">
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
            <div className="flex flex-row">
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-center bg-white py-2 px-4 shadow-md rounded">
                <p className="font-medium">Nombre / Apellido</p>
                <p className="hidden xl:inline font-medium">Documento</p>
                <p className="hidden lg:inline font-medium">Dirección</p>
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
                      {inscription.localidad} | {inscription.domicilio}
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
