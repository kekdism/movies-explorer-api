import { Router } from 'express';
import { addMovie, getUsersMovies, deleteMovie } from '../controllers/movies.js';
import { movieValidation, deleteMovieValidation } from '../middlewares/validation.js';

const router = Router();

router.get('/', getUsersMovies);
router.post('/', movieValidation, addMovie);
router.delete('/:movieId', deleteMovieValidation, deleteMovie);

export default router;
