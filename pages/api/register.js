/*
import bcrypt from 'bcryptjs';
import { mongooseConnect } from '@/lib/mongoose';
import { AdminUsers } from '@/model/AdminUsers';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;
    await mongooseConnect();

    try {
      const existingUser = await AdminUsers.findOne({ email });

      if (existingUser) {
        return res.status(400).json({ message: 'El usuario ya existe.' });
      }

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const newUser = new AdminUsers({
        email,
        password: hashedPassword,
      });

      await newUser.save();

      return res.status(201).json({ message: 'Usuario registrado con éxito.' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error interno del servidor.' });
    }
  } else {
    return res.status(405).json({ message: 'Método no permitido.' });
  }
}
*/