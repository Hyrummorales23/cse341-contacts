const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Contacts API',
    description: 'API for managing contacts information',
    version: '1.0.0'
  },
  host: 'cse341-contacts-m7xh.onrender.com', // Render URL
  schemes: ['https'],
  securityDefinitions: {
    apiKey: {
      type: 'apiKey',
      name: 'apiKey',
      in: 'header'
    }
  }
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/index.js'];

// Generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);