import bcrypt from "bcryptjs";
import { ClubUsers } from "@/model/ClubUsers";
import { mongooseConnect } from "@/lib/mongoose";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      await mongooseConnect();

      const users = await ClubUsers.find();

      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ message: "Error al obtener los usuarios." });
    }
  } else if (req.method === "POST") {
    const { name, age, documentNumber, email, password, role, validated } =
      req.body;

    try {
      await mongooseConnect();

      const existingUser = await ClubUsers.findOne({ documentNumber });
      if (existingUser) {
        return res
          .status(400)
          .json({ message: "El número de documento ya está registrado." });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new ClubUsers({
        name,
        age,
        document: documentNumber,
        email,
        password: hashedPassword,
        role,
        validated,
      });
      await newUser.save();

      return res
        .status(201)
        .json({ message: "Usuario registrado exitosamente." });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error al registrar el usuario." });
    }
  } else if (req.method === "PUT") {
    const { id } = req.query;
    const { validated } = req.body;

    try {
      await mongooseConnect();

      const updatedUser = await ClubUsers.findByIdAndUpdate(
        id,
        { validated },
        { new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ message: "Usuario no encontrado." });
      }

      return res.status(200).json(updatedUser);
    } catch (error) {
      return res.status(500).json({ message: "Error al actualizar el usuario." });
    }
  } else if (req.method === "DELETE") {
    const documentNumber = req.query.userId;

    try {
      await mongooseConnect();

      await ClubUsers.deleteOne({ documentNumber });

      return res
        .status(200)
        .json({ message: "Usuario eliminado exitosamente." });
    } catch (error) {
      return res.status(500).json({ message: "Error al eliminar el usuario." });
    }
  } else {
    return res.status(405).json({ message: "Método no permitido." });
  }
}
