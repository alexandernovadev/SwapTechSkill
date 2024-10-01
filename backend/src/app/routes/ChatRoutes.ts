import { Router } from 'express';
import { ChatController } from '../controllers/ChatController';

const router = Router();

// Crear una nueva solicitud de conexión
router.get('/getMyChats/:id', ChatController.getMyChats);


export default router;
