CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(180),
    email VARCHAR(180),
    img TEXT,
    auth_id TEXT
)
