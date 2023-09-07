import Layout from "@/components/Layout";
import { mongooseConnect } from "@/lib/mongoose";
import { CampingForm } from "@/model/CampingForm";
import Link from "next/link";

function InscriptionsPage({ inscriptions }) {
const inscriptionArray = Object.values(inscriptions);

inscriptionArray.sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return dateB - dateA;
});

  return (
    <>
      <Layout>
        {inscriptionArray.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
            {inscriptionArray.map((inscription) => (
              <Link
                href={`/colonia/inscripciones/${inscription.documento}`}
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
                    <h3 className="font-medium text-lg">No hay inscripciones por el momento</h3>
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
