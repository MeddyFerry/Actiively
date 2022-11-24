-- Revert actiively:index from pg

BEGIN;

DROP INDEX index_organism;

DROP INDEX index_activity;

COMMIT;