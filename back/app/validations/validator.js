const CustomApiError = require('../errors/apiErrors');

/**
 * validation of the current user schema,
 * if ok returns next() and go to the controller.
 * if not ok returns an custom api error
 * @param {*} schema 
 */
module.exports = function(schema) {
    return async function (req, res, next) {
        const dataToValidate = req.body
        
        try {
            await schema.validateAsync(dataToValidate);
            next();
        } catch (err) {
            next(new CustomApiError(err.message, 400))
        }
    };
};