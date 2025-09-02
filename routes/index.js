const express = require('express');
const router = express.Router();
const Contact = require('../models/contact');

// GET - Root route
router.get('/', (req, res) => {
  res.send('Hello from the Contacts API!');
});

// GET - Get ALL contacts
router.get('/contacts', async (req, res) => {
  if (!req.db) {
    return res.status(503).json({ error: 'Database not connected. Please try again later.' });
  }

  try {
    // Use the model method to get data
    const contacts = await Contact.getAllContacts(req.db);
    res.json(contacts);
  } catch (error) {
    console.error('Error in /contacts route:', error);
    res.status(500).json({ error: error.message });
  }
});

// GET - Get a SINGLE contact by ID
router.get('/contacts/:id', async (req, res) => {
  if (!req.db) {
    return res.status(503).json({ error: 'Database not connected. Please try again later.' });
  }

  try {
    // Use the model method to get data
    const contact = await Contact.getSingleContact(req.db, req.params.id);

    if (contact) {
      res.json(contact);
    } else {
      res.status(404).json({ error: 'Contact not found' });
    }
  } catch (error) {
    console.error('Error in /contacts/:id route:', error);
    // The model tells us if it's an invalid ID format vs other errors
    if (error.message.includes('Invalid ID')) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

module.exports = router;