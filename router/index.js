import { Router } from 'express';
import { createUser, loginUser } from '../controllers/user.js';
import userRouter from './userRouter.js';
import movieRouter from './movieRouter.js';
import auth from '../middlewares/auth.js';
import { loginValidation, registerValidation } from '../middlewares/validation.js';
import NotFoundError from '../utils/errors/NotFoundError.js';

const router = Router();

router.post('/signin', loginValidation, loginUser);
router.post('/signup', registerValidation, createUser);

router.use(auth);

router.use('/users', userRouter);
router.use('/movies', movieRouter);

router.use('*', (req, res, next) => next(new NotFoundError('Такой страницы не существует')));

export default router;
