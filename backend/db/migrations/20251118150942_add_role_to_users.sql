-- migrate:up
CREATE TYPE user_role AS ENUM ('admin', 'user');
ALTER TABLE users ADD COLUMN role user_role NOT NULL DEFAULT 'user';

-- migrate:down
DROP TYPE IF EXISTS user_roles;
ALTER TABLE users DROP COLUMN role;
