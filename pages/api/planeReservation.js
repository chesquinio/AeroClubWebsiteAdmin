import { mongooseConnect } from "@/lib/mongoose";
import { PlaneReservation } from "@/model/PlaneReservation";

export default async function hsndle(req, res) {
  if (req.method === "GET") {
    try {
      await mongooseConnect();

      const reservations = await PlaneReservation.find();
      return res.status(200).json({ reservations });
    } catch (error) {
      return res.status(500).json({ message: "Error al obtener las reservas" });
    }
  }
}
