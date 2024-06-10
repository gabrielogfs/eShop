const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../dao/models/User');
const bcrypt = require('bcrypt');

passport.use(new LocalStrategy(
    { usernameField: 'email' },
    function (email, password, done) {
        User.findOne({ email: email }, function (error, email) {
            if (error) { return done(error) };
            if (!email) { return done(null, false, { message: 'E-mail incorreto.' }); }

            bcrypt.compare(password, user.password, function (error, isMatch) {
                if(error) { return done(error) };
                if(!isMatch) { return done(null, false, { message: 'Senha incorreta.'}); }
            
                return done(null, user);
            });
        });
    }
));

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    user.findById(id, function (error, user) {
        done(error, user);
    });
});

module.exports = passport