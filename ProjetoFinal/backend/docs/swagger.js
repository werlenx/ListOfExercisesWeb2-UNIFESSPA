const swaggerUi = require('swagger-ui-express');
const swaggerDocument = {
  swagger: '2.0',
  info: {
    title: 'API REST',
    version: '1.0.0',
  },
  paths: {
    '/users/register': {
      post: {
        summary: 'Register a new user',
        parameters: [
          { name: 'body', in: 'body', schema: { type: 'object', properties: { email: { type: 'string' }, password: { type: 'string' } } } },
        ],
        responses: { 201: { description: 'User created' } },
      },
    },
  },
};

module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};
