import { Router } from 'express';
import {
  createContactController,
  deleteContactByIdController,
  getAllContactsController,
  getContactByIdController,
  updateContactByIdController,
} from '../controllers/contacts.js';
import { createValidationBody, updateValidationBody } from '../middlewares/validationBody.js';
import { isValidId } from '../middlewares/isValidId.js';

const endpoints = Router();

endpoints.get('/', getAllContactsController);
endpoints.get('/:contactId', isValidId, getContactByIdController);

endpoints.post('/', createValidationBody, createContactController);
endpoints.patch('/:contactId', isValidId, updateValidationBody, updateContactByIdController);
endpoints.delete('/:contactId', isValidId, deleteContactByIdController);

export default endpoints;
