const Recipe = require('../model/recipe').Recipe;
const express = require('express');
const router = express.Router();
const createError = require('http-errors');

router.get('/ajout', function(req, res, next) {
    // Création d'une recette
    const recipe = new Recipe(
        {
            name: "Gateau au chocolat",
            intro: "Idéal pour le déssert",
            nbIngredients: 4,
            publishedAt: new Date()
        }
    );
    // Sauvegarde en BDD
    recipe.save()
        .then(
            recipe => console.log('Recette sauvegardée'),
            err => console.log(err)
        )
        .catch(err => createError(500))
    ;

    res.render('recipe-create');
});

module.exports = router;

