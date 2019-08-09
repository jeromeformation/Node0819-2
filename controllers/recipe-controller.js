const Recipe = require('../model/recipe');
const createError = require('http-errors');
const slug = require('slug');

/**
 * Affichage du formulaire de création d'une recette (GET)
 * @param req
 * @param res
 * @return String
 */
module.exports.create = (req, res) => res.render('recipe-create');

/**
 * Enregistrement d'une recette (POST)
 * @param req
 * @param res
 * @return String
 */
module.exports.createCheck = (req, res) => {
    // Récupération des variables postéesrs
    const recipe = req.body;
    // Parse des ingrédients pour retrouver une structure en objets
    recipe['ingredients'] = JSON.parse(recipe['ingredients']);
    // Date de publication
    recipe.publishedAt = new Date();
    // Mise en plus du slug
    recipe.slug = slug(recipe.name, {lower: true});
    // Création d'une recette
    Recipe.create(recipe)
        .then(
            recipe => console.log('Recette sauvegardée'),
            err => console.log(err)
        )
        .catch(err => createError(500))
    ;
    res.render('recipe-create');
};

module.exports.list = (req, res, next) => {
    Recipe.find((err, recipes) => {
        if (err) {
            console.log(recipes);
            next(err);
        } else {
            console.log(recipes);
            res.render('recipes/list', {recipes: recipes});
        }
    });
};