// sockets.ts
import { Server as SocketIOServer, Socket } from 'socket.io';


export class SocketsService {
  private io: SocketIOServer;

  constructor(io: SocketIOServer) {
    this.io = io;
    this.socketEvents();
  }

  socketEvents() {
    // On connection
    this.io.on('connection', (socket: Socket) => {
      console.log('New client connected');

      // Escuchar evento: mensaje-to-server
      socket.on('mensaje-to-server', (data) => {
        console.log('Mensaje recibido del cliente:', data);

        // Emitir mensaje a todos los clientes
        this.io.emit('mensaje-from-server', data);
      });

      // Desconexión
      socket.on('disconnect', () => {
        console.log('Cliente desconectado');
      });
    });
  }
}
