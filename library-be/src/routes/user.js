const express = require("express")
const router = express.Router()

const { getAllUser, changeRole } = require("../controllers/user")
const { firstRank } = require("../middleware/permission-action")

const user = (route) => {
    router.get("/", firstRank, getAllUser)
    router.put("/role/:id", firstRank, changeRole)
    return route.use("/user", router)
}

module.exports = user