const FAT_SECRET_KEY = '83309b3736c740c1bb6759b97382ec8e';
const SECRET = '096de1d4e0964d64aba474436992b9af'
const fatAPI = new (require('fatsecret'))(FAT_SECRET_KEY, SECRET);
var imagefinder = require('imagefinder')

exports.searchRecipes = function (req, res, next) {
    fatAPI
        .method('recipes.search', {
            search_expression: req.body.name,
            max_results: 20
        })
        .then(function (result) {
            const recipes = [];
            if (result.recipes.total_results == 1) {
                recipes.push(result.recipes.recipe);
            } else if (result.recipes.total_results > 1) {
                recipes.push(...result.recipes.recipe);
            }
            res.send(recipes);
        })
        .catch(err => next(err));
}

exports.getRecipeDetails = function (req, res, next) {
    fatAPI
        .method('recipe.get', {
            recipe_id: req.body.id
        })
        .then(function (result) {
            console.log(result.recipe.ingredients)
            res.send(result.recipe);
        })
}

exports.searchProducts = function (req, res, next) {
    fatAPI
        .method('foods.search', {
            search_expression: req.body.name,
            max_results: 25
        })
        .then(function (result) {
            const products = [];
            const uniqueNames = []
            var food = result.foods.food;
            if (result.foods.total_results == 1) {
                products.push(food);
            } else if (result.foods.total_results > 1) {
                for (var i = 0; i < food.length; i++) {
                    if (!uniqueNames.includes(food[i].food_name)) {
                        uniqueNames.push(food[i].food_name);
                        products.push(food[i]);
                    }
                }
            }
            res.send(products);
        })
        .catch(err => next(err));
}