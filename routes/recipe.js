const Recipe = require('../model/recipe').Recipe;
const express = require('express');
const router = express.Router();
const createError = require('http-errors');

router.get('/ajout', function(req, res, next) {
    // Création d'une recette
    Recipe.create(
        {
            name: "Gateau au chocolat 3",
            intro: "Idéal pour le déssert",
            nbIngredients: 4,
            publishedAt: new Date()
        }
    )
        .then(
            recipe => console.log('Recette sauvegardée'),
            err => console.log(err)
        )
        .catch(err => createError(500))
    ;

    res.render('recipe-create');
});

module.exports = router;

