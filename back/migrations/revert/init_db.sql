-- Revert actiively:init_db from pg

BEGIN;

DROP TABLE "activity", "organism", "day" CASCADE;

COMMIT;