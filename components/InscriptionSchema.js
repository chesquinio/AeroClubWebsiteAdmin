import React, { useState } from "react";
import Link from "next/link";
import NextBackSchema from "@/components/NextBackSchema";
import { useRouter } from "next/router";
import axios from "axios";

export default function InscriptionSchema({
  inscription,
  allInscriptions,
  edit,
}) {
  const [editableFields, setEditableFields] = useState({ ...inscription });
  const [message, setMessage] = useState(null);
  const router = useRouter();

  const handleFieldChange = (fieldName, value) => {
    setEditableFields((prevFields) => ({ ...prevFields, [fieldName]: value }));
  };

  const handleSaveChanges = async () => {
    try {
      const res = await axios.put(`/api/campingForm`, editableFields);
      if (res.status === 200) {
        setMessage("Cambios guardados correctamente");
        router.push("/parque/colonia");
      } else {
        setMessage("Error al guardar cambios");
      }
    } catch (error) {
      setMessage("Error al conectar con el servidor");
    }
  };

  return (
    <div className="listWidth m-auto">
      <div className="bg-transparent text-white mt-5 text-center py-2">
        <h2 className="font-normal text-4xl">
          {edit ? "Editar Inscripción" : "Detalles de la Incripción"}
        </h2>
      </div>
      <div className="flex justify-strat items-end">
        <Link
          href={"/parque/colonia"}
          className="absolute bg-white font-normal text-lg rounded-full py-2 px-3 hover:bg-gray-100 hover:shadow-md shadow-gray-700 transition-all"
        >
          <i className="bx bx-arrow-back"></i>
        </Link>
      </div>
      {allInscriptions && (
        <NextBackSchema
          inscription={inscription}
          allInscriptions={allInscriptions}
        />
      )}
      <div className="flex flex-col justify-center bg-white rounded shadow-sm mb-8 mt-2 p-4 shadow-gray-700">
        <h3 className="mb-3 text-lg font-medium text-gray-600">
          Datos Relevantes:
        </h3>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex flex-col">
            <label className="text-gray-600 text-sm">Nombre</label>
            {edit ? (
              <input
                type="text"
                value={editableFields.nombre}
                onChange={(e) => handleFieldChange("nombre", e.target.value)}
                className="text-gray-800 font-medium py-1 px-1 outline-none"
              />
            ) : (
              <p className="text-gray-800 font-medium">{inscription.nombre}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label className="text-gray-600 text-sm">Apellido:</label>
            {edit ? (
              <input
                type="text"
                value={editableFields.apellido}
                onChange={(e) => handleFieldChange("apellido", e.target.value)}
                className="text-gray-800 font-medium py-1 px-1 outline-none"
              />
            ) : (
              <p className="text-gray-800 font-medium">
                {inscription.apellido}
              </p>
            )}
          </div>
          <div className="flex flex-col">
            <label className="text-gray-600 text-sm">Edad:</label>
            {edit ? (
              <input
                type="text"
                value={editableFields.edadChico}
                onChange={(e) => handleFieldChange("edadChico", e.target.value)}
                className="text-gray-800 font-medium py-1 px-1 outline-none"
              />
            ) : (
              <p className="text-gray-800 font-medium">
                {inscription.edadChico}
              </p>
            )}
          </div>
          <div className="flex flex-col">
            <label className="text-gray-600 text-sm">Documento:</label>
            <p className="text-gray-800 font-medium py-1 px-1">
              {inscription.documento}
            </p>
          </div>
          <div className="flex flex-col">
            <label className="text-gray-600 text-sm">Curso:</label>
            {edit ? (
              <input
                type="text"
                value={editableFields.curso}
                onChange={(e) => handleFieldChange("curso", e.target.value)}
                className="text-gray-800 font-medium py-1 px-1 outline-none"
              />
            ) : (
              <p className="text-gray-800 font-medium">{inscription.curso}</p>
            )}
          </div>
          {inscription.hermanoDe && (
            <div className="flex flex-col">
              <label className="text-gray-600 text-sm">Hermano de:</label>
              {edit ? (
                <input
                  type="text"
                  value={editableFields.hermanoDe}
                  onChange={(e) =>
                    handleFieldChange("hermanoDe", e.target.value)
                  }
                  className="text-gray-800 font-medium py-1 px-1 outline-none"
                />
              ) : (
                <p className="text-gray-800 font-medium">
                  {inscription.hermanoDe}
                </p>
              )}
            </div>
          )}
          <div className="flex flex-col">
            <label className="text-gray-600 text-sm">
              Telefono del familiar:
            </label>
            {edit ? (
              <input
                type="text"
                value={editableFields.telefono}
                onChange={(e) => handleFieldChange("telefono", e.target.value)}
                className="text-gray-800 font-medium py-1 px-1 outline-none"
              />
            ) : (
              <p className="text-gray-800 font-medium">
                {inscription.telefono ? inscription.telefono : "- - -"}
              </p>
            )}
          </div>
          <div className="flex flex-col">
            <label className="text-gray-600 text-sm">Email del Padre:</label>
            {edit ? (
              <input
                type="text"
                value={editableFields.email}
                onChange={(e) => handleFieldChange("email", e.target.value)}
                className="text-gray-800 font-medium py-1 px-1 outline-none"
              />
            ) : (
              <p className="text-gray-800 font-medium">{inscription.email}</p>
            )}
          </div>
        </div>
        <div className="h-px bg-gray-400 mb-4"></div>
        <h3 className="mb-3 text-lg font-medium text-gray-600">
          Historia Cínica
        </h3>
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
              {inscription.alergias.comidas.tieneAlergia === "si" ? "Si" : "No"}
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
        <h5 className="mb-2 text-md font-medium text-gray-500">Obra Social:</h5>
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
            <label className="text-gray-600 text-sm">Toma Medicamentos:</label>
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
            <label className="text-gray-600 text-sm">Sigue Tratamiento:</label>
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
            <label className="text-gray-600 text-sm">Grupo Sanguíneo:</label>
            <p className="text-gray-800 font-medium">
              {inscription.grupoSanguineo}
            </p>
          </div>
          {inscription.datoRelevante && (
            <div className="flex flex-col">
              <label className="text-gray-600 text-sm">Dato Relevante:</label>
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
              {`Autorización de ${inscription.childrenAuth[0] ? "Retiro" : ""}${
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
            Certificados
          </h3>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex flex-col">
              <label className="text-gray-600 text-sm">
                Certificado Medico:
              </label>
              <a
                href={inscription.certifications[0]}
                target="_blanck"
                className="text-gray-800 font-medium hover:text-gray-500 transition-all"
              >
                {inscription.certifications[0]
                  ? "Descargar PDF"
                  : "No se encuentra el PDF"}
              </a>
            </div>
            <div className="flex flex-col">
              <label className="text-gray-600 text-sm">Buco Dental:</label>
              <a
                href={inscription.certifications[1]}
                target="_blanck"
                className="text-gray-800 font-medium hover:text-gray-500 transition-all"
              >
                {inscription.certifications[1]
                  ? "Descargar PDF"
                  : "No se encuentra el PDF"}
              </a>
            </div>
          </div>
        </div>
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
          {message && <p className="text-gray-500 texl-sm my-2">{message}</p>}
        </div>
        {edit && (
          <button
            onClick={handleSaveChanges}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-all"
          >
            Guardar Cambios
          </button>
        )}
      </div>
    </div>
  );
}
