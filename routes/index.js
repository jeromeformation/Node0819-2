var express = require('express');
var router = express.Router();
const recipeController = require('../controllers/recipe-controller.js');

router.get('/', recipeController.lastFive);

module.exports = router;
