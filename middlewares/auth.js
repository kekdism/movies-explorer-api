import jwt from 'jsonwebtoken';

import { JWT_SECRET } from '../utils/constants.js';
import AuthorizationError from '../utils/errors/AuthorizationError.js';

const auth = (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      throw new AuthorizationError('Требуется авторизация');
    }
    const token = req.headers.authorization.replace('Bearer ', '');
    const { id } = jwt.verify(token, JWT_SECRET);
    req.user = { id };
    next();
  } catch (err) {
    next(err);
  }
};

export default auth;
