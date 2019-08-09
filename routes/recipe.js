const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipe-controller.js');

// Point de montage "/recettes"

router.get('/', recipeController.list);
router.post('/search', recipeController.search);

router.route('/ajout')
    .get(recipeController.create)
    .post(recipeController.createCheck)
;
router.route('/:slug')
    .get(recipeController.show)
;



module.exports = router;

