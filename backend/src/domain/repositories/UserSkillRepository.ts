import { AppDataSource } from '../../infrastructure/persistence/typeormSource';
import { UserSkill } from '../entity/UserSkill';

export class UserSkillRepository {
  private userSkillRepository = AppDataSource.getRepository(UserSkill);

  // Método para guardar un userSkill (Crear o Actualizar)
  async save(userSkill: UserSkill): Promise<UserSkill> {
    return await this.userSkillRepository.save(userSkill);
  }

  // Método para obtener todos los userSkills
  async findAll(): Promise<UserSkill[]> {
    return await this.userSkillRepository.find();
  }

  // Método para buscar un userSkill por ID (Leer)
  async findById(id: number): Promise<UserSkill | undefined> {
    return await this.userSkillRepository.findOne({ where: { id } });
  }

  // Método para actualizar un userSkill
  async update(id: number, updatedUserSkill: Partial<UserSkill>): Promise<UserSkill | undefined> {
    await this.userSkillRepository.update(id, updatedUserSkill);
    return this.findById(id);
  }

  // Método para eliminar un userSkill
  async delete(id: number): Promise<void> {
    await this.userSkillRepository.delete(id);
  }
}
