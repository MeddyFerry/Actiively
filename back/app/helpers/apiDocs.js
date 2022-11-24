const expressJSDocSwagger = require('express-jsdoc-swagger');

const options = {
    info: {
        version: '1.0.0',
        title: "Actiively API",
        description: "Actiively, trouvez l'activité qui vous convient",
    },
    baseDir: __dirname,
    // On analyse tous les fichiers du projet
    filesPattern: [
    '../routers/**/*.js', 
    '../errors/*.js',
    '../models/v1/*.js'
    ],
    // URL où sera disponible la page de documentation
    swaggerUIPath: process.env.API_DOCUMENTATION_ROUTE,
    // Activation de la documentation à travers une route de l'API
    exposeApiDocs: true,
    apiDocsPath: '/api/docs',
    "security": {
        "BasicAuth": {
          "type": "http",
          "scheme": "basic"
        },
        "BearerAuth": {
          "type": "http",
          "scheme": "bearer",
          "bearerFormat": "JWT",
          "value": "Bearer <JWT token here>"
        }
      }
};

/**
 * Swagger middleware factory
 * @param {object} app Express application
 * @returns Express JSDoc Swagger middleware that create web documentation
 */
module.exports = (app) => expressJSDocSwagger(app)(options);