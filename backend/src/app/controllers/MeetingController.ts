import { Request, Response } from 'express';
import { MeetingRepository } from '../../domain/repositories/MeetingRepository';

const meetingRepository = new MeetingRepository();

export class MeetingController {
  // Crear una nueva reunión
  static async create(req: Request, res: Response) {
    const meetingData = req.body;

    try {
      const meeting = await meetingRepository.create(meetingData);
      return res.status(201).json(meeting);
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Error al crear la reunión', error });
    }
  }

  // Obtener todas las reuniones
  static async findAll(req: Request, res: Response) {
    try {
      const meetings = await meetingRepository.findAll();
      return res.status(200).json(meetings);
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Error al obtener las reuniones', error });
    }
  }

  // Obtener una reunión por ID
  static async findById(req: Request, res: Response) {
    const id = parseInt(req.params.id, 10);

    try {
      const meeting = await meetingRepository.findById(id);
      if (!meeting) {
        return res.status(404).json({ message: 'Reunión no encontrada' });
      }
      return res.status(200).json(meeting);
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Error al obtener la reunión', error });
    }
  }

  // Actualizar una reunión por ID
  static async update(req: Request, res: Response) {
    const id = parseInt(req.params.id, 10);
    const updatedData = req.body;

    try {
      const updatedMeeting = await meetingRepository.update(id, updatedData);
      if (!updatedMeeting) {
        return res.status(404).json({ message: 'Reunión no encontrada' });
      }
      return res.status(200).json(updatedMeeting);
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Error al actualizar la reunión', error });
    }
  }

  // Eliminar una reunión por ID
  static async delete(req: Request, res: Response) {
    const id = parseInt(req.params.id, 10);

    try {
      await meetingRepository.delete(id);
      return res.status(200).json({ message: 'Reunión eliminada con éxito' });
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Error al eliminar la reunión', error });
    }
  }

  // Buscar reuniones por userId (organizador)
  static async findByUserId(req: Request, res: Response) {
    const userId = parseInt(req.params.userId, 10);

    try {
      const meetings = await meetingRepository.findByUserId(userId);
      return res.status(200).json(meetings);
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Error al obtener las reuniones del usuario', error });
    }
  }

  // Buscar reuniones por chatId
  static async findByChatId(req: Request, res: Response) {
    const chatId = parseInt(req.params.chatId, 10);

    try {
      const meetings = await meetingRepository.findByChatId(chatId);
      return res.status(200).json(meetings);
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Error al obtener las reuniones del chat', error });
    }
  }
}
