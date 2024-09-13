import { AppDataSource } from '../../infrastructure/persistence/typeormSource';
import { FriendRequest } from '../entity/FriendRequest';

export class FriendRequestRepository {
  private friendRequestRepository = AppDataSource.getRepository(FriendRequest);

  // Método para guardar un friendRequest (Crear o Actualizar)
  async save(friendRequest: FriendRequest): Promise<FriendRequest> {
    return await this.friendRequestRepository.save(friendRequest);
  }

  // Método para obtener todos los friendRequests
  async findAll(): Promise<FriendRequest[]> {
    return await this.friendRequestRepository.find();
  }

  // Método para buscar un friendRequest por ID (Leer)
  async findById(id: number): Promise<FriendRequest | undefined> {
    return await this.friendRequestRepository.findOne({ where: { id } });
  }

  // Método para actualizar un friendRequest
  async update(id: number, updatedFriendRequest: Partial<FriendRequest>): Promise<FriendRequest | undefined> {
    await this.friendRequestRepository.update(id, updatedFriendRequest);
    return this.findById(id);
  }

  // Método para eliminar un friendRequest
  async delete(id: number): Promise<void> {
    await this.friendRequestRepository.delete(id);
  }
}
