// Middleware to validate that a request has all required properties.
// Required properties passed in as parameter.

function hasProperties(...properties) {
    return function (res, req, next) {
        const { data = {} } = req.body;

        try {
            properties.forEach((property) => {
                const value = data[property];
                if (!value) {
                    const error = new Error(`A "${property}" property is required!`);
                    error.status = 400;
                    throw error;
                }
            });
        } catch (error) {
            next(error);
        }
    };
}

module.exports = hasProperties;