const { Schema, models, model } = require("mongoose");

const TennisReservationSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "ClubUsers", required: true },
  court: { type: Number, required: true },
  reservationDate: { type: String, required: true },
  reservationTime: { type: String, required: true },
});

export const TennisReservation =
  models?.TennisReservation ||
  model("TennisReservation", TennisReservationSchema);
