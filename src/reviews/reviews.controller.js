const service = require('./reviews.service');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');

// Middleware to check to make sure a review exists before attempting
// update or deletion.
async function reviewExists(req, res, next) {
    const { reviewId } = req.params;
    const review = await service.read(reviewId);

    if (review) {
        res.locals.review = review;
        return next();
    }
    next({ status: 404, message: 'Review cannot be found.'});
}

// Middleware validation for properties being update.
function hasValidProperties(req, res, next) {
    const VALID_PROPERTIES = ['content', 'score'];
    const { data = {} } = req.body;

    const invalidProperties = Object.keys(data).filter(
        (field) => !VALID_PROPERTIES.includes(field)
      );
    
    if (invalidProperties.length) {
        return next({ status: 400, message: 'Invalid properties.' });
    }
    next();
}

// TODO: function to update a review based upon a given id.
async function update(req, res) {
    const { review } = res.locals;
    const updatedReview = req.body;
    const response = await service.update(updatedReview);
    const critic = await service.listCritics(review.review_id);
    response['critic'] = critic;
    res.json({ data: response });
}


module.exports = {
    update: [
        asyncErrorBoundary(reviewExists),
        asyncErrorBoundary(hasValidProperties),
        asyncErrorBoundary(update)
    ],
};