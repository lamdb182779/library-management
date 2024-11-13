const express = require("express")
const router = express.Router()

const { getAllUser } = require("../controllers/user")

const user = (route) => {
    router.get("/", getAllUser)
    return route.use("/user", router)
}

module.exports = user