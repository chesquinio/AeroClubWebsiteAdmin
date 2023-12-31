import { mongooseConnect } from "@/lib/mongoose";
import { CampingForm } from "@/model/CampingForm";

export default async function handler(req, res) {
  const { method } = req;
  mongooseConnect();

  if (method === "GET") {
    try {
      const inscriptions = await CampingForm.find({});
      res.status(200).json(inscriptions);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error al obtener los formularios de camping" });
    }
  } else if (method === "DELETE") {
    const { _id } = req.query;
    if (!_id) {
      await CampingForm.deleteMany({});
    } else {
      await CampingForm.deleteOne({ _id });
    }
    res.json("ok");
  } else if (method === "PUT") {
    try {
      const editableFields = req.body;

      const existingForm = await CampingForm.findById(editableFields._id);

      if (!existingForm) {
        return res
          .status(404)
          .json({ error: "Formulario de camping no encontrado." });
      }

      Object.keys(editableFields).forEach((field) => {
        if (
          editableFields[field] !== undefined &&
          editableFields[field] !== existingForm[field]
        ) {
          existingForm[field] = editableFields[field];
        }
      });

      await existingForm.save();

      return res
        .status(200)
        .json({ message: "Formulario de camping actualizado correctamente." });
    } catch (error) {
      console.error("Error al actualizar el formulario de camping:", error);
      return res
        .status(500)
        .json({ error: "Error al actualizar el formulario de camping." });
    }
  }
}
