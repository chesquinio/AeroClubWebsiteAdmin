import InscriptionSchema from "@/components/InscriptionSchema";
import Layout from "@/components/Layout";
import { mongooseConnect } from "@/lib/mongoose";
import { CampingForm } from "@/model/CampingForm";
import React from "react";

export default function EditInscriptionPage({ inscription }) {
  return (
    <>
      <Layout>
        <InscriptionSchema inscription={inscription} edit={true} />
      </Layout>
    </>
  );
}

export async function getServerSideProps(context) {
  const documento = context.params.id;
  await mongooseConnect();

  const inscription = await CampingForm.findOne({ documento });

  const serializedIns = {
    ...JSON.parse(JSON.stringify(inscription)),
  };

  return {
    props: {
      inscription: serializedIns,
    },
  };
}
