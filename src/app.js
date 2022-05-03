require('dotenv').config();
const express = require('express');
const app = express();

// TODO: require routers here.
const notFound = require('./errors/notFound');
const errorHandler = require('./errors/errorHandler');

app.use(express.json());

// TODO: Routers here.

// Handlers for missing routes and errors.
app.use(notFound);
app.use(errorHandler);

module.exports = app;
