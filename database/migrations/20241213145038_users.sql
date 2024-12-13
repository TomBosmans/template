-- migrate:up
CREATE TABLE users (
    id serial PRIMARY KEY,
    user_name varchar(50) NOT NULL,
    email varchar(100) NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP
);

-- migrate:down
DROP TABLE users;
