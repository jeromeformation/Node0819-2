const Recipe = require('../model/recipe').Recipe;
const express = require('express');
const router = express.Router();
const createError = require('http-errors');

router.get('/ajout', (req, res) => res.render('recipe-create'));
router.post('/ajout', (req, res) => {
    // Récupération des variables postées
    const recipe = req.body;
    recipe['ingredients'] = JSON.parse(recipe['ingredients']);
    recipe.publishedAt = new Date();
    // Création d'une recette
    Recipe.create(recipe)
        .then(
            recipe => console.log('Recette sauvegardée'),
            err => console.log(err)
        )
        .catch(err => createError(500))
    ;
    res.render('recipe-create');
});


module.exports = router;

