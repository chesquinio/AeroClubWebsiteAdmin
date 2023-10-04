import { mongooseConnect } from "@/lib/mongoose";
import { CampingForm } from "@/model/CampingForm";

export default async function handler(req, res) {
  const { method } = req;
  mongooseConnect();

  if (method=== 'GET') {
    try {
      const inscriptions = await CampingForm.find({});
      res.status(200).json(inscriptions);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los formularios de camping' });
    }
  } else if (method === "DELETE") {
    const { _id } = req.query;
    if (!_id) {
      await CampingForm.deleteMany({})
    } else {
      await CampingForm.deleteOne({ _id });
    }
    res.json("ok");
  }
}
