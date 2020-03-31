UPDATE users
SET email = $1
WHERE user_id = $2;

SELECT * FROM users
WHERE email = $1;