import { contactsCollection } from '../db/contactsModel.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllContacts = async ({ page, perPage, sortBy, sortOrder, isFavourite, type }, ownerId) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const ownerContacts = contactsCollection.where('userId').equals(ownerId);

  if (isFavourite !== null) {
    ownerContacts.where('isFavourite').equals(isFavourite);
  }

  if (type !== null) {
    ownerContacts.where('contactType').equals(type);
  }

  const totalContacts = await contactsCollection.find().merge(ownerContacts).countDocuments();

  const contacts = await ownerContacts
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder })
    .exec();
  const paginationData = calculatePaginationData(totalContacts, perPage, page);

  return {
    data: contacts,
    ...paginationData,
  };
};

export const getContactById = async (id, ownerId) => {
  // const ownerContacts = contactsCollection.where('userId').equals(ownerId);
  // const contact = await ownerContacts.findById(id);
  const contact = await contactsCollection.findOne({ _id: id, userId: ownerId });
  return contact;
};

export const createContact = async (payload, ownerId) => {
  const newContact = await contactsCollection.create({ ownerId, ...payload });
  return newContact;
};

export const updateContactById = async (id, payload, ownerId) => {
  // const ownerContacts = contactsCollection.where('userId').equals(ownerId);
  const options = {
    new: true,
    // includeResultMetadata: true,
  };
  const updatedContact = await contactsCollection.findOneAndUpdate({ _id: id, userId: ownerId }, payload, options);
  return updatedContact;
};

export const deleteContactById = async (id, ownerId) => {
  // const ownerContacts = contactsCollection.where('userId').equals(ownerId);
  const updatedContact = await contactsCollection.findOneAndDelete({ _id: id, userId: ownerId });
  return updatedContact;
};
