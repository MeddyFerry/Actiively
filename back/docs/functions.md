Save des functions qui ne sert plus

```sql


BEGIN;

CREATE FUNCTION create_organism(json) RETURNS organism AS $$

    INSERT INTO "organism"
    ("email", "name", "password", "description", "contact_email", "phone_number") VALUES
    (
        $1->>'email', 
        $1->>'name', 
        $1->>'password', 
        $1->>'description', 
        $1->>'contact_email', 
        $1->>'phone_number'
        
    )
    RETURNING *;

$$ LANGUAGE sql;

CREATE FUNCTION create_activity(json) RETURNS activity AS $$
    INSERT INTO activity
    ("name","description", "address", "zip_code", "city", "price", "price_type", "gender", "level", "pk_organism") VALUES
    (
        $1->>'name', 
        $1->>'description', 
        $1->>'address', 
        $1->>'zip_code',
        $1->>'city',
        $1->>'price',
        $1->>'price_type',
        $1->>'gender',
        $1->>'level',
        $1->>'pk_organism'

    )RETURING *;

$$ LANGUAGE sql;

CREATE FUNCTION update_organism(json) RETURNS organism AS $$

    UPDATE "organism" SET
        'email' = $1->>'email', 
        'name' = $1->>'name', 
        'password' = $1->>'password', 
        'description' = $1->>'description', 
        'contact_email' = $1->>'contact_email', 
        'phone_number' = $1->>'phone_number'
        WHERE "email" = ($1->>'email')::character varying(128)
     RETURING *;

$$ LANGUAGE sql;

CREATE FUNCTION update_activity(json) RETURNS activity AS $$

    UPDATE activity SET
        'name' = $1->>'name', 
        'description' = $1->>'description', 
        'address' = $1->>'address', 
        'zip_code' = $1->>'zip_code',
        'city' = $1->>'city',
        'price' = $1->>'price',
        'price_type' = $1->>'price_type',
        'gender' = $1->>'gender',
        'level' = $1->>'level',
        'pk_organism' = $1->>'pk_organism'
        WHERE code_activity = ($1->>'code_activity')::int
     RETURING *;

$$ LANGUAGE sql;

CREATE FUNCTION create_date(json) RETURNS "day" AS $$
    INSERT INTO "day"
    ("name", "start_time", "end_time", "pk_activity") VALUES
    (
        $1->>'name',
        $1->>'start_time',
        $1->>'end_time', 
        $1->>'pk_activity'
    ) 
    RETURING *;

$$ LANGUAGE sql;

CREATE FUNCTION update_date(json) RETURNS "day" AS $$

    UPDATE "day" SET
        'name' = $1->>'name',
        'start_time' = $1->>'start_time',
        'end_time' = $1->>'end_time', 
        'pk_activity' = $1->>'pk_activity'
        WHERE 'pk_activity' = ($1->>'pk_activity')::int
     RETURING *;

$$ LANGUAGE sql;


COMMIT;



```