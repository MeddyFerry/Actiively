Selecitoner une activité avec le nom tennis qui est sous 30€ le Samedi

```sql
    SELECT * FROM activity
    JOIN day ON pk_activity = code_activity
    WHERE activity.name LIKE 'Tenn%' 
    AND price < 30 
    AND day.name LIKE 'Samedi%'
```

Selecitoner des activités rendu en dans un array en json
Via json_agg & row_to_json

```sql
SELECT json_agg(row_to_json(activity))
      FROM (
          SELECT name, price from "activity"
      ) activity
```

Selecitoner des activités rendu en dans un array en json filter par type d'activité & code postal

```sql
SELECT json_agg(row_to_json(activity))
      FROM (
          SELECT a.name, a.zip_code, d.name as day, a.price, a.price_type from "activity" a
		  JOIN day d ON pk_activity = code_activity
		  WHERE a.name SIMILAR TO 'Tennis%'
		  AND a.zip_code = 75016
      ) activity

```
Returns

```json
[
  {
    "name": "Tennis - Organization 1",
    "zip_code": 75016,
    "day": "Samedi",
    "price": 20,
    "price_type": "La scéance"
  }
]

```

Selecitoner une activité by ID, avec les infos de l'organisme qui l'a crée

```sql

SELECT json_agg(row_to_json(activity))
	FROM (
		SELECT 
            a.name, a.address, a.zip_code, d.name as day, d.start_time, d.end_time, a.price, a.price_type, a.gender, a.level, a.description,
		    json_build_object('email', o.contact_email, 'phone', o.phone_number, 'organism_description', o.description) as organism_infos 
        FROM activity a
		    JOIN day d ON pk_activity = code_activity
		    JOIN organism o ON pk_activity = code_activity
		WHERE code_activity = 2
		LIMIT 1
	) activity
```

Returns

```json
[
  {
    "name": "Danse - Organization 2",
    "address": "23 rue de la danse",
    "zip_code": 29200,
    "day": "Mardi",
    "start_time": "20H00",
    "end_time": "22H00",
    "price": 15,
    "price_type": "La scéance",
    "gender": "Mixte",
    "level": "Confirmé",
    "description": "Danse blablabla",
    "organism_infos": {
      "email": "email@sindresorhus.com",
      "phone": "070203",
      "organism_description": "description of organization"
    }
  }
]

```
