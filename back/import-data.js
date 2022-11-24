// Cela marche même si le script n'est pas à la racine avec le .env
// car ce script est lancé avec npm run import
// Donc comme s'il était à la racine
require('dotenv').config();

const { Client } = require('pg');
const debug = require('debug')('import:log');

// On récupère les données de base
const organism = require('./data/organism.json');
const activity = require('./data/activity.json');
const days = require('./data/days.json');

// Pour pouvoir utiliser await je dois être dans une fonction  async et pas dans
// le flux principal du programme.
// Je créé donc une IIFE ( immediatly Invoked Function Expression ) async
// c'est à dire (une fonction exécuté aussi tôt quelle est déclaré)
// c'est l'équivalent de
// function async processImport() { ... }
// await processImport();
(async () => {
    const client = new Client();
    await client.connect();

    debug('Client connected');

    debug('Clean table');

    /**
     * Il faut penser à vider les tables avant de réécrire les données
     * cela nous simplifiera la vie.
     * On utilise TRUNCATE TABLE plutôt que DELETE FROM
     * car c'est bien plus rapide
     * TRUNCATE TABLE ne vérifie par chaque enregistrement avant de le supprimer,
     * et en bonus on peut préciser plusieurs
     * table en même temps comme DROP TABLE.
     * Cela permet de s'affranchir de contraintes de clé étrangères !!
     * Donc ici l'ordre des tables n'est pas important
     * RESTART IDENTITY (optionnel) permet de reset de la numérotation des colonnes IDENTITY
     */
    await client.query('TRUNCATE TABLE organism, activity, day');

    // On prépare un objet qui permettra de référencer
    // l'ensemble de requêtes d'insertion des catégories
    const organismQueries = [];

   
    organism.forEach((organism) => {
        debug('Processing organism:', organism.email);
        const query = client.query(
            `
                INSERT INTO "organism"
                ("email", "name", "password", "description", contact_email, "phone_number")
                VALUES
                ($1, $2, $3, $4, $5, $6)
                RETURNING *
            `,
            [organism.email, organism.name, organism.password, organism.description, organism.contact_email, organism.phone_number],
        );
        organismQueries.push(query);
    });

    const results = await Promise.all(organismQueries);

    // On stocke les catégories dans un tableau de référence
    const organismRows = results.map((result) => result.rows[0]);

    // Pour chaque activity on genère une requête,
    // dont on va stocker la promesse d'exécution dans un tableau
    const activityQueries = [];
    activity.forEach((acti) => {
        debug('Processing activity:', acti.code_activity);

        // Seconde syntaxe pour les requêtes : la requête 'objet'
        const insertactivityQuery = {
            // ci dessous un exemple de INSERT avec une subquery
            // Pour aller chercher une donnée qui nous manque
            text: `
                INSERT INTO activity
                (name, description, address, zip_code, city, price, price_type, gender, level, image_url, pk_organism)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10,(
                   SELECT email FROM organism WHERE email = $11
                )) RETURNING *
            `,
            values: [
                acti.name,
                acti.description,
                acti.address,
                acti.zip_code,
                acti.city,
                acti.price,
                acti.price_type,
                acti.gender,
                acti.level,
                acti.image_url,
                acti.pk_organism
            ]
        };

        const query = client.query(insertactivityQuery);
        activityQueries.push(query);
    });

    // Un fois toutes les executions de requête créer
    // on les resolve toutes en même temps, et il ne faut qu'aucune ne soit en échec
    await Promise.all(activityQueries);

    const dayQueries = [];
    days.forEach((day) => {
        debug('Processing activity:', day.code_day);

        // Seconde syntaxe pour les requêtes : la requête 'objet'
        const insertdayQuery = {
            // ci dessous un exemple de INSERT avec une subquery
            // Pour aller chercher une donnée qui nous manque
            text: `
                INSERT INTO day
                (name, start_time, end_time, pk_activity)
                VALUES ($1, $2, $3, (
                   SELECT code_activity FROM activity WHERE code_activity = $4
                )) RETURNING *
            `,
            values: [
                day.name,
                day.start_time,
                day.end_time,
                day.pk_activity
            ]
        };

        const query = client.query(insertdayQuery);
        dayQueries.push(query);
    });

    // Un fois toutes les executions de requête créer
    // on les resolve toutes en même temps, et il ne faut qu'aucune ne soit en échec
    await Promise.all(dayQueries);

    debug('Done');

    // On oubli pas de fermer la connection à la BDD une fois le travail terminé
    client.end();
})();
