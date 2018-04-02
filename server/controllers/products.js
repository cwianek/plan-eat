const User = require('../models/user');

exports.addUserProduct = function (req, res, next) {
    const email = req.body.user.email;
    const product = req.body.product;
    User.findOne({ email: email }, function (err, user) {
        if (err) { return next(err); }

        user.products.push(product);
        user.save();
        res.send('success');
    });
}

exports.removeUserProduct = function (req, res, next) {
    const email = req.body.user.email;
    const productToRemove = req.body.product;
    User.findOne({ email: email }, function (err, user) {
        if (err) { return next(err); }

        if (user.products && user.products.length > 0) {
            const products = user.products.filter(product => (product.food_id !== productToRemove.food_id && product.food_name !== productToRemove.food_name));
            if (products.length > 0) {
                user.products = products;
                user.save();
            }
            res.send(products);
        } else {
            res.send([]);
        }
    });
}

exports.getUserProducts = function (req, res, next) {
    const email = req.body.user.email;
    User.findOne({ email: email }, function (err, user) {
        if (err) { return next(err); }
        res.send(user.products || []);
    });
}

