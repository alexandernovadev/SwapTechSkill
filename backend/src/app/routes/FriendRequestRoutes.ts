import { Router } from 'express';
import { FriendRequestController } from '../controllers/FriendRequestsController';

const router = Router();

// Crear una nueva solicitud de amistad
router.post('/', FriendRequestController.create);

// Listar todas las solicitudes de amistad con paginación
router.get('/', FriendRequestController.findAll);

// Obtener una solicitud de amistad por ID
router.get('/getbyid/:id', FriendRequestController.findById);

// Actualizar una solicitud de amistad por ID
router.put('/:id', FriendRequestController.update);

// Eliminar una solicitud de amistad por ID
router.delete('/:id', FriendRequestController.delete);

// Ruta opcional para obtener todas las solicitudes sin paginación (si necesitas)
router.get('/getall', FriendRequestController.findAllList);

export default router;
