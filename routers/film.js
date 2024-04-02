const express = require('express')
const  Router = express.Router();
const filmControllers = require('../controllers/film');

Router.get('/', filmControllers.getAllFilm);

module.exports = Router;