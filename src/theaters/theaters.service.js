const knex = require('../db/connection');

// Queries for list of all theaters.
function list() {
    return knex('theaters').select('*');
}

// Queries for list of all movies playing at a particular theater.
// Makes use of movies_theaters JOIN table.
function listShowingMovies(theaterId) {
    return knex('movies_theaters AS mt')
        .join('movies AS m', 'mt.movie_id', 'm.movie_id')
        .where({ 'mt.theater_id': theaterId })
        .select('m*')
        .where('mt.is_showing', true)
}

module.exports = {
    list,
    listShowingMovies,
};