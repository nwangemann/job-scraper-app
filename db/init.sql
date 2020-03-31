
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    password TEXT NOT NULL,
    email VARCHAR(50) NOT NULL,
);

CREATE TABLE jobs (
    jobs_id SERIAL PRIMARY KEY,
    title TEXT,
    company VARCHAR(50),
    description TEXT,
    location TEXT,
    salary INT,
    user_id INT REFERENCES users(user_id)
);


-- updating column

UPDATE users
SET email = $1
WHERE user_id = $2;

UPDATE users
SET password = $1
WHERE user_id = $2;