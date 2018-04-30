const User = require('../models/user');
const dateformat = require('dateformat');

exports.addUserRecipe = function (req, res, next) {
    const email = req.body.user.email;
    const recipe = req.body.recipe;
    User.findOne({ email: email }, function (err, user) {
        if (err) { return next(err); }

        recipe.date = new Date();
        user.recipes.push(recipe);
        user.save();
        res.send('success');
    });
}

exports.getUserRecipes = function (req, res, next) {
    const email = req.body.user.email;
    const params = req.body.params;
    var start = new Date();
    start.setHours(0, 0, 0, 0);

    var end = new Date();
    end.setHours(23, 59, 59, 999);
    User.aggregate([
        { "$match": { "email": email } },
        { "$unwind": "$recipes" },
        { "$match": { "$and": [{ "recipes.date": { "$gte": start } }, { "recipes.date": { "$lte": end } }] } },
        { "$group": { "_id": "$_id", "recipes": { "$push": "$recipes" } } }
    ]).exec(function (err, user) {
        if (err) { return next(err); }
        const result = {};
        result[dateformat(start,"yyyy-mm-dd")] = user[0].recipes;
        res.send(result);
    });
}