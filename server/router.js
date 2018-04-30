const Authentication = require('./controllers/authentication');
const Fatsecret = require('./controllers/fatsecret');
const Products = require('./controllers/products');
const Recipes = require('./controllers/recipes');
const Regression = require('./controllers/regression');

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
    app.post('/addUserRecipe', Recipes.addUserRecipe);    
    app.post('/getUserRecipes', Recipes.getUserRecipes);        
    app.post('/predict',Regression.predict);    
    app.post('/train',Regression.train);      
}