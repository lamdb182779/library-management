const express = require("express")

const router = express.Router()

const route = (app) => {

    return app.use('/api', router)
}

module.exports = route