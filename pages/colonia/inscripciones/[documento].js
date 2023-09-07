import Layout from "@/components/Layout";
import { mongooseConnect } from "@/lib/mongoose";
import { CampingForm } from "@/model/CampingForm";
import { format } from "date-fns";

function InscriptionPage({ inscription }) {
  const fechaFormateada = format(
    new Date(inscription.fechaNacimiento),
    "dd/MM/yyyy"
  );

  return (
    <>
      <Layout>
        <div className="flex flex-col justify-center bg-white rounded-lg shadow-md my-5 p-4 listWidth m-auto">
          <h2 className="text-xl font-semibold mb-2">
            Detalles de la Inscripción
          </h2>
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
              <label className="text-gray-600 text-sm">
                Fecha de Nacimiento:
              </label>
              <p className="text-gray-800 font-medium">{fechaFormateada}</p>
            </div>
            <div className="flex flex-col">
              <label className="text-gray-600 text-sm">Documento:</label>
              <p className="text-gray-800 font-medium">
                {inscription.documento}
              </p>
            </div>
            <div className="flex flex-col">
              <label className="text-gray-600 text-sm">Teléfono:</label>
              <p className="text-gray-800 font-medium">
                {inscription.telefono}
              </p>
            </div>
            <div className="flex flex-col">
              <label className="text-gray-600 text-sm">Domicilio:</label>
              <p className="text-gray-800 font-medium">
                {inscription.domicilio}
              </p>
            </div>
            <div className="flex flex-col">
              <label className="text-gray-600 text-sm">Localidad:</label>
              <p className="text-gray-800 font-medium">
                {inscription.localidad}
              </p>
            </div>
            <div className="flex flex-col">
              <label className="text-gray-600 text-sm">
                Teléfono de Emergencia:
              </label>
              <p className="text-gray-800 font-medium">
                {inscription.telefonoEmergencia}
              </p>
            </div>
            <div className="flex flex-col">
              <label className="text-gray-600 text-sm">
                Celular para WhatsApp:
              </label>
              <p className="text-gray-800 font-medium">{inscription.celular}</p>
            </div>
          </div>
          <h4 className="mb-3 text-lg font-medium text-gray-600">
            Categoria de Inscripción
          </h4>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex flex-col">
              <p className="text-gray-800 font-semibold">
                {inscription.categoriaInscripcion.socio === "si"
                  ? "Socio"
                  : "No Socio"}
              </p>
            </div>
            <div className="flex flex-col">
              <p className="text-gray-800 font-semibold">
                {inscription.categoriaInscripcion.particular === "si"
                  ? "Particular"
                  : "No Particular"}
              </p>
            </div>
          </div>
          <div className="h-px bg-gray-400 mb-4"></div>
          <h4 className="mb-3 text-lg font-medium text-gray-600">
            Historia Cínica
          </h4>
          <h5 className="mb-2 text-md font-medium text-gray-500">Alergias:</h5>
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
            <div className="flex flex-col">
              <label className="text-gray-600 text-sm">Télefono:</label>
              <p className="text-gray-800 font-medium">
                {inscription.medicoCabecera.telefono}
              </p>
            </div>
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
            <div className="flex flex-col">
              <label className="text-gray-600 text-sm">Télefono:</label>
              <p className="text-gray-800 font-medium">
                {inscription.obraSocial.telefono}
              </p>
            </div>
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
                {inscription.vacunasCovid.recibioVacuna === "si" ? "Si" : "No"}
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
          <div className="grid grid-cols-3 gap-4 mb-4">
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
              <label className="text-gray-600 text-sm">Grupo Sanguíneo:</label>
              <p className="text-gray-800 font-medium">
                {inscription.grupoSanguineo}
              </p>
            </div>
          </div>
          <h5 className="mb-2 text-md font-medium text-gray-500">
            Certificados:
          </h5>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex flex-col">
                <label className="text-gray-600 text-sm mb-2">Certificado Médico:</label>
                <a href={inscription.certificadoMedico[0]} target="_blank" className="w-full border border-gray-500 text-center py-2 rounded text-gray-500 hover:shadow-lg hover:text-gray-900 transition-all font-medium">
                    Descargar PDF
                </a>
            </div>
            <div className="flex flex-col">
                <label className="text-gray-600 text-sm mb-2">Buco Dentál:</label>
                <a href={inscription.bucoDental[0]} target="_blank" className="w-full border border-gray-500 text-center py-2 rounded text-gray-500 hover:shadow-lg hover:text-gray-900 transition-all font-medium">
                    Descargar PDF
                </a>
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
