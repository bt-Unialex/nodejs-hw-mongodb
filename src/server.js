import express from 'express';
import pinoLogger from 'pino-http';
import corse from 'cors';
import { getEnvVar } from './utils/getEnvVar.js';
import router from './routers/contacts.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

export const setupServer = () => {
  const httpServer = express();
  const PORT = getEnvVar('port', 3000);

  httpServer.use(corse());

  httpServer.use(pinoLogger({ transport: { target: 'pino-pretty' } }));

  // httpServer.use(express.json()); // для JSON-тел
  httpServer.use(express.urlencoded({ extended: true }));

  httpServer.use(router);

  httpServer.use(notFoundHandler);
  httpServer.use(errorHandler);

  httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
