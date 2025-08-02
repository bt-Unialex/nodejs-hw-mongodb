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
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';

export const getAllContactsController = ctrlWrapper(async (request, response) => {
  const ownerId = request.user._id;
  const paginationParams = parsePaginationParams(request.query);
  const sortParams = parseSortParams(request.query);
  const filter = parseFilterParams(request.query);

  const result = await getAllContacts({ ...paginationParams, ...sortParams, ...filter }, ownerId);
  if (result.data.length === 0) throw createHttpError(404, 'No matches found');

  response.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: result,
  });
});

export const getContactByIdController = ctrlWrapper(async (request, response) => {
  const { contactId } = request.params;
  const ownerId = request.user._id;
  const result = await getContactById(contactId, ownerId);

  if (result === null) throw createHttpError(404, 'Contact not found');

  response.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: result,
  });
});

export const createContactController = ctrlWrapper(async (request, response) => {
  const photo = request.file;
  // console.log(photo);
  // photo: {
  //   fieldname: 'photo',
  //   originalname: 'Cat.jpg',
  //   encoding: '7bit',
  //   mimetype: 'image/jpeg',
  //   destination: 'G:\\GoIt\\Projects\\DZ\\NodeJs\\nodejs-hw-mongodb\\src\\temp',
  //   filename: 'photo_688a129eb08a2c1f1a3b0608.jpg',
  //   path: 'G:\\GoIt\\Projects\\DZ\\NodeJs\\nodejs-hw-mongodb\\src\\temp\\photo_688a129eb08a2c1f1a3b0608.jpg',
  //   size: 42899
  // }

  if (photo) {
    const userPhotoPath = await saveFileToCloudinary(photo);
    request.body.photo = userPhotoPath;
  }

  const ownerId = request.user._id;
  const newContact = await createContact(request.body, ownerId);

  response.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: newContact,
  });
});

export const updateContactByIdController = ctrlWrapper(async (request, response) => {
  const photo = request.file;
  if (photo) {
    const userPhotoPath = await saveFileToCloudinary(photo);
    request.body.photo = userPhotoPath;
  }
  const { contactId } = request.params;
  const ownerId = request.user._id;
  const result = await updateContactById(contactId, request.body, ownerId);

  if (result === null) throw createHttpError(404, 'Contact not found');

  response.status(200).json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: result,
  });
});

export const deleteContactByIdController = ctrlWrapper(async (request, response) => {
  const { contactId } = request.params;
  const ownerId = request.user._id;
  const result = await deleteContactById(contactId, ownerId);

  if (result === null) throw createHttpError(404, 'Contact not found');

  response.status(204).send();
});
