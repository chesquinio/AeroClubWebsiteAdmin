import Layout from "@/components/Layout";
import { mongooseConnect } from "@/lib/mongoose";
import { CampingForm } from "@/model/CampingForm";

function HomePage({ inscriptions }) {
  const totalInscriptions = Object.keys(inscriptions).length;

  return (
    <Layout>
      <div className="flex flex-col justify-center items-center w-full">
        <h1 className="text-3xl text-white text-center my-5">
          Datos de Colonia
        </h1>
        <div className="bg-white w-full md:w-1/2 text-center rounded p-3">
          <h3 className="text-2xl">Total de Inscriptos</h3>
          <p className="text-3xl font-semibold">{totalInscriptions}</p>
        </div>
      </div>
    </Layout>
  );
}

export default HomePage;

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
