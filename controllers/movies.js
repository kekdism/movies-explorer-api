import Movie from '../models/movie.js';
import NotFoundError from '../utils/errors/NotFoundError.js';
import PermissionError from '../utils/errors/PermissionError.js';

export const getUsersMovies = async (req, res, next) => {
  try {
    const { id } = req.user;
    const movies = await Movie.find({ owner: id }).populate('owner');
    res.send(movies);
  } catch (err) {
    next(err);
  }
};

export const addMovie = async (req, res, next) => {
  try {
    const { id } = req.user;
    const movie = req.body;
    const newMovie = await Movie.create({ ...movie, owner: id });
    const populatedNewMovie = await Movie.findById(newMovie._id).populate('owner');
    res.send(populatedNewMovie);
  } catch (err) {
    next(err);
  }
};

export const deleteMovie = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { movieId } = req.params;
    const movie = await Movie.findById(movieId);
    if (!movie) {
      throw new NotFoundError('Не верный id фильма');
    }
    if (movie.owner !== id) {
      throw new PermissionError('Нельзя удалить фильм другого пользователя.');
    }
    const deletedMovie = await Movie.deleteOne({ _id: movieId });
    res.send(deletedMovie);
  } catch (err) {
    next(err);
  }
};
