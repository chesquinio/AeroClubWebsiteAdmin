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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
            {filteredInscriptions.map((inscription) => (
              <Link
                href={`/parque/colonia/${inscription.documento}`}
                key={inscription._id}
                className="bg-white p-4 shadow-md rounded-lg hover:shadow-lg hover:bg-gray-100 transition-all"
              >
                <p className="text-lg font-semibold">
                  {inscription.nombre} {inscription.apellido}
                </p>
                <p className="text-gray-600">
                  Documento: {inscription.documento}
                </p>
                <p className="text-gray-600">
                  Localidad: {inscription.localidad} | Domicilio:{" "}
                  {inscription.domicilio}
                </p>
                <p className="text-gray-600">Teléfono: {inscription.telefono}</p>
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