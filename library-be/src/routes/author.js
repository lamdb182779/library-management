const express = require("express")
const router = express.Router()

const { addAuthor, getAuthors } = require("../controllers/author")

const author = (route) => {
    router.post("/", addAuthor)
    router.get("/", getAuthors)
    return route.use("/author", router)
}

module.exports = author