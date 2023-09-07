import bcrypt from "bcryptjs";
import { mongooseConnect } from "@/lib/mongoose";
import { AdminUsers } from "@/model/AdminUsers";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;
    await mongooseConnect();

    const user = await AdminUsers.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Usuario no encontrado" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    const token = jwt.sign({ userId: user._id }, "tu_secreto_secreto", {
      expiresIn: "1d",
    });

    return res.status(200).json({ message: "Autenticación exitosa", token });
  } else {
    return res.status(405).json({ message: "Método no permitido" });
  }
}