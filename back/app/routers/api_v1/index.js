/**
 * Gère les routes commencant par /api
 * Recoit une requête HTTP et exécute le code associé
 * Ici il délègue le travail à des "sous" Router ./category.js
 * On note le dernier middleware qui attrape toutes les requêtes
 *   - commencant par /api
 *   - qui sont différentes de /api/categories et /api/posts
 * et lance une Erreur qui sera attrapée par le ErrorHandler
 */
 const express = require('express');

 const activityRouter = require('./activity');
 const organismRouter = require('./organism');
 const { apiController } = require('../../controllers/v1');
 
const customApiError = require('../../errors/apiErrors');
 
 const router = express.Router();
 
 /**
  * Route par défaut de l'API, ici on la configure pour toutes les méthodes
  * afin de donner l'information en cas d'oubli de spéfication de la route par l'utilisateur
  */
 router.all('/', apiController.home);
 
 // On préfixe les routers de l'API
 router.use('/activity', activityRouter);
 router.use('/organism', organismRouter);
 
 router.use(() => {
     throw new customApiError('API Route not found', { status: 404 });
 });
 
 module.exports = router;