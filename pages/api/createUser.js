import bcrypt from "bcryptjs";
import { ClubUsers } from "@/model/ClubUsers";
import { mongooseConnect } from "@/lib/mongoose";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { userName, documentNumber, password, userRole } = req.body;

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
        name: userName,
        nameId: documentNumber,
        password: hashedPassword,
        role: userRole,
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
  } else if (req.method === "DELETE") {
    const nameId = req.query.userId;

    try {
      await mongooseConnect();

      await ClubUsers.deleteOne({nameId})

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
