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
}

module.exports = {
    read,
    update,
};