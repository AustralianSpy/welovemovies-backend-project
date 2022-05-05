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
        (field) => !VALID_PROPERTIES.includes(field) || !field.length
      );
    
    if (invalidProperties.length) {
        return next({ status: 400, message: 'Invalid properties.' });
    }
    next();
}

// Function to update a review based upon a given id.
async function update(req, res) {
    const { review_id } = res.locals.review;
    const updatedReview = {
        ...req.body.data,
        'review_id': review_id,
    };
    
    // Process update then request newest version of review
    // with critic information.
    await service.update(updatedReview);
    const response = await service.read(review_id);
    const review = {
        ...response,
        'critic': await service.listCritics(res.locals.review.critic_id),
    };
    res.json({ data: review });
}

// Function to delete an existing review.
async function destroy(req, res) {
    const { review_id } = res.locals.review;
    await service.delete(review_id);
    res.sendStatus(204);
}


module.exports = {
    update: [
        asyncErrorBoundary(reviewExists),
        asyncErrorBoundary(hasValidProperties),
        asyncErrorBoundary(update),
    ],
    delete: [
        asyncErrorBoundary(reviewExists),
        asyncErrorBoundary(destroy),
    ],
};