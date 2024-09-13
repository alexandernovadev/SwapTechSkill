import { AppDataSource } from '../../infrastructure/persistence/typeormSource';
import { UserProfessionalStudy } from '../entity/UserProfessionalStudy';

export class UserProfessionalStudyRepository {
  private studyRepository = AppDataSource.getRepository(UserProfessionalStudy);

  // Método para guardar un estudio (Crear o Actualizar)
  async save(study: UserProfessionalStudy): Promise<UserProfessionalStudy> {
    return await this.studyRepository.save(study);
  }

  // Método para obtener todos los estudios de un usuario
  async findAllByUser(userId: number): Promise<UserProfessionalStudy[]> {
    return await this.studyRepository.find({ where: { user: { id: userId } } });
  }

  // Método para buscar un estudio por ID
  async findById(studyId: number): Promise<UserProfessionalStudy | undefined> {
    return await this.studyRepository.findOne({ where: { study_id: studyId } });
  }

  // Método para actualizar un estudio
  async update(
    studyId: number,
    updatedStudy: Partial<UserProfessionalStudy>,
  ): Promise<UserProfessionalStudy | undefined> {
    await this.studyRepository.update(studyId, updatedStudy);
    return this.findById(studyId);
  }

  // Método para eliminar un estudio
  async delete(studyId: number): Promise<void> {
    await this.studyRepository.delete(studyId);
  }
}
