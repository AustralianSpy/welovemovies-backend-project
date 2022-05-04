const knex = require('../db/connection');

// List of all movies.
function list() {
    return knex('movies').select('*');
}

// Lists only movies currently showing.
// References movies_theaters join table.
// Must be distinct to prevent per-theater duplicants.
function listShowing() {
    return knex('movies AS m')
        .join('movies_theaters AS mt', 'm.movie_id', 'mt.movie_id')
        .distinct('mt.movie_id')
        .select('m.*')
        .where('mt.is_showing', true);
}

// Responds with all information about a single movie, given an id.
function read(movieId) {
    return knex('movies')
        .select('*')
        .where({ movie_id: movieId })
        .first();
}

// TODO: retrieve list of theaters where a movie is playing, given an id.
function listTheaters(movieId) {
    return knex('movies AS m')
        .join('movies_theaters AS mt', 'm.movie_id', 'mt.movie_id')
        .join('theaters AS t', 'mt.theater_id', 't.theater_id')
        .select('t.*')
        .where({ 'mt.movie_id': movieId });
}

// TODO: retrieve list of reviews for a movie, given an id. Must include critic details.
function listReviews(movieId) {
    return knex('reviews')
        .select('*')
        .where({ movie_id: movieId });
}

function listCritics(reviewId) {
    return knex('reviews AS r')
    .join('critics AS c', 'r.critic_id', 'c.critic_id')
    .select('c.*')
    .where({ 'r.review_id': reviewId });
}

module.exports = {
    list,
    listShowing,
    read,
    listTheaters,
    listReviews,
    listCritics,
}