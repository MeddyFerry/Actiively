const joi = require('joi');
const daySchema = joi.object({
    
});
module.exports = joi.object({
    name: joi.string().min(3).max(128).required(),
    description: joi.string().required(),
    address: joi.string().required(),
    zip_code: joi.string().required().pattern(new RegExp('^[0-9]{2,5}$')),
    city: joi.string().required().min(3).max(128),
    price: joi.string().required().min(1),
    price_type: joi.string().required().min(3).max(128),
    gender: joi.string().required().min(3).max(128),
    level: joi.string().required().min(3).max(128),
    image_url: joi.string().required(),
    day: joi.string().required(),
    start_time: joi.string().required(),
    end_time: joi.string().required()
})