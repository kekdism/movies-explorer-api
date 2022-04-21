import { Router } from 'express';
import { addMovie, getUsersMovies, deleteMovie } from '../controllers/movies.js';
import { movieValidation } from '../middlewares/validation.js';

const router = Router();

router.get('/', getUsersMovies);
router.post('/', movieValidation, addMovie);
router.delete('/:movieId', deleteMovie);

export default router;
