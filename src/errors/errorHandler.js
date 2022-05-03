// Handle errors in Express.

function errorHandler(err, req, res, next) {
    // Default values for error unless specific error occurrence.
    const { status = 500, message = `Something went wrong!`} = err;
    res.status(status).json({ error: message });
}

module.exports = errorHandler;