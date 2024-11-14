const first = [1]
const second = [1, 2]
const third = [1, 2, 3]

exports.firstRank = (req, res, next) => {
    if (!req.user || !first.includes(req.user.role)) return res.status(500).json({
        message: "You don't have this permission!"
    })
    next()
}

exports.secondRank = (req, res, next) => {
    if (!req.user || !second.includes(req.user.role)) return res.status(500).json({
        message: "You don't have this permission!"
    })
    next()
}

exports.thirdRank = (req, res, next) => {
    if (!req.user || !third.includes(req.user.role)) return res.status(500).json({
        message: "You don't have this permission!"
    })
    next()
}