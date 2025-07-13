import createHttpError from 'http-errors';
import {
  createContact,
  deleteContactById,
  getAllContacts,
  getContactById,
  updateContactById,
} from '../services/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';

export const getAllContactsController = ctrlWrapper(async (request, response) => {
  const paginationParams = parsePaginationParams(request.query);
  const sortParams = parseSortParams(request.query);
  const filter = parseFilterParams(request.query);

  const result = await getAllContacts({ ...paginationParams, ...sortParams, ...filter });
  if (result.data.length === 0) throw createHttpError(404, 'No matches found');

  response.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: result,
  });
});

export const getContactByIdController = ctrlWrapper(async (request, response) => {
  const { contactId } = request.params;
  const result = await getContactById(contactId);

  if (result === null) throw createHttpError(404, 'Contact not found');

  response.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: result,
  });
});

export const createContactController = ctrlWrapper(async (request, response) => {
  const newContact = await createContact(request.body);

  response.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: newContact,
  });
});

export const updateContactByIdController = ctrlWrapper(async (request, response) => {
  const { contactId } = request.params;
  const result = await updateContactById(contactId, request.body);

  if (result === null) throw createHttpError(404, 'Contact not found');

  response.status(200).json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: result,
  });
});

export const deleteContactByIdController = ctrlWrapper(async (request, response) => {
  const { contactId } = request.params;
  const result = await deleteContactById(contactId);

  if (result === null) throw createHttpError(404, 'Contact not found');

  response.status(204).send();
});
