const knex = require('../db/connection');

// Locates a review by a given id for middleware function in controller.
function read(review_id) {
    return knex('reviews')
        .select('*')
        .where({ review_id })
        .first();
}

// Update a pre-existing review.
function update(updatedReview) {
    return knex('reviews')
        .select('*')
        .where({ review_id: updatedReview.review_id })
        .update(updatedReview);
}

// Retrieve list of reviews for a movie, given an id. Must include critic details.
function list(movieId) {
    return knex('reviews')
        .select('*')
        .where({ movie_id: movieId });
}

// Retrieve critic associated with a review.
function listCritics(critic_id) {
    return knex('critics')
        .select('*')
        .where({ critic_id })
        .then((critics) => critics[0]);
}

module.exports = {
    read,
    update,
    list,
    listCritics,
};