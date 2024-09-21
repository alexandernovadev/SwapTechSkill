import { Server as SocketIOServer, Socket } from 'socket.io';

interface ConnectedUsers {
  [key: string]: string; // userId -> socketId
}

export class SocketsService {
  private io: SocketIOServer;
  private connectedUsers: ConnectedUsers = {};

  constructor(io: SocketIOServer) {
    this.io = io;
    this.socketEvents();
  }

  socketEvents() {
    // On connection
    this.io.on('connection', (socket: Socket) => {
      console.log('New client connected', socket.id);

      // Guardar el userId en el objeto de usuarios conectados cuando el cliente se conecta
      socket.on('user-connected', (userId: string) => {
        this.connectedUsers[userId] = socket.id;
        console.log(`User ${userId} connected with socket id ${socket.id}`);
      });

      // Escuchar evento de solicitud de amistad
      socket.on('new-friend-request', (receiverId: string, data) => {
        console.log('Nueva solicitud de amistad:', data);

        const receiverSocketId = this.connectedUsers[receiverId];
        if (receiverSocketId) {
          // Enviar notificación solo al receptor específico
          this.io.to(receiverSocketId).emit('mensaje-from-server', data);
        }
      });

      // Desconexión
      socket.on('disconnect', () => {
        console.log('Cliente desconectado');
        // Eliminar al usuario de los conectados
        const userId = Object.keys(this.connectedUsers).find(
          (key) => this.connectedUsers[key] === socket.id,
        );
        if (userId) {
          delete this.connectedUsers[userId];
        }
      });
    });
  }
}
