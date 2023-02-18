import * as bodyParser from 'body-parser';
import express from 'express';
import type { Response, ErrorRequestHandler } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';

dotenv.config();

import './db/database';

import { verifyToken } from './middlewares/auth';
import { validateRole } from './middlewares/validateRole';

import { UserRouter } from './users/user.route';
import { TutorialRouter } from './tutorials/tutorial.route';
import { verifyTutorialToken } from './middlewares/validateTokenTutorial';
import { CustomRequest } from './users/user.model';

export const server: express.Application = express();

function _exceptionMiddleware(
  error: ErrorRequestHandler,
  _: CustomRequest,
  res: Response
) {
  const status = 500;
  res.status(status);
  res.send(error);
}

server.use(morgan('dev'));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(helmet()); // for security purposes

server.use(verifyToken); // auth middleware
server.use(validateRole); // filter by role middleware
server.use(verifyTutorialToken); // check tutorial creation token

// routes
server.use('/api/v1/users', UserRouter);
server.use('/api/v1/tutorials', TutorialRouter);

server.use((_: CustomRequest, res: Response): void => {
  res.status(404);
  res.send('Not found');
});

server.use(_exceptionMiddleware); // error middleware
