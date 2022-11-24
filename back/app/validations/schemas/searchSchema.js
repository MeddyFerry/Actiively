const joi = require('joi');

module.exports = joi.object({
    keyword: joi.string().allow('%').pattern(new RegExp('%$')),
    zip_code: joi.string().pattern(new RegExp('^[0-9]{2,5}(%)$')).required()
});