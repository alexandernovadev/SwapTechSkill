import { jwt } from 'jsonwebtoken';
import { Server as SocketIOServer, Socket } from 'socket.io';
import { verifyAndReturnJWT } from '../../shared/utils/jwt';
// import { comprobarJWT } from '../../main';

export class SocketsService {
  public io: SocketIOServer;

  constructor(io: SocketIOServer) {
    this.io = io;
    this.socketEvents();
  }

  socketEvents() {
    // On connection
    this.io.on('connection', (socket: Socket) => {
      const token = socket.handshake.query['x-token'] as string;

      const [isValid, user] = verifyAndReturnJWT(token);

      if (!isValid) {
        return socket.disconnect();
      }
      console.log(
        `(${user.id}) ${user.first_name} ${user.last_name}  [conectado]`,
      );

      // Desconexión
      socket.on('disconnect', () => {
        console.log(`(${user.id}) Cliente desconectado`);
      });
    });
  }
}
