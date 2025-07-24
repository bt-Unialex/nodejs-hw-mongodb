import { Router } from 'express';
import {
  createContactController,
  deleteContactByIdController,
  getAllContactsController,
  getContactByIdController,
  updateContactByIdController,
} from '../controllers/contacts.js';
import { createContactBodyCheck, updateContactBodyCheck } from '../middlewares/validationBody.js';
import { isValidId } from '../middlewares/isValidId.js';

const contactsEndpoints = Router();

contactsEndpoints.get('/', getAllContactsController);
contactsEndpoints.get('/:contactId', isValidId, getContactByIdController);

contactsEndpoints.post('/', createContactBodyCheck, createContactController);
contactsEndpoints.patch('/:contactId', isValidId, updateContactBodyCheck, updateContactByIdController);
contactsEndpoints.delete('/:contactId', isValidId, deleteContactByIdController);

export default contactsEndpoints;
