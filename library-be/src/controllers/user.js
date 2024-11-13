const { Op } = require("sequelize")
const db = require("../models")

exports.getAllUser = async (req, res) => {
    if (!req.user || req.user.role !== 1) return res.status(500).json({
        message: "You don't have this permission!"
    })
    let { page = 1, pagesize = 5, keyword, types = "email-name" } = req.body
    page = parseInt(page)
    pagesize = parseInt(pagesize)
    pagesize = pagesize > 15 ? 15 : pagesize

    types = types.split("-")
    let conditions = []
    let find = { active: true }
    if (keyword?.trim()) {
        types.forEach(type => {
            if (type === "name") conditions.push({ name: { [Op.iLike]: `%${keyword.trim()}%` } })
            if (type === "email") conditions.push({ email: { [Op.iLike]: `%${keyword.trim()}%` } })
        })
        find = { ...find, [Op.or]: conditions }
    }

    let skip = (page - 1) * pagesize
    try {
        let { count, rows } = await db.User.findAndCountAll({
            where: find,
            limit: pagesize,
            offset: skip,
            attributes: ["id", "email", "name", "role"]
        })

        return res.status(200).json({
            message: "Get data successfully!",
            result: rows,
            count: count
        })
    } catch (error) {
        console.log("Cannot get data! Error:", error)
        return res.status(500).json({
            message: "Server error!",
        })
    }
}

