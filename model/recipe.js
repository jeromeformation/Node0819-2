const mongoose = require('mongoose');

let recipeSchema = new mongoose.Schema({
    name: String,
    intro: String,
    nbIngredients: Number,
    publishedAt: Date
});

module.exports.Recipe = mongoose.model('Recipe', recipeSchema);
