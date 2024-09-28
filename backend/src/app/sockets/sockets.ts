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
      console.log('New client connected', socket.id);

   

      // Desconexión
      socket.on('disconnect', () => {
        console.log('Cliente desconectado');
     
      });
    });
  }
}
