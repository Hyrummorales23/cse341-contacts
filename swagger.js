// swagger.js
const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Contacts API',
    description: 'API for managing contacts information',
    version: '1.0.0'
  },
  host: 'cse341-contacts-m7xh.onrender.com', // Render URL
  schemes: ['https'],
  definitions: {
    // Define the Contact schema for Swagger
    Contact: {
      type: 'object',
      required: ['firstName', 'lastName', 'email', 'favoriteColor', 'birthday'],
      properties: {
        firstName: {
          type: 'string',
          example: 'John'
        },
        lastName: {
          type: 'string',
          example: 'Doe'
        },
        email: {
          type: 'string',
          example: 'john.doe@example.com'
        },
        favoriteColor: {
          type: 'string',
          example: 'Blue'
        },
        birthday: {
          type: 'string',
          example: '1990-01-01'
        }
      }
    },
    // Response schemas
    ContactResponse: {
      type: 'object',
      properties: {
        _id: {
          type: 'string',
          example: '507f1f77bcf86cd799439011'
        },
        firstName: {
          type: 'string',
          example: 'John'
        },
        lastName: {
          type: 'string',
          example: 'Doe'
        },
        email: {
          type: 'string',
          example: 'john.doe@example.com'
        },
        favoriteColor: {
          type: 'string',
          example: 'Blue'
        },
        birthday: {
          type: 'string',
          example: '1990-01-01'
        }
      }
    },
    ContactArray: {
      type: 'array',
      items: {
        $ref: '#/definitions/ContactResponse'
      }
    }
  }
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/index.js'];

// Generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  console.log('Swagger documentation generated successfully!');
});