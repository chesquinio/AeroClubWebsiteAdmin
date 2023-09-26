import Layout from "@/components/Layout";
import { mongooseConnect } from "@/lib/mongoose";
import { CampingForm } from "@/model/CampingForm";
import Link from "next/link";
import { useState } from "react"; // Importa useState

function InscriptionsPage({ inscriptions }) {
  const [searchTerm, setSearchTerm] = useState(""); // Estado para el término de búsqueda

  const inscriptionArray = Object.values(inscriptions);

  inscriptionArray.sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return dateB - dateA;
  });

  // Filtra las inscripciones en función del término de búsqueda
  const filteredInscriptions = inscriptionArray.filter((inscription) => {
    const fullName = `${inscription.nombre} ${inscription.apellido}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase());
  });

  return (
    <>
      <Layout>
        <div className="w-full flex justify-center md:justify-end">
          <div className="flex flex-row items-center bg-white p-2 rounded h-10 w-full md:w-60 mt-5">
            <i class='bx bx-search-alt'></i>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 text-center sm:text-justify bg-white py-2 px-4 shadow-md rounded">
                <p className="font-medium">Nombre y Apellido</p>
                <p className="hidden xl:inline font-medium">Documento</p>
                <p className="hidden lg:inline font-medium">Dirección</p>
                <p className="hidden sm:inline font-medium">Email</p>
            </div>
            {filteredInscriptions.map((inscription) => (
              <Link
                href={`/parque/colonia/${inscription.documento}`}
                key={inscription._id}
                className="bg-white py-2 px-4 shadow-md rounded hover:shadow-lg hover:bg-gray-100 transition-all"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 text-justify">
                  <p className="text-md font-medium">
                    {inscription.nombre} {inscription.apellido}
                  </p>
                  <p className="hidden xl:inline text-gray-600">
                    {inscription.documento}
                  </p>
                  <p className="hidden lg:inline text-gray-600">
                    {inscription.localidad} | {" "}
                    {inscription.domicilio}
                  </p>
                  <p className="text-sm md:text-base text-gray-600 hidden sm:inline">{inscription.email}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-centerw-full mx-5 mt-5">
            <div className="bg-white py-2 px-4 rounded">
              <h3 className="font-normal text-lg">No se encuentran inscripciones</h3>
            </div>
          </div>
        )}
      </Layout>
    </>
  );
}

export default InscriptionsPage;

export async function getServerSideProps(context) {
  await mongooseConnect();

  const inscriptions = await CampingForm.find({});

  const serializedIns = {
    ...JSON.parse(JSON.stringify(inscriptions)),
  };
  return {
    props: {
      inscriptions: serializedIns,
    },
  };
}