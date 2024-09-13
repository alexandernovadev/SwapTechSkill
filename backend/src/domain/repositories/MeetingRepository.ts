import { AppDataSource } from '../../infrastructure/persistence/typeormSource';
import { Meeting } from '../entity/Meeting';

export class MeetingRepository {
  private meetingRepository = AppDataSource.getRepository(Meeting);

  // Método para guardar un meeting (Crear o Actualizar)
  async save(meeting: Meeting): Promise<Meeting> {
    return await this.meetingRepository.save(meeting);
  }

  // Método para obtener todos los meetings
  async findAll(): Promise<Meeting[]> {
    return await this.meetingRepository.find();
  }

  // Método para buscar un meeting por ID (Leer)
  async findById(id: number): Promise<Meeting | undefined> {
    return await this.meetingRepository.findOne({ where: { id } });
  }

  // Método para actualizar un meeting
  async update(id: number, updatedMeeting: Partial<Meeting>): Promise<Meeting | undefined> {
    await this.meetingRepository.update(id, updatedMeeting);
    return this.findById(id);
  }

  // Método para eliminar un meeting
  async delete(id: number): Promise<void> {
    await this.meetingRepository.delete(id);
  }
}
