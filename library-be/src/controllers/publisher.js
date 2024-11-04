const db = require("../models")

exports.addPublisher = async (req, res) => {
    let { name } = req.body
    if (name.trim() === "") {
        console.log("Missing publisher 's name!");
        return res.status(500).json({
            message: "Missing publisher 's name!"
        })
    }
    await db.Publisher.create({
        name: name,
    }).then(() => {
        return res.status(200).json({
            message: 'Publisher created successfully!',
        })
    })
        .catch(error => {
            console.log("Cannot create publisher! Error: ", error)
            return res.status(500).json({
                message: "Server error!"
            })
        })
}

