// routes/index.js
const express = require('express');
const router = express.Router();
const Contact = require('../models/contact');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger-output.json');

// Swagger UI route
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// GET - Root route
/**
 * @swagger
 * /:
 *   get:
 *     summary: API root endpoint
 *     tags: [General]
 *     responses:
 *       200:
 *         description: Returns API welcome message
 */
router.get('/', (req, res) => {
  res.send('Hello from the Contacts API!');
});

// GET - Get ALL contacts
/**
 * @swagger
 * /contacts:
 *   get:
 *     summary: Retrieve all contacts
 *     tags: [Contacts]
 *     responses:
 *       200:
 *         description: A list of contacts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   firstName:
 *                     type: string
 *                   lastName:
 *                     type: string
 *                   email:
 *                     type: string
 *                   favoriteColor:
 *                     type: string
 *                   birthday:
 *                     type: string
 *       500:
 *         description: Internal server error
 */
router.get('/contacts', async (req, res) => {
  if (!req.db) {
    return res.status(503).json({ error: 'Database not connected. Please try again later.' });
  }

  try {
    const contacts = await Contact.getAllContacts(req.db);
    res.json(contacts);
  } catch (error) {
    console.error('Error in /contacts route:', error);
    res.status(500).json({ error: error.message });
  }
});

// GET - Get a SINGLE contact by ID
/**
 * @swagger
 * /contacts/{id}:
 *   get:
 *     summary: Retrieve a single contact by ID
 *     tags: [Contacts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of the contact
 *     responses:
 *       200:
 *         description: Contact data
 *       404:
 *         description: Contact not found
 *       400:
 *         description: Invalid ID format
 *       500:
 *         description: Internal server error
 */
router.get('/contacts/:id', async (req, res) => {
  if (!req.db) {
    return res.status(503).json({ error: 'Database not connected. Please try again later.' });
  }

  try {
    const contact = await Contact.getSingleContact(req.db, req.params.id);
    if (contact) {
      res.json(contact);
    } else {
      res.status(404).json({ error: 'Contact not found' });
    }
  } catch (error) {
    console.error('Error in /contacts/:id route:', error);
    if (error.message.includes('Invalid ID')) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

// POST - Create a new contact
/**
 * @swagger
 * /contacts:
 *   post:
 *     summary: Create a new contact
 *     tags: [Contacts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - favoriteColor
 *               - birthday
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               favoriteColor:
 *                 type: string
 *               birthday:
 *                 type: string
 *     responses:
 *       201:
 *         description: Contact created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 insertedId:
 *                   type: string
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Internal server error
 */
router.post('/contacts', async (req, res) => {
  if (!req.db) {
    return res.status(503).json({ error: 'Database not connected. Please try again later.' });
  }

  try {
    const insertedId = await Contact.createContact(req.db, req.body);
    res.status(201).json({ insertedId });
  } catch (error) {
    console.error('Error in POST /contacts:', error);
    if (error.message.includes('Missing required field')) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

// PUT - Update a contact
/**
 * @swagger
 * /contacts/{id}:
 *   put:
 *     summary: Update a contact
 *     tags: [Contacts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of the contact to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               favoriteColor:
 *                 type: string
 *               birthday:
 *                 type: string
 *     responses:
 *       200:
 *         description: Contact updated successfully
 *       404:
 *         description: Contact not found
 *       400:
 *         description: Invalid ID format
 *       500:
 *         description: Internal server error
 */
router.put('/contacts/:id', async (req, res) => {
  if (!req.db) {
    return res.status(503).json({ error: 'Database not connected. Please try again later.' });
  }

  try {
    const result = await Contact.updateContact(req.db, req.params.id, req.body);
    res.status(200).json({ message: 'Contact updated successfully' });
  } catch (error) {
    console.error('Error in PUT /contacts/:id:', error);
    if (error.message.includes('Invalid ID')) {
      res.status(400).json({ error: error.message });
    } else if (error.message.includes('not found')) {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

// DELETE - Delete a contact
/**
 * @swagger
 * /contacts/{id}:
 *   delete:
 *     summary: Delete a contact
 *     tags: [Contacts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of the contact to delete
 *     responses:
 *       200:
 *         description: Contact deleted successfully
 *       404:
 *         description: Contact not found
 *       400:
 *         description: Invalid ID format
 *       500:
 *         description: Internal server error
 */
router.delete('/contacts/:id', async (req, res) => {
  if (!req.db) {
    return res.status(503).json({ error: 'Database not connected. Please try again later.' });
  }

  try {
    const result = await Contact.deleteContact(req.db, req.params.id);
    res.status(200).json({ message: 'Contact deleted successfully' });
  } catch (error) {
    console.error('Error in DELETE /contacts/:id:', error);
    if (error.message.includes('Invalid ID')) {
      res.status(400).json({ error: error.message });
    } else if (error.message.includes('not found')) {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

module.exports = router;