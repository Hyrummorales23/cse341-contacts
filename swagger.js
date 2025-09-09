// swagger.js
const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0' }); // ADD THIS OPTION

const doc = {
  openapi: '3.0.0', // ADD THIS LINE
  info: {
    title: 'Contacts API',
    description: 'API for managing contacts information',
    version: '1.0.0'
  },
  host: 'cse341-contacts-m7xh.onrender.com',
  schemes: ['https'],
  components: {
    schemas: {
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
    }
  }
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  console.log('Swagger documentation generated successfully!');
});