import { AppDataSource } from '../../infrastructure/persistence/typeormSource';
import { UserLanguage } from '../entity/UserLanguage';

export class UserLanguageRepository {
  private userLanguageRepository = AppDataSource.getRepository(UserLanguage);

  // Método para guardar un userLanguage (Crear o Actualizar)
  async save(userLanguage: UserLanguage): Promise<UserLanguage> {
    return await this.userLanguageRepository.save(userLanguage);
  }

  // Método para obtener todos los userLanguages
  async findAll(): Promise<UserLanguage[]> {
    return await this.userLanguageRepository.find();
  }

  // Método para buscar un userLanguage por ID (Leer)
  async findById(id: number): Promise<UserLanguage | undefined> {
    return await this.userLanguageRepository.findOne({ where: { id } });
  }

  // Método para actualizar un userLanguage
  async update(id: number, updatedUserLanguage: Partial<UserLanguage>): Promise<UserLanguage | undefined> {
    await this.userLanguageRepository.update(id, updatedUserLanguage);
    return this.findById(id);
  }

  // Método para eliminar un userLanguage
  async delete(id: number): Promise<void> {
    await this.userLanguageRepository.delete(id);
  }
}
