const service = require('./movies.service');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');

async function list(req, res) {
    const { is_showing } = req.query;

    // Above checks if there is a query for movies that are showing
    // (true). If so, call listShowing query. Otherwise, return all.
    if (is_showing) {
        const movies = await service.listShowing();
        return res.json({ data: movies });
    } else {
        const movies = await service.list();
        return res.json({ data: movies });
    }
}


module.exports = {
    list: asyncErrorBoundary(list),
};