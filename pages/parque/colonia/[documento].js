import Layout from "@/components/Layout";
import { mongooseConnect } from "@/lib/mongoose";
import { CampingForm } from "@/model/CampingForm";
import Link from "next/link";

function InscriptionPage({ inscription }) {
  return (
    <>
      <Layout>
        <div className="listWidth m-auto">
          <div className="bg-transparent text-white mt-5 text-center py-2">
            <h2 className="font-normal text-4xl">Detalles de la Incripción</h2>
          </div>
          <div className="flex justify-strat items-end">
            <Link
              href={"/parque/colonia"}
              className="bg-white font-normal text-lg rounded-full py-2 px-3 mb-4 ml-2 hover:bg-gray-100 hover:shadow-md shadow-gray-700 transition-all"
            >
              <i class="bx bx-arrow-back"></i>
            </Link>
          </div>
          <div className="flex flex-col justify-center bg-white rounded-lg shadow-lg mb-8 p-4 shadow-gray-700">
            <h3 className="mb-3 text-lg font-medium text-gray-600">
              Datos Relevantes:
            </h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex flex-col">
                <label className="text-gray-600 text-sm">
                  Nombre y Apellido:
                </label>
                <p className="text-gray-800 font-medium">
                  {inscription.nombre} {inscription.apellido}
                </p>
              </div>
              <div className="flex flex-col">
                <label className="text-gray-600 text-sm">Edad:</label>
                <p className="text-gray-800 font-medium">
                  {inscription.edadChico}
                </p>
              </div>
              <div className="flex flex-col">
                <label className="text-gray-600 text-sm">Documento:</label>
                <p className="text-gray-800 font-medium">
                  {inscription.documento}
                </p>
              </div>
              <div className="flex flex-col">
                <label className="text-gray-600 text-sm">Curso:</label>
                <p className="text-gray-800 font-medium">{inscription.curso}</p>
              </div>
              {inscription.hermanoDe && (
                <div className="flex flex-col">
                  <label className="text-gray-600 text-sm">Hermano de:</label>
                  <p className="text-gray-800 font-medium">
                    {inscription.hermanoDe}
                  </p>
                </div>
              )}
              <div className="flex flex-col">
                <label className="text-gray-600 text-sm">
                  Email del Padre:
                </label>
                <p className="text-gray-800 font-medium">{inscription.email}</p>
              </div>
            </div>
            <div className="h-px bg-gray-400 mb-4"></div>
            <h3 className="mb-3 text-lg font-medium text-gray-600">
              Historia Cínica
            </h3>
            <h5 className="mb-2 text-md font-medium text-gray-500">
              Alergias:
            </h5>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="flex flex-col">
                <label className="text-gray-600 text-sm">Medicamentos:</label>
                <p className="text-gray-800 font-medium">
                  {inscription.alergias.medicamentos.tieneAlergia === "si"
                    ? "Si"
                    : "No"}
                </p>
                {inscription.alergias.medicamentos.tieneAlergia === "si" && (
                  <p className="text-gray-800 font-medium">
                    {inscription.alergias.medicamentos.descripcion}
                  </p>
                )}
              </div>
              <div className="flex flex-col">
                <label className="text-gray-600 text-sm">Comidas:</label>
                <p className="text-gray-800 font-medium">
                  {inscription.alergias.comidas.tieneAlergia === "si"
                    ? "Si"
                    : "No"}
                </p>
                {inscription.alergias.comidas.tieneAlergia === "si" && (
                  <p className="text-gray-800 font-medium">
                    {inscription.alergias.comidas.descripcion}
                  </p>
                )}
              </div>
              <div className="flex flex-col">
                <label className="text-gray-600 text-sm">Picaduras:</label>
                <p className="text-gray-800 font-medium">
                  {inscription.alergias.picaduras.tieneAlergia === "si"
                    ? "Si"
                    : "No"}
                </p>
                {inscription.alergias.picaduras.tieneAlergia === "si" && (
                  <p className="text-gray-800 font-medium">
                    {inscription.alergias.picaduras.descripcion}
                  </p>
                )}
              </div>
            </div>
            <h5 className="mb-2 text-md font-medium text-gray-500">
              Médico de Cabecera:
            </h5>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex flex-col">
                <label className="text-gray-600 text-sm">Nombre:</label>
                <p className="text-gray-800 font-medium">
                  {inscription.medicoCabecera.nombre}
                </p>
              </div>
              {inscription.medicoCabecera.telefono && (
                <div className="flex flex-col">
                  <label className="text-gray-600 text-sm">Télefono:</label>
                  <p className="text-gray-800 font-medium">
                    {inscription.medicoCabecera.telefono}
                  </p>
                </div>
              )}
            </div>
            <h5 className="mb-2 text-md font-medium text-gray-500">
              Obra Social:
            </h5>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex flex-col">
                <label className="text-gray-600 text-sm">Nombre:</label>
                <p className="text-gray-800 font-medium">
                  {inscription.obraSocial.nombre}
                </p>
              </div>
              {inscription.obraSocial.telefono && (
                <div className="flex flex-col">
                  <label className="text-gray-600 text-sm">Télefono:</label>
                  <p className="text-gray-800 font-medium">
                    {inscription.obraSocial.telefono}
                  </p>
                </div>
              )}
            </div>
            <h5 className="mb-2 text-md font-medium text-gray-500">
              Padecimientos:
            </h5>
            <div className="grid grid-cols-4 gap-4 mb-4">
              <div className="flex flex-col">
                <label className="text-gray-600 text-sm">Epilepsia:</label>
                <p className="text-gray-800 font-medium">
                  {inscription.padecimientos.epilepsia === "si" ? "Si" : "No"}
                </p>
              </div>
              <div className="flex flex-col">
                <label className="text-gray-600 text-sm">Diabetes:</label>
                <p className="text-gray-800 font-medium">
                  {inscription.padecimientos.diabetes === "si" ? "Si" : "No"}
                </p>
              </div>
              <div className="flex flex-col">
                <label className="text-gray-600 text-sm">Asma:</label>
                <p className="text-gray-800 font-medium">
                  {inscription.padecimientos.asma === "si" ? "Si" : "No"}
                </p>
              </div>
              <div className="flex flex-col">
                <label className="text-gray-600 text-sm">
                  Afecciones Cardiacas:
                </label>
                <p className="text-gray-800 font-medium">
                  {inscription.padecimientos.afeccionesCardiacas === "si"
                    ? "Si"
                    : "No"}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div className="flex flex-col">
                <label className="text-gray-600 text-sm">
                  Esta Vacunado (Covid-19):
                </label>
                <p className="text-gray-800 font-medium">
                  {inscription.vacunasCovid.recibioVacuna === "si"
                    ? "Si"
                    : "No"}
                </p>
                {inscription.vacunasCovid.recibioVacuna === "si" && (
                  <p className="text-gray-800 font-medium">
                    {inscription.vacunasCovid.cualVacuna} |{" "}
                    {inscription.vacunasCovid.cuantasDosis} dosis
                  </p>
                )}
              </div>
              <div className="flex flex-col">
                <label className="text-gray-600 text-sm">
                  Toma Medicamentos:
                </label>
                <p className="text-gray-800 font-medium">
                  {inscription.tomaMedicamentos.tomaMedicamentos === "si"
                    ? "Si"
                    : "No"}
                </p>
                {inscription.tomaMedicamentos.tomaMedicamentos === "si" && (
                  <p className="text-gray-800 font-medium">
                    {inscription.tomaMedicamentos.descripcion}
                  </p>
                )}
              </div>
              <div className="flex flex-col">
                <label className="text-gray-600 text-sm">
                  Sigue Tratamiento:
                </label>
                <p className="text-gray-800 font-medium">
                  {inscription.sigueTratamiento.sigueTratamiento === "si"
                    ? "Si"
                    : "No"}
                </p>
                {inscription.sigueTratamiento.sigueTratamiento === "si" && (
                  <p className="text-gray-800 font-medium">
                    {inscription.sigueTratamiento.descripcion}
                  </p>
                )}
              </div>
              <div className="flex flex-col">
                <label className="text-gray-600 text-sm">
                  Puede Comer de Todo:
                </label>
                <p className="text-gray-800 font-medium">
                  {inscription.puedeComerDeTodo.puedeComerDeTodo === "si"
                    ? "Si"
                    : "No"}
                </p>
                {inscription.puedeComerDeTodo.puedeComerDeTodo === "no" && (
                  <p className="text-gray-800 font-medium">
                    {inscription.puedeComerDeTodo.descripcion}
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4 mb-4">
              <div className="flex flex-col">
                <label className="text-gray-600 text-sm">
                  Se Mantiene a Flote:
                </label>
                <p className="text-gray-800 font-medium">
                  {inscription.seMantieneAFlote === "si" ? "Si" : "No"}
                </p>
              </div>
              <div className="flex flex-col">
                <label className="text-gray-600 text-sm">Sabe Nadar:</label>
                <p className="text-gray-800 font-medium">
                  {inscription.sabeNadar === "si" ? "Si" : "No"}
                </p>
              </div>
              <div className="flex flex-col">
                <label className="text-gray-600 text-sm">
                  Grupo Sanguíneo:
                </label>
                <p className="text-gray-800 font-medium">
                  {inscription.grupoSanguineo}
                </p>
              </div>
              {inscription.datoRelevante && (
                <div className="flex flex-col">
                  <label className="text-gray-600 text-sm">
                    Dato Relevante:
                  </label>
                  <p className="text-gray-800 font-medium">
                    {inscription.datoRelevante}
                  </p>
                </div>
              )}
            </div>
            {inscription.childrenAuth && (
              <>
                <div className="h-px bg-gray-400 mb-4"></div>
                <h3 className="mb-3 text-lg font-medium text-gray-600">
                  {`Autorización de ${
                    inscription.childrenAuth[0] ? "Retiro" : ""
                  }${
                    inscription.childrenAuth[0] && inscription.childrenAuth[1]
                      ? " y "
                      : ""
                  }${inscription.childrenAuth[1] ? "Salida" : ""}`}
                </h3>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="flex flex-col">
                    <label className="text-gray-600 text-sm">
                      Madre, Padre o Tutor Responsable:
                    </label>
                    <p className="text-gray-800 font-medium">
                      {inscription.pariente} | D.N.I:{" "}
                      {inscription.parienteDocumento}
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <label className="text-gray-600 text-sm">
                      Pariente Autorizado:
                    </label>
                    <p className="text-gray-800 font-medium">
                      {inscription.parienteAuth} | D.N.I:{" "}
                      {inscription.parienteAuthDocumento}
                    </p>
                  </div>
                  {inscription.parentescoParienteAuth && (
                    <div className="flex flex-col">
                      <label className="text-gray-600 text-sm">
                        Parentesco del Pariente:
                      </label>
                      <p className="text-gray-800 font-medium">
                        {inscription.parentescoParienteAuth} | Celular:{" "}
                        {inscription.celParienteAuth}
                      </p>
                    </div>
                  )}
                </div>
              </>
            )}
            <div className="h-px bg-gray-400 mb-4"></div>
            <div>
              <h3 className="mb-3 text-lg font-medium text-gray-600">
                Autorizaciones Adicionales
              </h3>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex flex-col">
                  <label className="text-gray-600 text-sm">
                    Autorización de Derechos de Imagen:
                  </label>
                  <p className="text-gray-800 font-medium">
                    {inscription.autorizacionImagen ? "Aceptada" : "Rechazada"}
                  </p>
                </div>
                <div className="flex flex-col">
                  <label className="text-gray-600 text-sm">
                    Autorización de Cámbio de Ropa:
                  </label>
                  <p className="text-gray-800 font-medium">
                    {inscription.autorizacionRopa ? "Aceptada" : "Rechazada"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default InscriptionPage;

export async function getServerSideProps(context) {
  const documento = context.params.documento;
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
