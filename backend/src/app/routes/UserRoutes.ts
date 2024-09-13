import { Router } from 'express';
import { UserController } from '../controllers/UserController';

const router = Router();

// Rutas correspondientes a cada operación de User
router.post('/create', UserController.create);
router.put('/update/:id', UserController.update);
router.delete('/delete/:id', UserController.delete);
router.get('/search', UserController.searchAdvanced); // Búsqueda avanzada
router.get('/getById/:id', UserController.getById); // Buscar por ID
router.get('/searchByJustWordAllData', UserController.searchByJustWordAllData); // Búsqueda por palabra en todos los campos

export default router;
