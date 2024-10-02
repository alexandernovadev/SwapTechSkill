import { AppDataSource } from '../../infrastructure/persistence/typeormSource';
import { Message } from '../entity/Message';

export class MessageRepository {
  private messageRepository = AppDataSource.getRepository(Message);

  // Método para guardar un message (Crear o Actualizar)
  async save(message: Message): Promise<Message> {
    return await this.messageRepository.save(message);
  }

  // Método para obtener todos los messages
  async findAll(): Promise<Message[]> {
    return await this.messageRepository.find();
  }

  // get all messages by chatId and userId (sender) and userId (receiver)
  async findAllMessagesByChatId(chatId: number): Promise<Message[]> {
    return await this.messageRepository.find({
      where: {
        chat: { id: chatId },
      },
      relations: ['sender'],
      order: { sentAt: 'ASC' },
    });
  }

  // Método para buscar un message por ID (Leer)
  async findById(id: number): Promise<Message | undefined> {
    return await this.messageRepository.findOne({ where: { id } });
  }

  // Método para actualizar un message
  async update(
    id: number,
    updatedMessage: Partial<Message>,
  ): Promise<Message | undefined> {
    await this.messageRepository.update(id, updatedMessage);
    return this.findById(id);
  }

  // Método para eliminar un message
  async delete(id: number): Promise<void> {
    await this.messageRepository.delete(id);
  }
}
