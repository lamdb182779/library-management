require("dotenv").config()

const express = require("express")
const router = express.Router()

const CLIENT_DOMAIN = process.env.CLIENT_DOMAIN

const service = (route) => {
    router.get("/redirect", (req, res) => {
        console.log("user", req.user);
        return res.redirect(CLIENT_DOMAIN)
    })


    return route.use("/", router)
}

module.exports = service