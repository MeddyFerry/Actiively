const client = require('../../config/db');

module.exports = {
    /**
     * Find one activity by code_activity
     * @typedef {object} Activity
     * @param {integer} id code_activity
     * @return {object} object
     */
    async findByPk(id){
        const result = await client.query(`
            SELECT 
                a.name, a.address, a.code_activity, a.zip_code, a.city, d.name as day, d.start_time, d.end_time, a.price, a.price_type, a.gender, a.level, a.description, a.image_url,
                json_build_object('email', o.contact_email,'name', o.name, 'phone_number', o.phone_number, 'organism_description', o.description) as organism_infos 
            FROM activity a
                JOIN day d ON pk_activity = code_activity
                JOIN organism o ON pk_organism = o.email
            WHERE code_activity = ($1)
            LIMIT 1
        `, [id]);

        return result.rows[0]
    },
    /**
     * lists of activities filtered by keyword and zip code
     * @typedef {object} Activities
     * @param q request body
     */
     async findByKeyword(q){
        const result = await client.query(`
            SELECT a.code_activity, a.name as activity_name, o.name as organism_name, a.zip_code, a.city, d.name as day, a.price, a.price_type, a.gender, a.level, a.image_url from "activity" a
            JOIN day d ON pk_activity = code_activity
            JOIN organism o ON pk_organism = o.email
            WHERE a.name SIMILAR TO ($1)
            AND a.zip_code SIMILAR TO ($2)
        `, [q.keyword, q.zip_code]);
        return result.rows
    },

        /**
     * Find one activity by name
     * @param {string} name
     */
         async findByName(name){
            const result = await client.query(`
                SELECT 
                    a.name, a.code_activity
                FROM activity a
                WHERE a.name = ($1)
                LIMIT 1
            `, [name]);
    
            return result.rows[0]
        },
        /**
     * Remove one activity by id & email
     * @param {number} activity id
     * @param {string} email
     */
        async deleteActivityByPk(id, email) {
            await client.query(`
                DELETE FROM "activity" CASCADE
                WHERE code_activity = $1
                AND pk_organism = $2
            `, [id, email]);
        },
     /** Remove all activities / day related by email, from one organism
     * @param {string} email
     */
        async deleteAllActivities(email) {
            await client.query(`
                DELETE FROM "activity" CASCADE
                WHERE pk_organism = $1
            `, [email]);
        },
     /** Find all activities by organism
     * @param {string} email of the organism
     */
        async findActivitiesByOrganism(email) {
            const result = await client.query(`
                SELECT 
                    a.code_activity, a.name, a.address, a.zip_code, a.city, d.name as day, d.start_time, d.end_time, a.price, a.price_type, a.gender, a.level, a.description, a.image_url,
                    json_build_object('email', o.contact_email,'name', o.name, 'phone_number', o.phone_number, 'organism_description', o.description) as organism_infos 
                FROM activity a
                    JOIN day d ON pk_activity = code_activity
                    JOIN organism o ON pk_organism = o.email
                WHERE o.email = ($1)
            `, [email]);
            return result.rows;
        },
     /** Find one activity by code_activity / email
      * @param {number} id
     * @param {string} email of the organism
     */
        async findActivityByOrganism(id,email) {
            const result = await client.query(`
                SELECT 
                    a.code_activity, a.name, a.address, a.zip_code, a.city, d.name as day, d.start_time, d.end_time, a.price, a.price_type, a.gender, a.level, a.description, a.image_url,
                    json_build_object('email', o.contact_email,'name', o.name, 'phone_number', o.phone_number, 'organism_description', o.description) as organism_infos 
                FROM activity a
                    JOIN day d ON pk_activity = code_activity
                    JOIN organism o ON pk_organism = o.email
                WHERE o.email = $2
                AND a.code_activity = $1
            `, [id, email]);
            return result.rows;
        },
         /** Create one activity by organism
        * @param {object} activity
        * @param {string} email
        */
        async createActivity(activity, email) {
            const activityQuery = await client.query(`
                INSERT INTO "activity"
                    ("name", 
                    "description", 
                    "address", 
                    "zip_code", 
                    "city", 
                    "price", 
                    "price_type", 
                    "gender", 
                    "level",
                    "image_url", 
                    "pk_organism")
                VALUES
                    ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
                RETURNING *
            `, [
                activity.name,
                activity.description, 
                activity.address, 
                activity.zip_code,
                activity.city,
                activity.price,
                activity.price_type,
                activity.gender,
                activity.level,
                activity.image_url,
                email
            ]);
    
            return activityQuery.rows[0];
        },
        /** Update one activity by organism, code_activity
         * @param {object} activity req.body
         * @property {string} pk_organism
         * @property {number} code_activity
         * 
        */
        async updateActivity(activity, pk_organism, code_activity) {
            
            await client.query(`
                UPDATE activity
                    SET name= COALESCE(NULLIF($1,''), name),
                        description= COALESCE(NULLIF($2, ''), description),
                        address= COALESCE(NULLIF($3,''), address),
                        zip_code= COALESCE(NULLIF($4,''), zip_code),
                        city= COALESCE(NULLIF($5,''), city),
                        price= COALESCE(NULLIF($6,''), price),
                        price_type= COALESCE(NULLIF($7,''), price_type),
                        gender= COALESCE(NULLIF($8,''), gender),
                        level= COALESCE(NULLIF($9,''), level),
                        image_url= COALESCE(NULLIF($10,''), image_url)
                    WHERE pk_organism = $11
                    AND code_activity = $12
            `,[
                activity.name,
                activity.description, 
                activity.address, 
                activity.zip_code,
                activity.city,
                activity.price,
                activity.price_type,
                activity.gender,
                activity.level,
                activity.image_url,
                pk_organism,
                code_activity
            ]);
        }
}