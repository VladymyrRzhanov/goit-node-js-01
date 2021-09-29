const fs = require('fs/promises');
const path = require('path');
const crypto = require('crypto');

const contactsPath = path.join(__dirname, 'db/contacts.json');

const readContacts = async () => {
  const result = await fs.readFile
    (contactsPath, 'utf8');
  try {
    const contacts = JSON.parse(result);
    return contacts;
  } catch (error) {
    throw error;
  }
};

const listContacts = () => {
  return readContacts();
};

const getContactById = async (contactId) => {
  const contacts = await readContacts();
  const result = contacts.find(contact => String(contact.id) === contactId);
  return result;
};

const removeContact = async (contactId) => {
  const contacts = await readContacts();
  const result = contacts.find(contact => String(contact.id) === contactId);
  const contactIndex = contacts.indexOf(result);
  contacts.splice(contactIndex, 1);
  await fs.writeFile(
    contactsPath,
    JSON.stringify(contacts, null, 2)
  );
  return result;
};

const addContact = async (name, email, phone) => {
  const contacts = await readContacts();
  const newContact = { id: crypto.randomUUID(), name, email, phone };
  contacts.push(newContact);
  await fs.writeFile(
    contactsPath,
    JSON.stringify(contacts, null, 2)
  );
  return newContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact
};