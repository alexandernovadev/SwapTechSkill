import { Request, Response } from 'express';
import { MeetingRepository } from '../../domain/repositories/MeetingRepository';
import { transporter } from '../useCases/Mail';
import { DateTime } from 'luxon';
import { createEvent } from 'ics';

const meetingRepository = new MeetingRepository();

export class MeetingController {
  // Crear una nueva reunión
  static async create(req: Request, res: Response) {
    const meetingData = req.body;

    try {
      const meeting = await meetingRepository.create(meetingData);

      // Obtén la fecha de hoy y establece la hora del evento (10 PM a 11 PM)
      const now = DateTime.local();
      const start = now.set({ hour: 22, minute: 0 });
      const end = now.set({ hour: 23, minute: 0 });

      // Crear el evento ICS
      const event = {
        start: [start.year, start.month, start.day, start.hour, start.minute],
        end: [end.year, end.month, end.day, end.hour, end.minute],
        title: 'Reunión Programada',
        description: 'Este es un evento de prueba para la reunión',
        location: 'Online',
        status: 'CONFIRMED',
        organizer: { name: 'Organizador', email: 'titoantifa69@gmail.com' },
        attendees: [
          { name: 'Alex', email: 'alexsk88.dev@gmail.com', rsvp: true }
        ]
      };

      // @ts-ignore
      createEvent(event, (error, value) => {
        if (error) {
          return res.status(500).json({ message: 'Error al crear el evento de calendario', error });
        }

        // Configuración del correo con el archivo ICS adjunto
        let mailOptions = {
          from: 'titoantifa69@gmail.com', // Remitente
          to: 'alexsk88.dev@gmail.com', // Destinatario
          subject: 'Invitación de reunión', // Asunto del correo
          html: '<h1>Te invitamos a una reunión programada.</h1>',  // Contenido del correo
          icalEvent: {
            content: value,
            method: 'REQUEST'
          }
        };

        // Enviar el correo
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            return res
              .status(500)
              .json({ message: 'Error al enviar la invitación', error });
          }
          console.log('Correo enviado: ' + info.response);
        });

        return res.status(201).json(meeting);
      });
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
