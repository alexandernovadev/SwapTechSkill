import { AppDataSource } from '../../infrastructure/persistence/typeormSource';
import { ChatParticipant } from '../entity/ChatParticipant';

export class ChatParticipantRepository {
  private chatParticipantRepository =
    AppDataSource.getRepository(ChatParticipant);

  // Método para guardar un chatParticipant (Crear o Actualizar)
  async save(chatParticipant: ChatParticipant): Promise<ChatParticipant> {
    return await this.chatParticipantRepository.save(chatParticipant);
  }

  // Método para obtener todos los chatParticipants
  async findAll(): Promise<ChatParticipant[]> {
    return await this.chatParticipantRepository.find();
  }


  // Método para eliminar un chatParticipant
  async delete(id: number): Promise<void> {
    await this.chatParticipantRepository.delete(id);
  }
}
