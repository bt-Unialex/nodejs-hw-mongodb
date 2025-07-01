import express from 'express';
import pinoLogger from 'pino-http';
import corse from 'cors';
import { getEnvVar } from './utils/getEnvVar.js';
import { getAllContacts, getContactById } from './services/contacts.js';

export const setupServer = () => {
  const httpServer = express();
  const PORT = getEnvVar('port', 3000);

  httpServer.use(corse());

  httpServer.use(pinoLogger({ transport: { target: 'pino-pretty' } }));

  httpServer.get('/', (request, response) => {
    response.send('Welcome to "Contacts book". Please pass to /contacts');
  });

  httpServer.get('/contacts', (request, response) => {
    getAllContacts().then((result) =>
      response.status(200).json({
        status: 200,
        message: 'Successfully found contacts!',
        data: result,
      }),
    );
  });

  httpServer.get('/contacts/:contactId', (request, response) => {
    const { contactId } = request.params;
    getContactById(contactId)
      .then((result) => {
        if (result === null) throw new Error('404');
        response.status(200).json({
          status: 200,
          message: `Successfully found contact with id ${contactId}!`,
          data: result,
        });
      })
      .catch((error) => {
        if (error.message === '404') {
          response.status(404).json({ message: 'Contact not found' });
        } else {
          response.status(404).json({ message: 'Wrong ID' });
        }
      });
  });

  httpServer.use((request, response) => {
    response.status(404).json({
      message: 'Endpoint not found',
    });
  });

  httpServer.use((error, request, response) => {
    response.status(500).json({
      message: 'Something went wrong',
      error: error.message,
    });
  });

  httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
