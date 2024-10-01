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
    return await this.chatParticipantRepository.find({
      relations: ['chat', 'user'], // Cargar las relaciones
    });
  }

  // Método para obtener un array de IDs de chats únicos que coinciden con el id del usuario
  async findUniqueChatIdsByUserId(userId: number): Promise<number[]> {
    const chatParticipants = await this.chatParticipantRepository.find({
      where: {
        user: { id: userId }, // Condición para filtrar por el id del usuario
      },
      relations: ['chat'], // Solo necesitamos cargar la relación de Chat
    });

    // Extraer los ids de los chats
    return chatParticipants.map((cp) => cp.chat.id);
  }

  // Método para eliminar un chatParticipant
  async delete(id: number): Promise<void> {
    await this.chatParticipantRepository.delete(id);
  }
}
