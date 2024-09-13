import { AppDataSource } from '../../infrastructure/persistence/typeormSource';
import { Notification } from '../entity/Notification';

export class NotificationRepository {
  private notificationRepository = AppDataSource.getRepository(Notification);

  // Método para guardar un notification (Crear o Actualizar)
  async save(notification: Notification): Promise<Notification> {
    return await this.notificationRepository.save(notification);
  }

  // Método para obtener todos los notifications
  async findAll(): Promise<Notification[]> {
    return await this.notificationRepository.find();
  }

  // Método para buscar un notification por ID (Leer)
  async findById(id: number): Promise<Notification | undefined> {
    return await this.notificationRepository.findOne({ where: { id } });
  }

  // Método para actualizar un notification
  async update(id: number, updatedNotification: Partial<Notification>): Promise<Notification | undefined> {
    await this.notificationRepository.update(id, updatedNotification);
    return this.findById(id);
  }

  // Método para eliminar un notification
  async delete(id: number): Promise<void> {
    await this.notificationRepository.delete(id);
  }
}
