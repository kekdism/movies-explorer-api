import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/user.js';

import { SALT_RADIUS, JWT_SECRET } from '../utils/constants.js';
import NotFoundError from '../utils/errors/NotFoundError.js';
import DuplicateError from '../utils/errors/DuplicateError.js';
import AuthorizationError from '../utils/errors/AuthorizationError.js';

export const createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const encryptedPass = await bcrypt.hash(password, SALT_RADIUS);
    const newUser = await User.create({ name, email, password: encryptedPass });
    const newUserWithoutPassField = Object.fromEntries(Object.entries(newUser.toObject()).filter(([key]) => key !== 'password'));
    res.send(newUserWithoutPassField);
  } catch (err) {
    if (err.code === 11000) {
      next(new DuplicateError('Такой пользователь уже существет'));
    } else {
      next(err);
    }
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      throw new AuthorizationError('Не верная почта или пароль.');
    }
    const isCorrectPassword = await bcrypt.compare(password, user.password);
    if (!isCorrectPassword) {
      throw new AuthorizationError('Не верная почта или пароль.');
    }
    const token = jwt.sign({ id: user._id }, JWT_SECRET);
    res.send({ token });
  } catch (err) {
    next(err);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const { id } = req.user;
    const user = await User.findById(id);
    if (!user) {
      throw new NotFoundError('Такого пользователя не существует');
    }
    res.send(user);
  } catch (err) {
    next(err);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { email, name } = req.body;
    const { id } = req.user;
    const user = await User.findByIdAndUpdate(id, { email, name }, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      throw new NotFoundError('Такого пользователя не существует');
    }
    res.send(user);
  } catch (err) {
    if (err.code === 11000) {
      next(new DuplicateError('Пользователь с таким email уже существет'));
    } else {
      next(err);
    }
  }
};
