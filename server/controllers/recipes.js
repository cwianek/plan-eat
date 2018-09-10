const User = require('../models/user');
const dateformat = require('dateformat');
const axios = require('axios');
const request = require('request');
const Fatsecret = require('./fatsecret');

const NN_URL = "http://206.189.26.159:5000"

function addUserRecipe(req, res, next) {
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

function getRecipesInTime(email, start, end) {
    return User.aggregate([
        { "$match": { "email": email } },
        { "$unwind": "$recipes" },
        { "$match": { "$and": [{ "recipes.date": { "$gte": start } }, { "recipes.date": { "$lte": end } }] } },
        { "$group": { "_id": "$_id", "recipes": { "$push": "$recipes" } } }
    ]);
}

function getCurrentDayRecipes(req, res, next) {
    const email = req.body.user.email;
    var start = new Date();
    start.setHours(0, 0, 0, 0);
    var end = new Date(start.getTime());
    end.setHours(23, 59, 59, 999);
    getRecipesInTime(email, start, end).exec(function (err, user) {
        if (err) { return next(err); }
        if (user[0] && user[0].recipes) {
            res.send(user[0].recipes);
        } else {
            res.send([]);
        }
    });
}

function getUserRecipes(req, res, next) {
    const email = req.body.user.email;
    const params = req.body.params;
    if (!params || !params.timestamp) {
        var start = new Date();
        start.setHours(0, 0, 0, 0);
    } else {
        start = new Date(params.timestamp)
    }
    var end = new Date(start.getTime());
    end.setHours(23, 59, 59, 999);
    getRecipesInTime(email, start, end).exec(function (err, user) {
        if (err) { return next(err); }
        const result = {};
        if (user[0] && user[0].recipes) {
            result[dateformat(start, "yyyy-mm-dd")] = user[0].recipes;
        }
        res.send(result);
    });
}

function askByImage(req, res, next) {
    const image = req.body.image;
    var decodedFile = new Buffer(image, 'base64');
    var formData = {
        image: {
            value: decodedFile,
            options: {
                filename: 'image.jpg',
                contentType: 'text/html'
            }
        }
    }


    request.post({ url: NN_URL + '/recognize', formData: formData },
        function optionalCallback(err, response, body) {
            console.log(response.body)
            if (err) {
                return console.error('upload failed:');
            }
            Fatsecret.search(response.body.replace('_', ' '), res, next);
        });
}


exports.getUserRecipes = getUserRecipes;
exports.askByImage = askByImage;
exports.addUserRecipe = addUserRecipe;
exports.getCurrentDayRecipes = getCurrentDayRecipes;