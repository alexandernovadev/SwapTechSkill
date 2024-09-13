import { Request, Response } from 'express';
import { UserRepository } from '../../domain/repositories/UserRepository';

const userRepository = new UserRepository();

export class UserController {
  // Método para crear un usuario
  static async create(req: Request, res: Response): Promise<Response> {
    try {
      const newUser = await userRepository.save(req.body);
      return res.status(201).json({ message: 'User created', user: newUser });
    } catch (error) {
      return res.status(500).json({ message: 'Error creating user', error });
    }
  }

  // Método para actualizar un usuario
  static async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    try {
      const updatedUser = await userRepository.update(Number(id), req.body);
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      return res
        .status(200)
        .json({ message: 'User updated', user: updatedUser });
    } catch (error) {
      return res.status(500).json({ message: 'Error updating user', error });
    }
  }

  // Método para eliminar un usuario
  static async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    try {
      await userRepository.delete(Number(id));
      return res.status(200).json({ message: 'User deleted' });
    } catch (error) {
      return res.status(500).json({ message: 'Error deleting user', error });
    }
  }

  // Método para buscar un usuario por ID
  static async getById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    try {
      const user = await userRepository.findByIdAllData(Number(id));
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      return res.status(200).json(user);
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Error fetching user by ID', error });
    }
  }

  // Método para búsqueda avanzada
  static async searchAdvanced(req: Request, res: Response): Promise<Response> {
    const { userName, roleName, skillName, languageName } = req.query;

    try {
      const users = await userRepository.searchAdvanced({
        userName: userName as string,
        roleName: roleName as string,
        skillName: skillName as string,
        languageName: languageName as string,
      });

      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ message: 'Error searching users', error });
    }
  }

  // Método para buscar usuarios por una palabra clave en todos los datos
  static async searchByJustWordAllData(
    req: Request,
    res: Response,
  ): Promise<Response> {
    const { keyword } = req.query as { keyword: string };

    if (!keyword) {
      return res
        .status(400)
        .json({ message: 'Se necesita una palabra clave para la búsqueda' });
    }

    try {
      const users = await userRepository.searchByJustWordAllData(keyword);
      return res.status(200).json(users);
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Error al buscar usuarios', error });
    }
  }
}
