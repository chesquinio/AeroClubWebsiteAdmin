const { Schema, models, model } = require("mongoose");

const CampingFormSchema = new Schema(
  {
    nombre: String,
    apellido: String,
    documento: String,
    curso: String,
    hermanoDe: String,
    email: String,
    alergias: {
      medicamentos: {
        tieneAlergia: String,
        descripcion: String,
      },
      comidas: {
        tieneAlergia: String,
        descripcion: String,
      },
      picaduras: {
        tieneAlergia: String,
        descripcion: String,
      },
    },
    medicoCabecera: {
      nombre: String,
      telefono: String,
    },
    obraSocial: {
      nombre: String,
      telefono: String,
    },
    padecimientos: {
      epilepsia: String,
      diabetes: String,
      asma: String,
      afeccionesCardiacas: String,
    },
    vacunasCovid: {
      recibioVacuna: String,
      cualVacuna: String,
      cuantasDosis: String,
    },
    tomaMedicamentos: {
      tomaMedicamentos: String,
      descripcion: String,
    },
    sigueTratamiento: {
      sigueTratamiento: String,
      descripcion: String,
    },
    puedeComerDeTodo: {
      puedeComerDeTodo: String,
      descripcion: String,
    },
    seMantieneAFlote: String,
    sabeNadar: String,
    grupoSanguineo: String,
    datoRelevante: String,
    childrenAuth: [Boolean],
    pariente: String,
    parienteDocumento: String,
    parienteAuth: String,
    parienteAuthDocumento: String,
    edadChico: String,
    parentescoParienteAuth: String,
    celParienteAuth: String,
    datosVeridicos: Boolean,
    autorizacionImagen: Boolean,
    autorizacionRopa: Boolean,
  },
  {
    timestamps: true,
  }
);

export const CampingForm =
  models?.CampingForm || model("CampingForm", CampingFormSchema);
