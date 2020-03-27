INSERT INTO users (email, password)
VALUES 
($1, $2);

SELECT * FROM users
WHERE email = $1;