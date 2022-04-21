import { Router } from 'express';
import { getUser, updateUser } from '../controllers/user.js';
import { userValidation } from '../middlewares/validation.js';

const router = Router();

router.get('/me', getUser);
router.patch('/me', userValidation, updateUser);

export default router;
