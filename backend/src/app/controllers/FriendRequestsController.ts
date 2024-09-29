import { Request, Response } from 'express';
import { FriendRequestRepository } from '../../domain/repositories/FriendRequestRepository';
import { FriendRequest } from '../../domain/entity/FriendRequest';
import { io } from '../../main';

const friendRequestRepository = new FriendRequestRepository();

export class FriendRequestController {
  // Crear una nueva solicitud de amistad
  static async create(req: Request, res: Response): Promise<Response> {
    try {
      const friendRequest = await friendRequestRepository.save(
        req.body as FriendRequest,
      );

      const reciverIdRoom = String(friendRequest.receiver.id);
      console.log("las sala a enviar es ", reciverIdRoom);
      

      // Emitir evento de nueva solicitud de amistad al receptor
      io.to(reciverIdRoom).emit('newFriendRequest', {
        message: 'Tienes una nueva solicitud de amistad',
      });

      return res.status(201).json(friendRequest);
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Error creando la solicitud de amistad', error });
    }
  }

  // Obtener todas las solicitudes de amistad por receiverId con paginación
  static async getByReceiverId(req: Request, res: Response): Promise<Response> {
    try {
      const receiverId = parseInt(req.params.receiverId);
      const page = parseInt(req.query.page as string) || undefined;
      const perPage = parseInt(req.query.perPage as string) || undefined;

      if (isNaN(receiverId)) {
        return res.status(400).json({ message: 'Invalid receiverId' });
      }

      const { data, total } = await friendRequestRepository.findByReceiverId(
        receiverId,
        page,
        perPage,
      );

      return res.status(200).json({ data, total });
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Error retrieving friend requests', error });
    }
  }

  // Listar todas las solicitudes de amistad con paginación
  static async findAll(req: Request, res: Response): Promise<Response> {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const perPage = parseInt(req.query.perPage as string) || 5;
      const { data, total } = await friendRequestRepository.findAll(
        page,
        perPage,
      );
      return res.status(200).json({ data, total });
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Error obteniendo solicitudes de amistad', error });
    }
  }

  // Obtener una solicitud de amistad por ID
  static async findById(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id);
      const friendRequest = await friendRequestRepository.findById(id);
      if (!friendRequest) {
        return res
          .status(404)
          .json({ message: 'Solicitud de amistad no encontrada' });
      }
      return res.status(200).json(friendRequest);
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Error obteniendo la solicitud de amistad', error });
    }
  }

  // Actualizar una solicitud de amistad por ID
  static async update(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id);
      const updatedFriendRequest = await friendRequestRepository.update(
        id,
        req.body as Partial<FriendRequest>,
      );
      if (!updatedFriendRequest) {
        return res
          .status(404)
          .json({ message: 'Solicitud de amistad no encontrada' });
      }
      return res.status(200).json(updatedFriendRequest);
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Error actualizando la solicitud de amistad', error });
    }
  }

  // Eliminar una solicitud de amistad por ID
  static async delete(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id);
      await friendRequestRepository.delete(id);
      return res.status(204).send();
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Error eliminando la solicitud de amistad', error });
    }
  }

  // Listar todas las solicitudes de amistad sin paginación (opcional)
  static async findAllList(req: Request, res: Response): Promise<Response> {
    try {
      const { data } = await friendRequestRepository.findAll();
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({
        message: 'Error obteniendo la lista de solicitudes de amistad',
        error,
      });
    }
  }
}
