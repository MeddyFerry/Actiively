-- Deploy actiively:domain to pg

BEGIN;

CREATE DOMAIN domain_email AS VARCHAR(128)
CHECK(
   VALUE ~ '^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$'
);

ALTER TABLE organism
    ALTER COLUMN email TYPE domain_email,
    ALTER COLUMN contact_email TYPE domain_email;

ALTER TABLE activity
    ALTER COLUMN pk_organism TYPE domain_email;

COMMIT;
