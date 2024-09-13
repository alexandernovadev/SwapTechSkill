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

  // Método para buscar un ChatParticipant por chatId y userId (Leer)
  async findByChatAndUser(
    chatId: number,
    userId: number,
  ): Promise<ChatParticipant | undefined> {
    return await this.chatParticipantRepository.findOne({
      where: { chatId, userId },
    });
  }

  // Método para buscar ChatParticipants por chatId (Leer)
  async findByChatId(chatId: number): Promise<ChatParticipant[] | undefined> {
    return await this.chatParticipantRepository.find({ where: { chatId } });
  }

  // Método para buscar ChatParticipants por userId (Leer)
  async findByUserId(userId: number): Promise<ChatParticipant[] | undefined> {
    return await this.chatParticipantRepository.find({ where: { userId } });
  }

  // Método para actualizar un ChatParticipant
  async update(
    chatId: number,
    userId: number,
    updatedChatParticipant: Partial<ChatParticipant>,
  ): Promise<ChatParticipant | undefined> {
    await this.chatParticipantRepository.update(
      { chatId, userId },
      updatedChatParticipant,
    );
    return this.chatParticipantRepository.findOne({
      where: { chatId, userId },
    });
  }
  // Método para eliminar un chatParticipant
  async delete(id: number): Promise<void> {
    await this.chatParticipantRepository.delete(id);
  }
}
