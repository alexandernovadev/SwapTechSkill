import { AppDataSource } from '../../infrastructure/persistence/typeormSource';
import { Language } from '../entity/Language';

export class LanguageRepository {
  private languageRepository = AppDataSource.getRepository(Language);

  // Método para guardar un language (Crear o Actualizar)
  async save(language: Language): Promise<Language> {
    return await this.languageRepository.save(language);
  }

  // Método para obtener todos los languages
  async findAll(): Promise<Language[]> {
    return await this.languageRepository.find();
  }

  // En LanguageRepository
  async findByName(name: string): Promise<Language | undefined> {
    return await this.languageRepository.findOne({
      where: { languageName: name },
    });
  }

  // Método para buscar un language por ID (Leer)
  async findById(id: number): Promise<Language | undefined> {
    return await this.languageRepository.findOne({ where: { id } });
  }

  // Método para actualizar un language
  async update(
    id: number,
    updatedLanguage: Partial<Language>,
  ): Promise<Language | undefined> {
    await this.languageRepository.update(id, updatedLanguage);
    return this.findById(id);
  }

  // Método para eliminar un language
  async delete(id: number): Promise<void> {
    await this.languageRepository.delete(id);
  }
}
