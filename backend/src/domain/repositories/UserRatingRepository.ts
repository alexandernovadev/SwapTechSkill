import { AppDataSource } from '../../infrastructure/persistence/typeormSource';
import { UserRating } from '../entity/UserRating';

export class UserRatingRepository {
  private userRatingRepository = AppDataSource.getRepository(UserRating);

  // Método para guardar un userRating (Crear o Actualizar)
  async save(userRating: UserRating): Promise<UserRating> {
    return await this.userRatingRepository.save(userRating);
  }

  // Método para obtener todos los userRatings
  async findAll(): Promise<UserRating[]> {
    return await this.userRatingRepository.find();
  }

  // Método para buscar un userRating por ID (Leer)
  async findById(id: number): Promise<UserRating | undefined> {
    return await this.userRatingRepository.findOne({ where: { id } });
  }

  // Método para actualizar un userRating
  async update(id: number, updatedUserRating: Partial<UserRating>): Promise<UserRating | undefined> {
    await this.userRatingRepository.update(id, updatedUserRating);
    return this.findById(id);
  }

  // Método para eliminar un userRating
  async delete(id: number): Promise<void> {
    await this.userRatingRepository.delete(id);
  }
}
