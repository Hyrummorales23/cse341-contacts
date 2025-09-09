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

  // Method to create a new contact
  static async createContact(db, contactData) {
    try {
      // Validate required fields
      const requiredFields = ['firstName', 'lastName', 'email', 'favoriteColor', 'birthday'];
      for (const field of requiredFields) {
        if (!contactData[field]) {
          throw new Error(`Missing required field: ${field}`);
        }
      }

      const result = await db.collection('contacts').insertOne(contactData);
      return result.insertedId;
    } catch (error) {
      throw new Error('Failed to create contact: ' + error.message);
    }
  }

  // Method to update a contact
  static async updateContact(db, contactId, updateData) {
    try {
      const id = new mongodb.ObjectId(contactId);
      const result = await db.collection('contacts').updateOne(
        { _id: id },
        { $set: updateData }
      );
      
      if (result.matchedCount === 0) {
        throw new Error('Contact not found');
      }
      
      return result;
    } catch (error) {
      throw new Error('Failed to update contact: ' + error.message);
    }
  }

  // Method to delete a contact
  static async deleteContact(db, contactId) {
    try {
      const id = new mongodb.ObjectId(contactId);
      const result = await db.collection('contacts').deleteOne({ _id: id });
      
      if (result.deletedCount === 0) {
        throw new Error('Contact not found');
      }
      
      return result;
    } catch (error) {
      throw new Error('Failed to delete contact: ' + error.message);
    }
  }
}

module.exports = Contact;