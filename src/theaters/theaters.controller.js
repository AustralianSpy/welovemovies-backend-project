const service = require('./theaters.service');
const asyncErrorBoundary =  require('../errors/asyncErrorBoundary');

async function list(req, res) {
    // Request list of all theaters.
    const theaters = await service.list();

    // For each theater, request list of movies playing at theater.
    // Add array to theater object with key 'movies'.
    for (let theater of theaters) {
        const movies = await service.listShowingMovies(theater.theater_id);
        theater['movies'] = movies;
    }
    res.json({ data: theaters });
}

module.exports = {
    list: asyncErrorBoundary(list),
};