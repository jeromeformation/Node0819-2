const Recipe = require('../model/recipe');
const createError = require('http-errors');
const slug = require('slug');
const nl2br = require('nl2br');

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

/**
 * Affiche le détail d'une recette par rapport au slug de l'URL
 * @param req
 * @param res
 * @param next
 */
module.exports.show = (req, res, next) => {
    // Récupération du slug
    const slug = req.params.slug;
    // Récupération de la recette correspondante
    Recipe.findOne(
        {
            slug: slug
        },
        (err, recipe) => {
            if (err) {
                console.log(err);
                next(err);
            } else {
                console.log(recipe);
                recipe.intro = nl2br(recipe.intro);
                res.render('recipes/show', {recipe: recipe});
            }
        }
    );
};



/**
 *  Liste les recettes ayant l'ingrédient envoyé
 * @param req
 * @param res
 * @param next
 */
module.exports.search = (req, res, next) => {
    // Récupération de l'ingrédient rempli dans le formulaie
    const ing = req.body.ingredient;
    // Récupération des recettes correspondantes
    const pattern = new RegExp(ing, 'i');
    Recipe.find(
        {
            "ingredients.name": pattern
        },
        (err, recipes) => {
            if (err) {
                console.log(err);
                next(err);
            } else {
                console.log(recipes);
                recipes.intro = nl2br(recipes.intro);
                res.render('recipes/list', {recipes: recipes});
            }
        }
    );
};

/**
 *  Liste les recettes ayant l'ingrédient envoyé
 * @param req
 * @param res
 * @param next
 */
module.exports.lastFive = (req, res, next) => {
    Recipe.find()
        .sort({'publishedAt': 'desc'})
        .limit(5)
        .select('name intro')
        .exec((err, recipes) => {
            if (err) {
                console.log(err);
                next(err);
            }
            else {
                console.log(recipes);
                res.render('index', {recipes: recipes})
            }
        })
};

module.exports.update = (req, res, next) => {
    // Récupération du slug
    const slug = req.params.slug;

    Recipe.findOne(
        {slug: slug},
        (err, recipe) => {
            if (err) next(err);
            else res.render('recipes/update', {recipe: recipe});
        }
    );
};
module.exports.updateCheck = (req, res, next) => {
    // Récupération du slug
    const slug = req.params.slug;
    let recipeBDD;

    Recipe.findOne(
        {slug: slug},
        (err, recipeBDD) => {
            if (err) next(err);
            else {
                recipe = recipeBDD;
                // fix temporaire
                req.body.ingredients = recipe.ingredients;

                Recipe.update(
                    {slug: slug},
                    req.body,
                    (err, nbLines) => {
                        if (err) next(err);
                        else {
                            if (nbLines === 1) {
                                console.log("Produit bien modifié")
                            } else {
                                console.log("Produit non-trouvé ou identique")
                            }
                        }
                    }
                );

                res.redirect('/recettes/' + recipe.slug + '/edit');
            }
        }
    );


};







