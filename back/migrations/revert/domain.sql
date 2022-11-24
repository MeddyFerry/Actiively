-- Revert actiively:domain from pg

BEGIN;
ALTER TABLE organism
    ALTER COLUMN email TYPE VARCHAR(128),
    ALTER COLUMN contact_email TYPE VARCHAR(128);

ALTER TABLE activity
    ALTER COLUMN pk_organism TYPE VARCHAR(128);

DROP DOMAIN domain_email;


COMMIT;
