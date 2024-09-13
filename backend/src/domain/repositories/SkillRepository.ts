import { AppDataSource } from '../../infrastructure/persistence/typeormSource';
import { Skill } from '../entity/Skill';

export class SkillRepository {
  private skillRepository = AppDataSource.getRepository(Skill);

  // Método para guardar un skill (Crear o Actualizar)
  async save(skill: Skill): Promise<Skill> {
    return await this.skillRepository.save(skill);
  }

  // Método para obtener todos los skills
  async findAll(): Promise<Skill[]> {
    return await this.skillRepository.find();
  }

  // Método para buscar un skill por ID (Leer)
  async findById(id: number): Promise<Skill | undefined> {
    return await this.skillRepository.findOne({ where: { id } });
  }

  // Método para actualizar un skill
  async update(id: number, updatedSkill: Partial<Skill>): Promise<Skill | undefined> {
    await this.skillRepository.update(id, updatedSkill);
    return this.findById(id);
  }

  // Método para eliminar un skill
  async delete(id: number): Promise<void> {
    await this.skillRepository.delete(id);
  }
}
