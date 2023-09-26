const { Schema, models, model } = require("mongoose")

const CampingFormSchema = new Schema({
  nombre: String,
  apellido: String,
  documento: String,
  fechaNacimiento: Date,
  domicilio: String,
  localidad: String,
  telefono: String,
  telefonoEmergencia: String,
  celular: String,
  email: String,
  categoriaInscripcion: {
    socio: String,
    particular: String,
  },
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
  certificadoMedico: [{type: String}],
  bucoDental: [{type: String}],
  datosVeridicos: Boolean,
  autorizacionDatos: Boolean,
}, {
  timestamps: true,
});

export const CampingForm = models?.CampingForm || model('CampingForm', CampingFormSchema);