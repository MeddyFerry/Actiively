const express = require('express');

const router = express.Router();
const validator = require('../../validations/validator');
const searchSchema = require('../../validations/schemas/searchSchema');
const controller = require('../../controllers/v1/activityController');
const controllerHandler = require('../../helpers/controllerHandler');

router
    .route('/:id')
    /** 
     * GET /api/v1/activity/{id}
     * @summary Get one activity by id
     * @tags GET
     * @param {number} id.path
     * @return {object} 200 - success response - application/json
     * @return {object} 400 - Bad request
     * @example response - 200 - success response
     * {
        "code_activity": 19,
        "name": "Basket - Cours personnalisé",
        "address": "14 rue du temple",
        "zip_code": "44000",
        "city": "Nantes",
        "day": "Dimanche",
        "start_time": "16h00",
        "end_time": "18h00",
        "price": "40",
        "price_type": "la scéance",
        "gender": "Mixte",
        "level": "Débutant",
        "description": "Sit amet consectetur adipisicing elit. Quisquam explicabo obcaecati omnis nam odio repellendus consequuntur tempore voluptatibus, magni nisi dicta dolorem, maxime nesciunt.",
        "image_url": "https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1190&q=80",
        "organism_infos": {
            "email": "basket.club@gmail.com",
            "name": "Basket club Nantes",
            "phone_number": "0734567854",
            "organism_description": "Le meilleur du basket sur Nantes"
           }
     * }
    */
    .get(controllerHandler(controller.getOneActivty))
router
    .route('/search')
    /**
 * POST /api/v1/activity/search
 * @tags POST
 * @summary Find all activities filtered by keyword & zip_code
 * @param {object} request.body - application/json
 * @return {object} 200 - Success response
 * @return {object} 400 - Bad request
 * @example response - 200 - example success response
 * [{
 *   "code_activity": 19,
    "name": "Basket - Cours personnalisé",
    "address": "14 rue du temple",
    "zip_code": "44000",
    "city": "Nantes",
    "day": "Dimanche",
    "start_time": "16h00",
    "end_time": "18h00",
    "price": "40",
    "price_type": "la scéance",
    "gender": "Mixte",
    "level": "Débutant",
    "description": "Sit amet consectetur adipisicing elit. Quisquam explicabo obcaecati omnis nam odio repellendus consequuntur tempore voluptatibus, magni nisi dicta dolorem, maxime nesciunt.",
    "image_url": "https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1190&q=80",
    "organism_infos": {
      "email": "basket.club@gmail.com",
      "name": "Basket club Nantes",
      "phone_number": "0734567854",
      "organism_description": "Le meilleur du basket sur Nantes"
    }
 * }]
 * @example request - example 1
 * {
 *   "keyword": "Tennis%",
 *   "zip_code": "75%"
 * }
 * @example request - example 2 (without keyword)
 * {
 *   "keyword": "%",
 *   "zip_code": "75%"
 * }
 */
    .post(validator(searchSchema),controllerHandler(controller.getAllByKeyword))

module.exports = router;