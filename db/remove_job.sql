DELETE FROM jobs
<<<<<<< HEAD
WHERE job_id = $1;
=======
WHERE jobs_id = $1;
>>>>>>> fdc288e5ab8455e7de00543e2377e247054a2fb7

SELECT * FROM jobs
WHERE user_id = $2;