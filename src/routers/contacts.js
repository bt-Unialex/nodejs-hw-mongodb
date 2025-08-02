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
import { authenticate } from '../middlewares/authenticate.js';
import { upload } from '../middlewares/upload.js';

const contactsEndpoints = Router();

contactsEndpoints.use(authenticate);

contactsEndpoints.get('/', getAllContactsController);
contactsEndpoints.get('/:contactId', isValidId, getContactByIdController);

contactsEndpoints.post('/', upload.single('photo'), createContactBodyCheck, createContactController);
contactsEndpoints.patch(
  '/:contactId',
  isValidId,
  upload.single('photo'),
  updateContactBodyCheck,
  updateContactByIdController
);
contactsEndpoints.delete('/:contactId', isValidId, deleteContactByIdController);

export default contactsEndpoints;
