import { AppDataSource } from '../../infrastructure/persistence/typeormSource';
import { FriendRequest } from '../entity/FriendRequest';

export class FriendRequestRepository {
  private friendRequestRepository = AppDataSource.getRepository(FriendRequest);

  // Método para guardar un friendRequest (Crear o Actualizar)
  async save(friendRequest: FriendRequest): Promise<FriendRequest> {
    return await this.friendRequestRepository.save(friendRequest);
  }

  // Método para obtener todas las solicitudes de amistad con paginación
  async findAll(
    page?: number,
    perPage?: number,
  ): Promise<{ data: FriendRequest[]; total: number }> {
    const take = perPage || 0; // Si no se especifica perPage, se obtendrán todos
    const skip = page ? (page - 1) * take : 0; // Si no se especifica página, no se salta ningún registro

    const [friendRequests, total] =
      await this.friendRequestRepository.findAndCount({
        skip: page ? skip : undefined, // Solo se hace skip si se especifica page
        take: page ? take : undefined, // Solo se limita el número de resultados si se especifica perPage
        order: {
          id: 'ASC', // Ordenar por ID ascendente
        },
      });

    return { data: friendRequests, total };
  }

  // Método para buscar un friendRequest por ID (Leer)
  async findById(id: number): Promise<FriendRequest | undefined> {
    return await this.friendRequestRepository.findOne({ where: { id } });
  }

  // Método para actualizar un friendRequest
  async update(
    id: number,
    updatedFriendRequest: Partial<FriendRequest>,
  ): Promise<FriendRequest | undefined> {
    await this.friendRequestRepository.update(id, updatedFriendRequest);
    return this.findById(id);
  }

  // Método para eliminar un friendRequest
  async delete(id: number): Promise<void> {
    await this.friendRequestRepository.delete(id);
  }
}
