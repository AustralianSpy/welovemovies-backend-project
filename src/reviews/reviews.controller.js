const service = require('./reviews.service');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');

// TODO: middleware to check to make sure a review exists before attempting
//       update or deletion.
async function reviewExists(req, res, next) {
    const { reviewId } = req.params;
    const review = await service.read(reviewId);

    if (review) {
        res.locals.review = review;
        return next();
    }
    next({ status: 404, message: 'Review cannot be found.'});
}

// TODO: function to update a review based upon a given id.


module.exports = {
    update: [
        asyncErrorBoundary(reviewExists),
        asyncErrorBoundary(update)
    ],
};