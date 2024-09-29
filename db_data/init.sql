-- Temporary test CREATE and INSERT statements to test initialisation of PG DB on container run

CREATE TABLE country (name text, currency text, country text);
INSERT INTO country(name, currency, country) VALUES ('Japan', 'Yen', 'Japan');