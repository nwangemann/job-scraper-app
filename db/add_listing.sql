INSERT INTO jobs
(user_id, title, company, description, location, date, link, website)
VALUES
($1, $2, $3, $4, $5, $6, $7, $8);

SELECT * FROM jobs
WHERE user_id = $1;