import { AppDataSource } from '../../infrastructure/persistence/typeormSource';
import { MeetingParticipant } from '../entity/MeetingParticipant';

export class MeetingParticipantRepository {
  private meetingParticipantRepository = AppDataSource.getRepository(MeetingParticipant);

  // Método para guardar un meetingParticipant (Crear o Actualizar)
  async save(meetingParticipant: MeetingParticipant): Promise<MeetingParticipant> {
    return await this.meetingParticipantRepository.save(meetingParticipant);
  }

  // Método para obtener todos los meetingParticipants
  async findAll(): Promise<MeetingParticipant[]> {
    return await this.meetingParticipantRepository.find();
  }

  // Método para buscar un meetingParticipant por ID (Leer)
  async findById(id: number): Promise<MeetingParticipant | undefined> {
    return await this.meetingParticipantRepository.findOne({ where: { id } });
  }

  // Método para actualizar un meetingParticipant
  async update(id: number, updatedMeetingParticipant: Partial<MeetingParticipant>): Promise<MeetingParticipant | undefined> {
    await this.meetingParticipantRepository.update(id, updatedMeetingParticipant);
    return this.findById(id);
  }

  // Método para eliminar un meetingParticipant
  async delete(id: number): Promise<void> {
    await this.meetingParticipantRepository.delete(id);
  }
}
