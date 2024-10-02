import { Router } from 'express';
import { ChatController } from '../controllers/ChatController';

const router = Router();

// Crear una nueva solicitud de conexión
router.get('/getMyChats/:id', ChatController.getMyChats);
router.post('/saveMessage', ChatController.saveMessage);
router.get('/getAllMessages/:chatID', ChatController.getAllMessages);


export default router;
