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

// Middleware to check that a movie exists before making further queries.
async function movieExists(req, res, next) {
    const { movieId } = req.params;

    const movie = await service.read(movieId);
    if (movie) {
        res.locals.movie = movie;
        next();
    } else {
        return next({ status: 404, message: 'Movie cannot be found.' });
    }
}

// Return information on a single retrieved movie.
async function read(req, res) {
    const { movie } = res.locals;
    res.json({ data: movie });
}

// TODO: Returns list of all theaters where a movie is showing.
async function listTheaters(req, res, next) {
    const { movie } = res.locals;
    const theaters = await service.listTheaters(movie.movie_id);
    res.json({ data: theaters });
}

// TODO: Returns list of all reviews for a movie.
async function listReviews(req, res) {
    const { movie } = res.locals;
    
    // Request list of all reviews.
    const reviews = await service.listReviews(movie.movie_id);

    // For each review, request information of associated critic.
    // Add array to review object with key 'critic'.
    for (let review of reviews) {
        const critic = await service.listCritics(review.review_id);
        review['critic'] = critic[0];
    }
    res.json({ data: reviews });
}

module.exports = {
    list: asyncErrorBoundary(list),
    read: [
        asyncErrorBoundary(movieExists),
        asyncErrorBoundary(read),
    ],
    listTheaters: [
        asyncErrorBoundary(movieExists),
        asyncErrorBoundary(listTheaters),
    ],
    listReviews: [
        asyncErrorBoundary(movieExists),
        asyncErrorBoundary(listReviews),
    ],
};