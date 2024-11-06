const passport = require("passport")
const express = require("express")
const router = express.Router()

const google = (route) => {
    router.get('/',
        passport.authenticate('google', { scope: ['profile', 'email'] }));

    router.get('/redirect',
        passport.authenticate('google', { failureRedirect: '/redirect' }),
        function (req, res) {
            console.log("hello");

            // Successful authentication, redirect home.
            res.redirect('/redirect');
        });

    return route.use("/auth/google", router)
}

module.exports = google