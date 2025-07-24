import express from 'express';
import pinoLogger from 'pino-http';
import corse from 'cors';
import { getEnvVar } from './utils/getEnvVar.js';
import router from './routers/index.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import cookieParser from 'cookie-parser';

export const setupServer = () => {
  const httpServer = express();
  const PORT = getEnvVar('port', 3000);
  httpServer.set('json spaces', 2); //json prettier

  httpServer.use(corse());
  httpServer.use(cookieParser());

  httpServer.use(pinoLogger({ transport: { target: 'pino-pretty' } }));

  httpServer.use(express.json()); // for JSON-body
  httpServer.use(express.urlencoded({ extended: true })); // for formData-body

  httpServer.get('/', (request, response) => {
    response.send('Welcome to "Contacts book". Please pass to /contacts');
  });

  httpServer.use(router);

  httpServer.use(notFoundHandler);
  httpServer.use(errorHandler);

  httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
