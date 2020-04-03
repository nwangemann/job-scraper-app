DELETE FROM jobs
WHERE jobs_id = $1;

SELECT * FROM jobs
WHERE user_id = $2;