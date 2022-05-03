const service = require('./movies.service');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');
const req = require('express/lib/request');

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

// Middleware to check that a movie exists before making further queries.
async function movieExists(req, res, next) {
    const { movieId } = req.params;

    const movie = await service.read(movieId);
    if (movie) {
        res.locals.movie = movie;
        next();
    }
    return next({ status: 404, message: 'Movie cannot be found.' });
}

// Return information on a single retrieved movie.
async function read(req, res) {
    const { movie } = res.locals;
    res.json({ data: movie });
}

module.exports = {
    list: asyncErrorBoundary(list),
    read: [
        asyncErrorBoundary(movieExists),
        asyncErrorBoundary(read),
    ],
};