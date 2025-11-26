import { Router } from 'express';
import mainController from '../controllers/main.controller.js';

const router = Router();

// Endpoint: Raíz
router.get('/', mainController.sendGreeting);

// Endpoint: Colores
router.get('/colores', mainController.getColors);
router.post('/colores', mainController.postColor);

export default router;