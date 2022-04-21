import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import cors from 'cors';
import { errors } from 'celebrate';
import router from './router/index.js';
import { requestLogger, errorLogger } from './middlewares/logger.js';
import { PORT, DB_URL } from './utils/constants.js';

dotenv.config();

const app = express();

app.use(helmet());

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
});

app.use(requestLogger);

app.use(bodyParser.json());

app.use(cors());

app.use(router);

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode, message } = err;
  res.status(statusCode).send({ message });
});

app.listen(PORT);
