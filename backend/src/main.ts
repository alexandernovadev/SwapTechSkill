import express, { Application, Request, Response } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { logger, stream } from './infrastructure/logging/Logger';
import passport from './infrastructure/auth/PassportStrategies';
import { connectDatabase } from './config/database';
import { errorHandler } from './shared/middlewares/errorHandler';
import { SocketsService } from './app/sockets/sockets';

// Import routes
import seederRoutes from './app/routes/seederRoutes';
import authRoutes from './app/routes/AuthRoutes';
import userRoutes from './app/routes/UserRoutes';
import languagesRoutes from './app/routes/LanguagesRoutes';
import friendRequestRoutes from './app/routes/FriendRequestRoutes';
import skillCategoryRoutes from './app/routes/SkillCategoryRoutes';
import skillRoutes from './app/routes/SkillRoutes';
import userProfessionalStudyRoutes from './app/routes/UserProfessionalStudyRoutes';
import userSkillsRoutes from './app/routes/UserSkillsRoutes';
import userLanguagesRoutes from './app/routes/UserLanguagesRoutes';
import 'dotenv/config';
import { authenticateJWT } from './shared/middlewares/auth';
import path from 'path';

class Server {
  private app: Application;
  private port: string | number;
  private server: http.Server;
  public io: SocketIOServer;

  constructor() {
    // Inicializar aplicación Express
    this.app = express();
    this.port = process.env.PORT_BACK || 3000;

    // Crear servidor HTTP
    this.server = http.createServer(this.app);

    // Inicializar Socket.IO
    this.io = new SocketIOServer(this.server, {
      cors: {
        origin: process.env.URLFRONTEND || 'http://localhost:5173',
        methods: ['GET', 'POST'],
        credentials: true,
      },
    });

    // Conectar a base de datos
    this.connectToDatabase();

    // Configurar middlewares
    this.middlewares();

    // Configurar rutas
    this.routes();

    // Configurar manejo de errores global
    this.handleErrors();

    // Inicializar Sockets
    this.configureSockets();
  }

  private middlewares() {
    // Helmet para mejorar seguridad
    this.app.use(helmet());

    // Morgan para registrar peticiones HTTP
    this.app.use(morgan('combined', { stream }));

    // Habilitar CORS** follow images
    this.app.use(cors());

    // Parseo de JSON y datos de formularios
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    // Inicializar Passport para autenticación
    this.app.use(passport.initialize());

    // Servir la carpeta 'uploads' de manera estática 

    this.app.use('/uploads', cors({
      origin: process.env.URLFRONTEND || 'http://localhost:5173',
      methods: ['GET'],
      credentials: true
    }), express.static(path.join(__dirname, './uploads')));
  }

  private routes() {
    // Ruta principal que redirecciona al frontend
    this.app.get('/', (req: Request, res: Response) => {
      res.redirect(
        process.env.URLFRONTEND || 'http://localhost:5173/auth/login',
      );
    });

    // Rutas de API
    this.app.use('/api/auth', authRoutes);
    this.app.use('/api/users', authenticateJWT, userRoutes);
    this.app.use('/api/friendrequest', friendRequestRoutes);
    this.app.use('/api/languages', languagesRoutes);
    this.app.use('/api/skill-categories', skillCategoryRoutes);
    this.app.use('/api/skills', skillRoutes);
    this.app.use('/api/userprofesions', userProfessionalStudyRoutes);
    this.app.use('/api/userskills', userSkillsRoutes);
    this.app.use('/api/userlanguages', userLanguagesRoutes);

    // Solo para desarrollo: Rutas de seeding
    this.app.use('/api', seederRoutes);
  }

  private handleErrors() {
    // Manejo global de errores
    this.app.use(errorHandler);
  }

  private configureSockets() {
    // Inicializar servicios de Sockets
    new SocketsService(this.io);
  }

  private connectToDatabase() {
    // Conectar a la base de datos
    connectDatabase();
  }

  public start() {
    // Iniciar el servidor
    this.server.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
}

// Instanciar y arrancar el servidor
const server = new Server();
server.start();

export const io = server.io;

export default server;
