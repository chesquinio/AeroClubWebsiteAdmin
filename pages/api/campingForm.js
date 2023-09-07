import { mongooseConnect } from '@/lib/mongoose';
import { CampingForm } from '@/model/CampingForm';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      await mongooseConnect();
      const inscriptions = await CampingForm.find({});

      res.status(200).json(inscriptions);
    } catch (error) {
      console.error('Error al obtener las inscripciones:', error);
      res.status(500).json({ message: 'Error en el servidor' });
    }
  } else {
    res.status(405).json({ message: 'Método no permitido' });
  }
}