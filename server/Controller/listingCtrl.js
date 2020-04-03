module.exports = {
    getSavedListings: async (req, res, next) => {
        const db = req.app.get('db');
        const {user_id} = req.params
        const getAllListings = await db.get_all_listings(user_id)
        res.status(200).send(getAllListings)
    },
    saveListing: async (req, res, next) => {
        const db = req.app.get('db');
        const {user_id} = req.params;
<<<<<<< HEAD
        const {title, link, company, location, description, date} = req.body
        const addListing = await db.add_listing([user_id, title, company, description, location, date, link]);
        res.status(200).send(addListing[0])
        
    },
    deleteListing: async (req, res, next) => {
        const db = req.app.get("db");
        const {job_id} = req.params;
        const {user_id} = req.body;
        const remove = await db.remove_job(job_id, user_id);
=======
        const {title, link, company, location, description, date, website} = req.body
        const addListing = await db.add_listing(user_id, title, company, description, location, date, link, website);
        res.status(200).send(addListing)

    },
    deleteListing: async (req, res, next) => {
        const db = req.app.get("db");
        const {jobs_id} = req.params;
        const {user_id} = req.body;
        const remove = await db.remove_job(jobs_id, user_id);
>>>>>>> fdc288e5ab8455e7de00543e2377e247054a2fb7
        res.status(200).send(remove)
    }
}