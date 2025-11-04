-- migrate:up
CREATE TABLE sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  hashed_token TEXT NOT NULL,
  user_id UUID NOT NULL REFERENCES users(id),
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_sessions_hashed_token ON sessions (hashed_token);

-- migrate:down
DROP INDEX IF EXISTS idx_sessions_hashed_token;
DROP TABLE IF EXISTS sessions;
