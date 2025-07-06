import { contactsCollection } from '../db/model.js';

export const getAllContacts = async () => {
  const contacts = await contactsCollection.find();
  return contacts;
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
  const updatedContact = await contactsCollection.findOneAndUpdate(
    { _id: id },
    payload,
    options,
  );
  return updatedContact;
};

export const deleteContactById = async (id) => {
  const updatedContact = await contactsCollection.findOneAndDelete({ _id: id });
  return updatedContact;
};
