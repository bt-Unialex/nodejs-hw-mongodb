import express from 'express';
import pinoLogger from 'pino-http';
import corse from 'cors';
import router from './routers/index.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import cookieParser from 'cookie-parser';
import { HTTP_PORT } from './constants/index.js';

export const setupServer = () => {
  const httpServer = express();
  const PORT = HTTP_PORT;
  httpServer.set('json spaces', 2); //json prettier

  httpServer.use(corse());
  httpServer.use(cookieParser());

  httpServer.use(pinoLogger({ transport: { target: 'pino-pretty' } }));

  httpServer.use(express.json()); // for JSON-body
  // httpServer.use(express.urlencoded({ extended: true })); // for x-www-form-urlencoded-body

  httpServer.use(router);

  httpServer.use(notFoundHandler);
  httpServer.use(errorHandler);

  httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
