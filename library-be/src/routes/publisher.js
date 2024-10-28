const express = require("express")
const router = express.Router()

const { addPublisher } = require("../controllers/publisher")

const publisher = (route) => {
    router.post("/", addPublisher)
    return route.use("/publisher", router)
}

module.exports = publisher