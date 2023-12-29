const { Schema, models, model } = require("mongoose");

const PlaneReservationSchema = new Schema({
  name: { type: String, required: true },
  document: { type: Number, required: true },
  day: { type: String, required: true },
  time: { type: String, required: true },
});

export const PlaneReservation =
  models?.PlaneReservation || model("PlaneReservation", PlaneReservationSchema);
