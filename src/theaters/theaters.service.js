const knex = require('../db/connection');
const reduceProperties = require('../utils/reduce-properties');

/*
    1) Query for all theaters from theaters table.
    2) Join with movies_theaters join table.
    3) Join with movies table to retrieve movies. 
    4) Group movies by theater_id. 
    5) Return ALL values for theaters, PLUS the movies.
*/

function list() {
    return knex('theaters AS t')
        .join('movies_theaters AS mt', 't.theater_id', 'mt.theater_id')
        .join('movies AS m', 'mt.movie_id', 'm.movie_id')
        .select('t.*', 'm.movie_id', 'm.title', 'm.rating')
        .where('mt.is_showing', true)
        .groupBy('m.movie_id')
        .then((output) => {
            const reduceMovies = reduceProperties('theater_id', {
                movie_id: ['movies', null, 'movie_id'],
                title: ['movies', null, 'title'],
                rating: ['movies', null, 'rating'],
            });
            return reduceMovies(reduceMovies(output), null, 4);
        });
}

module.exports = {
    list,
};