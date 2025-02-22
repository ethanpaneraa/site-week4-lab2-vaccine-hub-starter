CREATE TABLE users (

    id SERIAL PRIMARY KEY,
    password TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE CHECK (POSITION('@' IN EMAIL) > 1),
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    location TEXT NOT NULL,
    date TIMESTAMP NOT NULL DEFAULT NOW()

);