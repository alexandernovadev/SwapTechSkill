import { AppDataSource } from '../../infrastructure/persistence/typeormSource';
import { SkillCategory } from '../entity/SkillCategories';

export class SkillCategoryRepository {
  private skillCategoryRepository = AppDataSource.getRepository(SkillCategory);

  // Crear una nueva categoría de habilidades
  async createCategory(
    categoryData: Partial<SkillCategory>,
  ): Promise<SkillCategory> {
    const category = this.skillCategoryRepository.create(categoryData);
    return await this.skillCategoryRepository.save(category);
  }

  // Leer todas las categorías de habilidades
  async findAllCategories(): Promise<SkillCategory[]> {
    return await this.skillCategoryRepository.find({ relations: ['skills'] });
  }

  // Leer una categoría de habilidades por ID
  async findCategoryById(id: number): Promise<SkillCategory | undefined> {
    return await this.skillCategoryRepository.findOne({
      where: { id }, // Se usa 'id' porque así se define en la entidad SkillCategory
      relations: ['skills'],
    });
  }

  // Actualizar una categoría de habilidades por ID
  async updateCategory(
    id: number,
    updatedCategoryData: Partial<SkillCategory>,
  ): Promise<SkillCategory | undefined> {
    await this.skillCategoryRepository.update(id, updatedCategoryData);
    return this.findCategoryById(id);
  }

  // Eliminar una categoría de habilidades por ID
  async deleteCategory(id: number): Promise<void> {
    await this.skillCategoryRepository.delete(id);
  }
}
