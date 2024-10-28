const express = require("express")
const publisher = require("./publisher")

const router = express.Router()

const route = (app) => {
    publisher(router)
    return app.use('/api', router)
}

module.exports = route