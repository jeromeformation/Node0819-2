const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipe-controller.js');

// Point de montage "/recettes"

router.get('/', recipeController.list);

router.route('/ajout')
    .get(recipeController.create)
    .post(recipeController.createCheck)
;

module.exports = router;

