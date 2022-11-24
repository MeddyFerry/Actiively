const express = require('express');
const router = express.Router();

const registerSchema = require('../../validations/schemas/organismSchema');
const loginSchema = require('../../validations/schemas/loginSchema');
const createActivitySchema = require('../../validations/schemas/activitySchema');
const validator = require('../../validations/validator')

const controllerHandler = require('../../helpers/controllerHandler');
const controller = require('../../controllers/v1/organismController');
const activitiesController = require('../../controllers/v1/activityController');
const {validateToken} = require('../../middlewares/JWT');


router
    .route('/register')
        /**
 * POST /api/v1/register
 * @tags POST
 * @summary Register an organism
 * @param {object} request.body - application/json
 * @return {object} 200 - Organism with email "current email" successfully created !
 * @return {object} 400 - Bad request
 * @example response - 200 - successfully response
 * {"message": "Organism with email {current email} successfully created !"}
 * @example request - example of body format
 * {
        "email": "email@email.com",
        "name": "Name of the organism",
        "password": "Password",
        "confirm_password": "Password",
        "description": "Description of the organism",
        "contact_email": "email.contact@contact.com",
        "phone_number": "0701010101"
 * }
 */
    .post(validator(registerSchema),controllerHandler(controller.register))
    
router
    .route('/login')
/**
 * POST /api/v1/login
 * @tags POST
 * @summary Login an organism
 * @param {object} request.body - application/json
 * @return {object} 200 - Logged-in !
 * @return {object} 400 - Bad request
 * @example response - 200
 * {
    "authenticated": true,
    "token": "current token",
    "message": "Authentication Successful."                 
 * }
 * @example request - example of body format
 * {
    "email": "email@email.com",
    "password": "Password"
 * }
 */
    .post(validator(loginSchema),controllerHandler(controller.login))

router
    .route('/profile')
    /**
 * GET /api/v1/organism/profile
 * @tags GET
 * @summary Get the profile of an organism
 * @param {object} request.body - application/json
 * @security authorization
 * @return {object} 200 - successfully response
 * @return {object} 400 - Bad request
 * @example response - 200
 * {
    "message": "Profile infos"                 
 * }
 * @example request - example of body format
 * {
    "email": "email@email.com",
    "password": "Password"
 * }
 */
    .get(validateToken,controllerHandler(controller.profile))

router
    .route('/profile/edit')
/**
 * PATCH /api/v1/organism/profile/edit
 * @tags PATCH
 * @summary Edit an organism
 * @param {object} request.body - application/json
 * @security authorization
 * @return {object} 200 - Organism updated !
 * @return {object} 400 - Bad request
 * @example response - 200
 * {"message": "Organism updated"}
 * @example request - example of body format
 * {
        "email": "",
        "name": "",
        "description": "Modified description of the organism",
        "contact_email": "",
        "phone_number": ""
 * }
 */
    .patch(validateToken,controllerHandler(controller.updateProfile))

router
    .route('/profile/delete')
        /**
 * DELETE /api/v1/organism/profile/delete
 * @tags DELETE
 * @summary Delete the profile of an organism currently logged in
 * @param {object} request.body - application/json
 * @security authorization
 * @return {object} 200 - Organism with id {id} with related activities deleted !
 * @return {object} 400 - Bad request
 * @example response - 200
 * {
    "message": "Organism with id {id} with related activities deleted !"                 
 * }
 */
    .delete(validateToken,controllerHandler(controller.deleteProfile))

router
    .route('/create')
    /**
 * POST /api/v1/organism/create
 * @tags POST
 * @summary Create an activity (organism connected)
 * @description The name as the UNIQUE constraint
 * @param {object} request.body - application/json
 * @return {object} 400 - Bad request
 * @return {object} 200 - Activity with id {id} successfully created !
 * @example response - 200
 * {
    "message": "Activity with id {id} successfully created !"                 
 * }
 * @example request - example of body format
 * {
    "name": "Yoga",
    "description": "Sit amet consectetur adipisicing elit. Quisquam explicabo obcaecati omnis nam odio repellendus consequuntur tempore voluptatibus, magni nisi dicta dolorem, maxime nesciunt.",
    "address": "30 rue du bois",
    "zip_code": "44000",
    "city": "Nantes",
    "price": "35",
    "price_type": "la scéance",
    "gender": "Mixte",
    "level": "Confirmé",
    "image_url": "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1220&q=80",
    "day": "Dimanche",
    "start_time": "10h00",
    "end_time": "12h00"
 * }
 */
    .post(validateToken,validator(createActivitySchema),controllerHandler(activitiesController.postOneActivity))

router
    .route('/activities')
        /**
 * GET /api/v1/organism/activities
 * @tags GET
 * @summary Get all activities from the connected organism
 * @security authorization
 * @return {object} 200 - response success
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
 */
    .get(validateToken,controllerHandler(activitiesController.getOrganismActivities))
  
router
    .route('/activity/:id')
        /** 
     * GET /api/v1/organism/activity/{id}
     * @summary Get one activity by id (organism connected)
     * @tags GET
     * @param {number} id.path
     * @security authorization
     * @return {Activity} 200 - success response - application/json
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
     * 
    */
    .get(validateToken,controllerHandler(activitiesController.getOneOrganismActivty))

router
    .route('/activity/:id/delete')
       /** 
     * DELETE /api/v1/organism/activity/{id}/delete
     * @summary delete one activity by id (organism connected)
     * @tags DELETE
     * @param {number} id.path
     * @security authorization
     * @return {Activity} 200 - success response - application/json
     * @return {object} 400 - Bad request
     * @example response - 200 - success response
     * {"message": "Activity with id {id} successfully deleted !"}
    */
    .delete(validateToken,controllerHandler(activitiesController.deleteOneActivity))

router
    .route('/activity/:id/edit')
        /**
 * PATCH /api/v1/organism/activity/{id}/edit
 * @tags PATCH
 * @summary Update an activity (organism connected)
 * @description The name as the UNIQUE constraint
 * @param {object} request.body - application/json
 * @security authorization
 * @return {object} 400 - Bad request
 * @return {object} 200 - Activity with id {id} successfully updated!
 * @example response - 200
 * {
    "message": "Activity with id {id} successfully updated !"                 
 * }
 * @example request - example of body format
 * {
    "name": "",
    "description": "",
    "address": "",
    "zip_code": "",
    "city": "",
    "price": "40",
    "price_type": "",
    "gender": "Mixte",
    "level": "Confirmé",
    "image_url": "",
    "day": "Samedi",
    "start_time": "10h00",
    "end_time": "12h00"
 * }
 */
    .patch(validateToken,controllerHandler(activitiesController.updateOneActivity))

module.exports = router;