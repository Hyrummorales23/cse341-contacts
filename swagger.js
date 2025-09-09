// swagger.js (Swagger 2.0 version)
const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Contacts API',
    description: 'API for managing contacts information',
    version: '1.0.0'
  },
  host: 'cse341-contacts-m7xh.onrender.com',
  schemes: ['https'],
  basePath: '/',
  consumes: ['application/json'],
  produces: ['application/json'],
  definitions: {
    Contact: {
      type: 'object',
      required: ['firstName', 'lastName', 'email', 'favoriteColor', 'birthday'],
      properties: {
        firstName: { type: 'string', example: 'John' },
        lastName: { type: 'string', example: 'Doe' },
        email: { type: 'string', example: 'john.doe@example.com' },
        favoriteColor: { type: 'string', example: 'Blue' },
        birthday: { type: 'string', example: '1990-01-01' }
      }
    },
    ContactResponse: {
      type: 'object',
      properties: {
        _id: { type: 'string', example: '507f1f77bcf86cd799439011' },
        firstName: { type: 'string', example: 'John' },
        lastName: { type: 'string', example: 'Doe' },
        email: { type: 'string', example: 'john.doe@example.com' },
        favoriteColor: { type: 'string', example: 'Blue' },
        birthday: { type: 'string', example: '1990-01-01' }
      }
    }
  },
  paths: {
    '/contacts': {
      post: {
        summary: 'Create a new contact',
        tags: ['Contacts'],
        parameters: [
          {
            name: 'body',
            in: 'body',
            required: true,
            schema: {
              $ref: '#/definitions/Contact'
            }
          }
        ],
        responses: {
          201: {
            description: 'Contact created successfully',
            schema: {
              type: 'object',
              properties: {
                insertedId: {
                  type: 'string',
                  example: '507f1f77bcf86cd799439011'
                }
              }
            }
          },
          400: { description: 'Missing required fields' },
          500: { description: 'Internal server error' },
          503: { description: 'Service Unavailable' }
        }
      }
    },
    '/contacts/{id}': {
      put: {
        summary: 'Update a contact',
        tags: ['Contacts'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            type: 'string',
            description: 'MongoDB ObjectId of the contact to update'
          },
          {
            name: 'body',
            in: 'body',
            required: true,
            schema: {
              $ref: '#/definitions/Contact'
            }
          }
        ],
        responses: {
          200: { description: 'Contact updated successfully' },
          400: { description: 'Invalid ID format' },
          404: { description: 'Contact not found' },
          500: { description: 'Internal server error' },
          503: { description: 'Service Unavailable' }
        }
      }
    }
  }
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  console.log('Swagger documentation generated successfully!');
});