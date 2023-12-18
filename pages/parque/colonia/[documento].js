import Layout from "@/components/Layout";
import { mongooseConnect } from "@/lib/mongoose";
import { CampingForm } from "@/model/CampingForm";
import InscriptionSchema from "@/components/InscriptionSchema";

function InscriptionPage({ inscription, allInscriptions }) {
  return (
    <>
      <Layout>
        <InscriptionSchema
          inscription={inscription}
          allInscriptions={allInscriptions}
        />
      </Layout>
    </>
  );
}

export default InscriptionPage;

export async function getServerSideProps(context) {
  const documento = context.params.documento;
  await mongooseConnect();

  const inscription = await CampingForm.findOne({ documento });
  const allInscriptions = await CampingForm.find().sort({ createdAt: -1 });

  const serializedIns = {
    ...JSON.parse(JSON.stringify(inscription)),
  };

  const serializedAllIns = {
    ...JSON.parse(JSON.stringify(allInscriptions)),
  };

  return {
    props: {
      inscription: serializedIns,
      allInscriptions: serializedAllIns,
    },
  };
}
