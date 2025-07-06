import { Router } from 'express';
import {
  createContactController,
  deleteContactByIdController,
  getAllContactsController,
  getContactByIdController,
  updateContactByIdController,
} from '../controllers/contacts.js';

const endpoints = Router();

endpoints.get('/', (request, response) => {
  response.send('Welcome to "Contacts book". Please pass to /contacts');
});
endpoints.get('/contacts', getAllContactsController);
endpoints.get('/contacts/:contactId', getContactByIdController);

endpoints.post('/contacts', createContactController);
endpoints.patch('/contacts/:contactId', updateContactByIdController);
endpoints.delete('/contacts/:contactId', deleteContactByIdController);

export default endpoints;
