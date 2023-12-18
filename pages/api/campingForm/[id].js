import { mongooseConnect } from "@/lib/mongoose";
import { CampingForm } from "@/model/CampingForm";

export default async function handler(req, res) {
  const { method } = req;
  mongooseConnect();

  if (method === "PUT") {
    try {
      const { _id } = req.query;

      if (!_id) {
        return res.status(400).json({
          error: "Se requiere el ID para actualizar el formulario de camping.",
        });
      }

      const existingForm = await CampingForm.findById(_id);

      if (!existingForm) {
        return res
          .status(404)
          .json({ error: "Formulario de camping no encontrado." });
      }

      const { editableFields } = req.body;
      console.log(req.body);

      editableFields.forEach((field) => {
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
