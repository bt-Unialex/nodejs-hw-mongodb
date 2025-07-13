import { contactsCollection } from '../db/model.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllContacts = async ({ page, perPage, sortBy, sortOrder, isFavourite, type }) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  // const allContacts = await contactsCollection.find();
  // const totalContacts = allContacts.length;
  const allContacts = contactsCollection.find();

  console.log(isFavourite);
  if (isFavourite !== null) {
    allContacts.where('isFavourite').equals(isFavourite);
  }

  if (type !== null) {
    allContacts.where('contactType').equals(type);
  }

  const totalContacts = await contactsCollection.find().merge(allContacts).countDocuments();

  const contacts = await allContacts
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

export const getContactById = async (id) => {
  const contact = await contactsCollection.findById(id);
  return contact;
};

export const createContact = async (payload) => {
  const newContact = await contactsCollection.create(payload);
  return newContact;
};

export const updateContactById = async (id, payload) => {
  const options = {
    new: true,
    // includeResultMetadata: true,
  };
  const updatedContact = await contactsCollection.findOneAndUpdate({ _id: id }, payload, options);
  return updatedContact;
};

export const deleteContactById = async (id) => {
  const updatedContact = await contactsCollection.findOneAndDelete({ _id: id });
  return updatedContact;
};
