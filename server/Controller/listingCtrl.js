module.exports = {
    getSavedListings: async (req, res, next) => {
        const db = req.app.get('db');
        const {user_id} = req.params
        const getAllListings = await db.get_all_listings(user_id)
        res.status(200).send(getAllListings)
    },
    saveListing: async (req, res, next) => {

    },
    deleteListing: async (req, res, next) => {

    },
    editListing: async (req, res, next) => {

    }
}