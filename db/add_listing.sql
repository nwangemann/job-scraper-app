INSERT INTO jobs
<<<<<<< HEAD
(user_id, title, company, description, location, date, link)
VALUES
($1, $2, $3, $4, $5, $6, $7);
=======
(user_id, title, company, description, location, date, link, website)
VALUES
($1, $2, $3, $4, $5, $6, $7, $8);
>>>>>>> fdc288e5ab8455e7de00543e2377e247054a2fb7

SELECT * FROM jobs
WHERE user_id = $1;