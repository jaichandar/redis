const express = require('express')
const parentRouter = express.Router();
const filmRouter = require('./film');

parentRouter.use('/film', filmRouter);

module.exports = parentRouter;