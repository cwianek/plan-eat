const FAT_SECRET_KEY = '83309b3736c740c1bb6759b97382ec8e';
const SECRET = '096de1d4e0964d64aba474436992b9af'
const fatAPI = new (require('fatsecret'))(FAT_SECRET_KEY, SECRET);
var imagefinder = require('imagefinder')

function applyImage(recipe) {

}

exports.search = function (req, res, next) {
    console.log("Search");
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
            var promises = [];
            for (var i = 0; i < recipes.length; i++) {
                var promise = applyImage(recipes[i]);
                promises.push(promise);
            }
            console.log(result.recipes.recipe)
            Promise.all(promises).then(function () {
                res.send(recipes);

            })
        })
        .catch(err => next(err));
}