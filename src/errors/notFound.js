// To handle 'not found' routes in Express.

function notFound(req, res, next) {
    next({ status: 404, message: `Path not found: ${req.originalUrl}.` });
}

module.exports = notFound;