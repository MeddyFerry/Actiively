-- Deploy actiively:index to pg

BEGIN;

CREATE INDEX index_organism
ON organism (email, name, description);

CREATE INDEX index_activity
ON activity (name, description, city, price);

COMMIT;
