import Movie from '../models/movie.js';

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
    const { movieId } = req.params;
    const deletedMovie = await Movie.findByIdAndDelete(movieId);
    if (!deleteMovie) {
      throw new Error('Не верный id фильма');
    }
    res.send(deletedMovie);
  } catch (err) {
    next(err);
  }
};
