import mongoose from 'mongoose';
import validator from 'validator';

const movieSchema = mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    validate: [validator.isURL, 'Не корректный адрес image'],
    required: true,
  },
  trailerLink: {
    type: String,
    validate: [validator.isURL, 'Не корректный адрес trailerLink'],
    required: true,
  },
  thumbnail: {
    type: String,
    validate: [validator.isURL, 'Не корректный адрес thumbnail'],
    required: true,
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

export default mongoose.model('movie', movieSchema);
