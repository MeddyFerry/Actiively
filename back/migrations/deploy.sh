psql -U actiively -d actiively -f ./deploy/init_db.sql
psql -U actiively -d actiively -f ./deploy/references.sql
psql -U actiively -d actiively -f ./deploy/index.sql
psql -U actiively -d actiively -f ./deploy/domain.sql

node ../import_data.js
