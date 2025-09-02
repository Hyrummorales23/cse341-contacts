const mongodb = require('mongodb');

class Contact {
  // Method to get all contacts
  static async getAllContacts(db) {
    try {
      const contacts = await db.collection('contacts').find().toArray();
      return contacts;
    } catch (error) {
      throw new Error('Failed to fetch contacts from database.');
    }
  }

  // Method to get a single contact by ID
  static async getSingleContact(db, contactId) {
    try {
      // Convert string ID to MongoDB ObjectId
      const id = new mongodb.ObjectId(contactId);
      const contact = await db.collection('contacts').findOne({ _id: id });
      return contact;
    } catch (error) {
      // This catches errors from invalid ID formats
      throw new Error('Invalid ID format or failed to fetch contact.');
    }
  }
}

module.exports = Contact;