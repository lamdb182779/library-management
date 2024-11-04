const passport = require("passport")
const express = require("express")
const router = express.Router()

const google = (route) => {
    router.get('/',
        passport.authenticate('google', { scope: ['profile', 'email'] }));

    router.get('/redirect',
        passport.authenticate('google', { failureRedirect: '/login' }),
        function (req, res) {
            // Successful authentication, redirect home.
            res.redirect('/');
        });

    return route.use("/auth/google", router)
}

module.exports = google