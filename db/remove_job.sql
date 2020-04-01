DELETE FROM jobs
WHERE job_id = $1;

SELECT * FROM jobs
WHERE user_id = $2;