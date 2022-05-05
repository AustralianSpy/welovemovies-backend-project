require('dotenv').config();
const express = require('express');
const cors = require('cors');


// TODO: require routers here.
const notFound = require('./errors/notFound');
const errorHandler = require('./errors/errorHandler');
const theatersRouter = require('./theaters/theaters.router');
const moviesRouter = require('./movies/movies.router');
const reviewsRouter = require('./reviews/reviews.router');

// App:
const app = express();
app.use(cors());
app.use(express.json());

// TODO: Routers here.
app.use('/theaters', theatersRouter);
app.use('/movies', moviesRouter);
app.use('/reviews', reviewsRouter); 

// Handlers for missing routes and errors.
app.use(notFound);
app.use(errorHandler);

module.exports = app;
