-- Deploy actiively:init_db to pg

BEGIN;

CREATE TABLE
    "organism" (
        email character varying(128) NOT NULL PRIMARY KEY UNIQUE,
        name character varying(128) NOT NULL,
        password character varying(128) NOT NULL,
        description text NOT NULL,
        contact_email character varying(256) NOT NULL,
        phone_number character varying(128)
    );

CREATE TABLE
    "day" (
        code_day INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        name character varying(128) NOT NULL,
        start_time character varying(128),
        end_time character varying(128),
        pk_activity integer NOT NULL;
    );

CREATE TABLE
    "activity" (
        code_activity INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        name character varying(128) NOT NULL,
        description text NOT NULL,
        address text NOT NULL,
        zip_code character varying(16) NOT NULL,
        city character varying(128) NOT NULL,
        price numeric NOT NULL,
        price_type character varying(128) NOT NULL,
        gender character varying(128) NOT NULL,
        level character varying(128) NOT NULL,
        pk_organism character varying(128) NOT NULL,
        image_url TEXT NOT NULL
    );



COMMIT;