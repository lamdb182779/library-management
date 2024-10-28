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

// const getAllDoctors = async (req, res, next) => {
//     let { page, pagesize, name, specialtyID, clinicAddress } = req.query
//     page = parseInt(page)
//     pagesize = parseInt(pagesize)

//     pagesize = !pagesize ? 5 : pagesize

//     pagesize = pagesize > 15 ? 15 : pagesize

//     page = !page ? 1 : page
//     try {
//         //Structure data need to find
//         let find = { active: true };
//         if (name) {
//             find.name = {
//                 [Op.substring]: name
//             }
//         }
//         if (specialtyID) {
//             find.specialtyID = specialtyID
//         }
//         if (clinicAddress) {
//             find.clinicAddress = {
//                 [Op.substring]: clinicAddress
//             }
//         }
//         let count = await db.Doctors.count({
//             where: find,
//         })
//         if (page > (count - 1) / pagesize + 1) {
//             page = parseInt((count - 1) / pagesize + 1)
//         }
//         page = page === 0 ? 1 : page
//         let skip = (page - 1) * pagesize

//         //
//         try {
//             let data = await db.Doctors.findAll({
//                 where: find,
//                 offset: skip,
//                 limit: pagesize,
//                 attributes: ["id", "name", "clinicAddress", "price", "describe", "image", "email", "phoneNumber"],
//                 include: [
//                     {
//                         model: db.Specialties,
//                         attributes: ["name"]
//                     }
//                 ]
//             })
//             if (!checkAdminPermission(req.cookies)) {
//                 data = data.map((item) => {
//                     if (item.phoneNumber) {
//                         item.phoneNumber = hiddenPhoneNumber(item.phoneNumber)
//                     }
//                     return item
//                 })
//                 data = data.map((item) => {
//                     if (item.email) {
//                         item.email = hiddenEmail(item.email)
//                     }
//                     return item
//                 })
//             }
//             data.push(count)

//             return res.status(200).json({
//                 message: "ok",
//                 data: data
//             })
//         } catch (err) {
//             console.log("Cannot get data. Error:", err)
//             return res.status(500).json({
//                 message: "server error!",
//             })
//         }
//     } catch (err) {
//         console.log("Cannot count. Error: ", err)
//         return res.status(500).json({
//             message: "server error!",
//         })
//     }
// }

// const updateDoctorById = async (req, res, next) => {
// }

// const deleteDoctorById = async (req, res, next) => {
//     let id = req.params.id.toString()
//     try {
//         let deactivate = await db.Doctors.update({ active: false }, {
//             where: {
//                 id: id,
//                 active: true,
//             }
//         })
//         if (deactivate.isEqual(0)) {
//             console.log("No matching doctor.")
//             return res.status(500).json({
//                 message: "server error",
//             })
//         }
//         return res.status(200).json({
//             message: "ok",
//         })
//     } catch (error) {
//         console.log("Cannot deactivate doctor. Error: ", error)
//         return res.status(500).json({
//             message: "server error!"
//         })
//     }
// }