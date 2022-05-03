const service = require('./theaters.service');
const asyncErrorBoundary =  require('../errors/asyncErrorBoundary');

/*
    TODO: currently returns a list of all theaters.
    Must also request a list of ALL MOVIES playing at the theater,
    add a key of 'movies' to the 'theaters' response, and reduce
    the 'movies' response down to an array that is added to the theater
    response.
*/
async function list(req, res) {
    const data = await service.list();
    res.json({ data });
}

module.exports = {
    list: asyncErrorBoundary(list),
};