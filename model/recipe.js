const mongoose = require('mongoose');

const ingredientsSchema = new mongoose.Schema({
    name: String,
    quantity: Number,
    unit: String
});

let recipeSchema = new mongoose.Schema({
    name: String,
    slug: String,
    intro: String,
    nbIngredients: Number,
    publishedAt: Date,
    ingredients: [ingredientsSchema]
});

module.exports = mongoose.model('Recipe', recipeSchema);








