const express = require("express")
const publisher = require("./publisher")
const google = require("./google")
const service = require("./service")

const router = express.Router()

const route = (app) => {
    publisher(router)
    google(router)
    service(router)

    return app.use('/', router)
}

module.exports = route