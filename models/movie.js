import mongoose from 'mongoose';
import validator from 'validator';

const movieSchema = mongoose.Schema({
  country: {
    type: String,
    require: true,
  },
  director: {
    type: String,
    require: true,
  },
  duration: {
    type: Number,
    require: true,
  },
  year: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    validate: [validator.isURL, 'Не корректный адрес image'],
    require: true,
  },
  trailerLink: {
    type: String,
    validate: [validator.isURL, 'Не корректный адрес trailerLink'],
    require: true,
  },
  thumbnail: {
    type: String,
    validate: [validator.isURL, 'Не корректный адрес thumbnail'],
    require: true,
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
    validate: [validator.isMongoId, 'Не корректный owner'],
    require: true,
  },
  movieId: {
    type: Number,
    require: true,
  },
  nameRU: {
    type: String,
    require: true,
  },
  nameEN: {
    type: String,
    require: true,
  },
});

export default mongoose.model('movie', movieSchema);
