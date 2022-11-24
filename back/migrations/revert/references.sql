-- Revert actiively:references from pg

BEGIN;
ALTER TABLE "day" DROP CONSTRAINT pk_activity;
ALTER TABLE "activity" DROP CONSTRAINT pk_organism;


COMMIT;