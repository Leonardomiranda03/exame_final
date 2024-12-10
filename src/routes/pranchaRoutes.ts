import { Router } from 'express';
import PranchaController from '../controllers/PranchaController';

const router = Router();

router.get('/pranchas', PranchaController.getAll);
router.post('/pranchas', PranchaController.create);

export default router;

