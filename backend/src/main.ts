import express, { Application, Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { logger, stream } from "./infrastructure/logging/Logger";
import dotenv from 'dotenv';
// import { chatSocket } from './application/sockets/chatSocket';
// import { notificationSocket } from './application/sockets/notificationSocket';
import { errorHandler } from './shared/middlewares/errorHandler';
import seederRoutes from './app/routes/seederRoutes';
import authRoutes from './app/routes/AuthRoutes';
import userRoutes from './app/routes/UserRoutes';
import languagesRoutes from './app/routes/LanguagesRoutes';
import skillCategoryRoutes from './app/routes/SkillCategoryRoutes';
import { connectDatabase } from './config/database';
import passport from './infrastructure/auth/PassportStrategies';
// import { authMiddleware } from './shared/middlewares/auth';


dotenv.config();
// Express application initialization
const app: Application = express();
const server = http.createServer(app);
const io = new SocketIOServer(server);

// Middleware setup
app.use(helmet());
app.use(morgan('combined', { stream }));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

// Socket.IO integration
// io.on('connection', (socket) => {
//   chatSocket(io, socket);
//   notificationSocket(io, socket);
// });

// Database connection
connectDatabase();

// Basic routes
app.get('/', (req: Request, res: Response) => {
  // res.send('Oi Bom Dia, como voçe tá');
  res.redirect('http://localhost:5173/auth/login');
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/languages', languagesRoutes);
app.use('/api/skill-categories', skillCategoryRoutes);
// app.use('/api/users', authMiddleware, userRoutes);
// app.use('/api/notifications', authMiddleware, notificationRoutes);
// app.use('/api/chats', authMiddleware, chatRoutes);

// hacer un miidleware para solo admin y mentor
// Seeding routes
app.use('/api', seederRoutes); // Only for development 

// Global error handling
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  // logger.info(`Server is running on port ${PORT}`);
  console.log(`process.env.PORT: ${process.env.GITHUB_CLIENT_ID}`);
  console.log(`Server is running on port ${PORT}`);
});

export default app;
