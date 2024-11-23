const express = require("express")
const router = express.Router()

const { addAuthor, getAuthors } = require("../controllers/author");
const { uploadAuthorImage } = require('../middleware/image-storage');

const author = (route) => {
    router.post("/", uploadAuthorImage.single('image'), addAuthor)
    router.get("/", getAuthors)
    return route.use("/author", router)
}

module.exports = author