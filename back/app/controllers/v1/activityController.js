const activityDatamapper = require('../../models/v1/activity');
const dayDatamapper = require('../../models/v1/day');

const customApiError = require('../../errors/apiErrors');
const { response } = require('express');

module.exports = {
    /**
     * Find one activity by id
     * @param {*} req 
     * @param {*} res 
     * @returns an object containing one activity
     */
    async getOneActivty(req, res){
        const activity = await activityDatamapper.findByPk(req.params.id);
        return res.json(activity);
    },
    /**
     * Find one activity by organism
     * @param {*} req 
     * @param {*} res 
     * @returns an object containing one activity by the current organism connected
     */
    async getOneOrganismActivty(req, res){
            const activity = await activityDatamapper.findActivityByOrganism(req.params.id, req.decodedToken.email);
            console.log(res.json(activity));
            return res.json(activity);
    },
    /**
     * Find all activities filtered by keyword & zip_code (postal code)
     * @param {*} req 
     * @param {*} res 
     * @returns an array of objects containing activities
     */
    async getAllByKeyword(req, res){
        const activities = await activityDatamapper.findByKeyword(req.body);
        return res.json(activities);
    },
    /**
     * Find all activities by the current organism connected
     * @param {*} req 
     * @param {*} res 
     */
    async getOrganismActivities(req, res) {
        const activities = await activityDatamapper.findActivitiesByOrganism(req.decodedToken.email);
        try {
            res.json(activities);
        } catch (error) {
            res.json({error: error.message});
            throw new customApiError(err.message, 400);
        }
    },
    /**
     * Create one activty by the current organism connected
     * @param {*} req
     * @param {*} res 
     */
    async postOneActivity(req, res) {
        try {
            const activityExist = await activityDatamapper.findByName(req.body.name);

            if(activityExist) { // if the activity already exists = error
                res.json({error: `Activity ${activityExist.name} already exists`});
                throw new Error(`Activity ${activityExist.name} already exists`);

            }else {
                const activityWihoutDay = {
                    name: req.body.name,
                    description: req.body.description,
                    address: req.body.address,
                    zip_code: req.body.zip_code,
                    city: req.body.city,
                    price: req.body.price,
                    price_type: req.body.price_type,
                    gender: req.body.gender,
                    level: req.body.level,
                    image_url: req.body.image_url
                };
                const day = {
                    name: req.body.day,
                    start_time: req.body.start_time,
                    end_time: req.body.end_time
                };
                await activityDatamapper.createActivity(activityWihoutDay, req.decodedToken.email);
                const currActivity = await activityDatamapper.findByName(req.body.name);

                await dayDatamapper.createDay(day, currActivity.code_activity);
                res.json({message: `Activity ${req.body.name} created`});
            }
            
        } catch (err) {
            res.json({error: err.message});
            throw new customApiError(err.message, 400);
        }
    },
    /**
     * Remove one activity by the current organism connected
     * @param {*} req
     * @param {*} res 
     */
    async deleteOneActivity(req, res){
        const currActivity = req.params.id;
        const activityToDelete = await activityDatamapper.findByPk(currActivity);

        try {
            if(activityToDelete){
                await activityDatamapper.deleteActivityByPk(currActivity, req.decodedToken.email);
                res.json({message: `Activity with id (${currActivity}) deleted`}); 
            }else {
                throw new Error(`Activity with id (${currActivity}) is not exists or already deleted`);
            }
                     
            
         } catch (err) {
             res.json({"error": err.message});
             throw new customApiError(err.message, 400);
         }
    },
    /**
     * Update one activity by the current organism connected & current activity ID
     * @param {*} req 
     * @param {*} res 
     */
    async updateOneActivity(req, res) {
        const activityId = req.params.id
        const activityToUpdate = {
            name: req.body.name,
            description: req.body.description,
            address: req.body.address,
            zip_code: req.body.zip_code,
            city: req.body.city,
            price: req.body.price,
            price_type: req.body.price_type,
            gender: req.body.gender,
            level: req.body.level,
            image_url: req.body.image_url
        };
        const dayToUpdate = {
            name: req.body.day,
            start_time: req.body.start_time,
            end_time: req.body.end_time
        };
        try {
            await activityDatamapper.updateActivity(activityToUpdate, req.decodedToken.email, activityId);
            await dayDatamapper.updateDay(dayToUpdate, activityId);
                res.json({message: `Activity with id ${activityId} updated`});
        } catch (err) {
            res.json({error: err.message});
            throw new customApiError(err.message, 400);
        }
    }

}