const knex = require('../db/connection');

// Fetches list of all movies.
function list() {
    return knex('movies').select('*');
}

// Function listing only movies currently showing.
// References movies_theaters join table.
// Must be distinct to prevent per-theater duplicants.
function listShowing() {
    return knex('movies AS m')
        .join('movies_theaters AS mt', 'm.movie_id', 'mt.movie_id')
        .distinct('mt.movie_id')
        .select('m.*')
        .where('mt.is_showing', true);
}

module.exports = {
    list,
    listShowing,
}