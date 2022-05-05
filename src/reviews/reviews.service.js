const knex = require('../db/connection');

// TODO: a READ function to locate a review by a given id.
// Used for middleware function in controller.
function read(review_id) {
    return knex('reviews')
        .select('*')
        .where({ review_id })
        .first();
}

function update(updatedReview) {
    return knex('reviews')
        .select('*')
        .where({ review_id: updatedReview.review_id })
        .update(updatedReview, '*')
        .then((updated) => updated[0]);
}

// TODO: retrieve list of reviews for a movie, given an id. Must include critic details.
function list(movieId) {
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
    read,
    update,
    list,
    listCritics,
};