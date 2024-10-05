import { Request, Response } from 'express';
import { RatingRepository } from '../../domain/repositories/RatingRepository';

const ratingRepository = new RatingRepository();

export class RatingController {
  // Crear un nuevo rating
  static async create(req: Request, res: Response) {
    const ratingData = req.body;
    const { idUser, idChat } = req.query;

    console.log(ratingData);
    
    try {
      const rating = await ratingRepository.save(ratingData);
      return res.status(201).json(rating);
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Error al crear la calificación', error });
    }
  }

  // Obtener todas las calificaciones
  static async findAll(req: Request, res: Response) {
    try {
      const ratings = await ratingRepository.findAll();
      return res.status(200).json(ratings);
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Error al obtener las calificaciones', error });
    }
  }

  // Obtener una calificación por ID
  static async findById(req: Request, res: Response) {
    const id = parseInt(req.params.id, 10);

    try {
      const rating = await ratingRepository.findById(id);
      if (!rating) {
        return res.status(404).json({ message: 'Calificación no encontrada' });
      }
      return res.status(200).json(rating);
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Error al obtener la calificación', error });
    }
  }

  // Actualizar una calificación por ID
  static async update(req: Request, res: Response) {
    const id = parseInt(req.params.id, 10);
    const updatedData = req.body;

    try {
      const updatedRating = await ratingRepository.update(id, updatedData);
      if (!updatedRating) {
        return res.status(404).json({ message: 'Calificación no encontrada' });
      }
      return res.status(200).json(updatedRating);
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Error al actualizar la calificación', error });
    }
  }

  // Eliminar una calificación por ID
  static async delete(req: Request, res: Response) {
    const id = parseInt(req.params.id, 10);

    try {
      await ratingRepository.delete(id);
      return res
        .status(200)
        .json({ message: 'Calificación eliminada con éxito' });
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Error al eliminar la calificación', error });
    }
  }

  // Buscar una calificación por chatParticipantId
  static async findByChatParticipantId(req: Request, res: Response) {
    const chatParticipantId = parseInt(req.params.chatParticipantId, 10);

    try {
      const rating =
        await ratingRepository.findByChatParticipantId(chatParticipantId);
      if (!rating) {
        return res
          .status(404)
          .json({
            message: 'Calificación no encontrada para el participante del chat',
          });
      }
      return res.status(200).json(rating);
    } catch (error) {
      return res
        .status(500)
        .json({
          message: 'Error al obtener la calificación del participante del chat',
          error,
        });
    }
  }
}
