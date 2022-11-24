psql -U actiively -d actiively -f ./revert/init_db.sql
psql -U actiively -d actiively -f ./revert/references.sql
psql -U actiively -d actiively -f ./revert/index.sql
psql -U actiively -d actiively -f ./revert/domain.sql

node ../../import_data.js