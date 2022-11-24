-- Deploy actiively:references to pg

BEGIN;
    ALTER TABLE "day"
        ADD CONSTRAINT pk_activity FOREIGN KEY (pk_activity) REFERENCES "activity" (code_activity);

    ALTER TABLE "activity"
        ADD CONSTRAINT pk_organism FOREIGN KEY (pk_organism) REFERENCES "organism" (email);

COMMIT;
