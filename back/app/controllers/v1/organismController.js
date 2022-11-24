const organismDatamapper =  require('../../models/v1/organism');
const activityDatamapper =  require('../../models/v1/activity');
const dayDatamapper = require('../../models/v1/day');

const customApiError = require('../../errors/apiErrors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {createTokens} = require('../../middlewares/JWT');

module.exports = {
    /**
     * Create a new organism & hashing the password
     * @param {*} req 
     * @param {*} res 
     */
    async register(req, res) {
        const { email, name, password, description, contact_email, phone_number } = req.body;

        try {
                let organismHashed = await bcrypt.hash(password, 10).then((hash) => {
                    return organismWithHashedPassword = {
                        "email": email,
                        "name": name,
                        "password": hash,
                        "description": description,
                        "contact_email": contact_email,
                        "phone_number": phone_number
                        };
                    }) 
                    await organismDatamapper.createOrganism(organismHashed)
                    res.status(200).json({message: `Organism with email ${organismHashed.email} successfully created !`})

        } catch(err) {
            throw new customApiError(err.message, 400)
        }

    },
    /**
     * Login an organism with the given email and password
     * @param {*} req
     * @param {*} res 
     */
    async login(req, res) {
        const { email, password } = req.body;
        

        try {
            const organism = await organismDatamapper.findOneOrganism(email);
            const dbPassword = organism.password;

            await bcrypt.compare(password, dbPassword)
            .then((match) => {
                if(match){
                    const accessToken = createTokens(organism);
                    // res.cookie("access_token", accessToken, {
                    //     maxAge: 300000,
                    //     httpOnly: true
                    // });
                    res.json({
                        authenticated: true,
                        token: accessToken,
                        message: "Authentication Successful."})                    
                }else {
                    throw new Error('Wrong password and email combination!')
                }
            });
            req.user = organism

        } catch (err) {
            res.json({error: 'Wrong password and email combination'})
            throw new customApiError(err.message, 400)
        }
    },
    /**
     * Access to the organism profile
     * @param {*} req 
     * @param {*} res 
     */
    async profile(req, res) {
        const organism = await organismDatamapper.findOneOrganism(req.decodedToken.email);

        res.json({message: 'PROFILE', connected: req.authenticated, user: organism});
    },
    /**
     * Update the current organism profile
     * @param {*} req 
     * @param {*} res 
     */
    async updateProfile(req, res) {
        const organismProfil = req.body;
        try {
            await organismDatamapper.updateProfile(organismProfil, req.decodedToken.email);
            res.json({message: 'Profile Updated'});
            
        } catch (err) {
            res.json({error: err.message})
            throw new customApiError(err.message, 400)
        }
    },
    /**
     * Remove the current organism
     * @param {*} req 
     * @param {*} res 
     */
    async deleteProfile(req, res) {
        const currOrganism = req.decodedToken.email;
        try {
            await activityDatamapper.deleteAllActivities(currOrganism);
            await organismDatamapper.deleteProfile(currOrganism);
            res.json({message: 'Profile deleted with all activities related'});
        } catch (err) {
            res.json({error: err.message});
            throw new customApiError(err.message, 400)
        }
    }
            
}
