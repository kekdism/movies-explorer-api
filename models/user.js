import mongoose from 'mongoose';
import validator from 'validator';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, 'Не верный email'],
  },
  password: {
    type: String,
    select: false,
    required: true,
  },
}, { versionKey: false });

export default mongoose.model('user', userSchema);
