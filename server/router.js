const Authentication = require('./controllers/authentication');
const Fatsecret = require('./controllers/fatsecret');
const Products = require('./controllers/products');

const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });


module.exports = function (app) {
    app.post('/signin', requireSignin, Authentication.signin);
    app.post('/signup', Authentication.signup);
    app.post('/food', Fatsecret.searchRecipes);
    app.post('/details', Fatsecret.getRecipeDetails);
    app.post('/product', Fatsecret.searchProducts);
    app.post('/addUserProduct', Products.addUserProduct);
    app.post('/removeUserProduct', Products.removeUserProduct);    
    app.post('/userProducts', Products.getUserProducts);            
}