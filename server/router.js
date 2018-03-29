const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

const Fatsecret = require('./controllers/fatsecret');

module.exports = function (app) {
    app.get('/', requireAuth, function (req, res) {
        res.send({ hi: 'there' });
    });
    app.post('/food', Fatsecret.search);
    app.post('/details', Fatsecret.getRecipeDetails);    
    app.post('/signin', requireSignin, Authentication.signin);
    app.post('/signup', Authentication.signup);
}