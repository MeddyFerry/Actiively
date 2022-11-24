const joi = require('joi');

module.exports = joi.object({
    email: joi.string().pattern(new RegExp('(.+)@(.+){2,}\.(.+){2,}')).required(),
    password: joi.string().min(3).max(128).required().pattern(new RegExp('^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$'))
});