//A node.js module for parsing form data, especially file uploads. Current status.
const formidable = require('formidable')
const _ = require('lodash')
const fs = require('fs')
const Course = require('../models/course')
const { errorHandler } = require("../validator/dbErrorHandler")

//get product by productId
exports.courseById = (req, res, next, id) => {
    Course.findById(id).populate('category').exec((err, course) => {
        if (err || !course) {
            return res.status(400).json({
                error: "course not found!"
            })
        }
        req.course = course
        next()
    })
}

//read the course from the req
exports.read = (req, res) => {
    //photo is made undefined bcz we dont want it be shown in the response bcz photo has large size
    req.course.photo = undefined
    return res.json(req.course)
}

// create course of a particular category
exports.createCourse = (req, res) => {
    // all the form data will be available from the new formidable IncomingForm 
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "Image could not be uploaded"
            })
        }
        // check for all fields
        const { name, description, duration, price, category } = fields
        if (!name || !description || !duration || !price || !category) {
            return res.status(400).json({
                error: "All fields are required"
            })
        }

        let course = new Course(fields)
        console.log(course)
        // 'photo' is the name of the image field in the product schema
        if (files.photo) {
            // if the file size greater than 1 mb
            // 1kb = 1000 
            // 1mb =1000000
            if (files.photo.size > 1000000) {
                return res.status(400).json({
                    error: "image should be less than 1mb"
                })
            }

            course.photo.data = fs.readFileSync(files.photo.path)
            course.photo.contentType = files.photo.type
        }
        console.log(course)

        course.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                })
            }
            res.json(result)
        })
    })
}


exports.addmoreDetails = (req, res) => {
    let existingcourse = req.course
    existingcourse.curriculum = req.body.curriculum
    existingcourse.instructor = req.body.instructor

    existingcourse.save((err, result) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json(result)
    })
}

// delete the course by id
exports.remove = (req, res) => {
    let course = req.course
    course.remove((err, deletedCourse) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json({
            message: "Product deleted successfully"
        })
    })
}

// update course of a particular category
exports.updateCourse = (req, res) => {
    // all the form data will be available from the new formidable IncomingForm 
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "Image could not be uploaded"
            })
        }

        // use the existing course
        let course = req.course
        // extend method of loadsh used to update course takes two arg. first course itself and 2nd updated field
        course = _.extend(course, fields)


        // 'photo' is the name of the image field in the course schema
        if (files.photo) {
            // if the file size greater than 1 mb
            // 1kb = 1000 
            // 1mb =1000000
            if (files.photo.size > 1000000) {
                return res.status(400).json({
                    error: "image should be less than 1mb"
                })
            }

            course.photo.data = fs.readFileSync(files.photo.path)
            course.photo.contentType = files.photo.type
        }

        course.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                })
            }
            res.json(result)
        })
    })
}

/**
 * sell / arrival
 * by sell = /products?sortBy=sold&order=desc&limit=4
 * by arrival = /products?sortBy=createdAt&order=desc&limit=4
 * if no params are sent, then all products are returned
 */

exports.list = (req, res) => {

    //    let order = req.query.order ? req.query.order : 'asc'
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id'
    let limit = req.query.limit ? parseInt(req.query.limit) : 6

    Course.find()
        .select('-photo')
        .populate('category')
        .sort([[sortBy]])  // .sort([[sortBy, order]])
        .limit(limit)
        .exec((err, courses) => {
            if (err) {
                return res.status(400).json({
                    error: 'Products not found'
                });
            }
            res.json(courses)
        })
}

/**
 * it will find the products based on the req product category
 * other products that has the same category, will be returned
 */

exports.relatedList = (req, res) => {
    let limit = req.query.limit ? parseInt(req.query.limit) : 6

    Course.find({ _id: { $ne: req.course }, category: req.course.category })  // $ne means : not included
        .limit(limit)
        .populate('category', '_id name')
        .exec((err, courses) => {
            if (err) {
                return res.status(400).json({
                    error: 'Courses not found'
                })
            }
            res.json(courses);
        })
}


exports.listCategories = (req, res) => {

    Course.distinct('category', {}, (err, categories) => {

        if (err) {
            return res.status(400).json({
                error: 'Categories not found'
            })
        }
        res.json(categories);
    })

}


exports.getPhoto = (req, res, next) => {
    if (req.course.photo.data) {
        res.set('Content-Type', req.course.photo.contentType)
        return res.send(req.course.photo.data)
    }
    next()
}

// exports.increseEnrollment = (req, res, next) => {
//     let bulkOps = req.body.order.courses.map((item) => {
//         return {
//             updateOne: {
//                 filter: { _id: item._id },
//                 update: { $inc: { enrolled: +item.count } }
//             }
//         }
//     })
//     Course.bulkWrite(bulkOps, {}, (error, courses) => {
//         if (error) {
//             return res.status(400).json({
//                 error: 'Could not update Course'
//             })
//         }
//         next()
//     })
// }

/**
 * list products by search
 * we will implement product search in react frontend
 * we will show categories in checkbox and price range in radio buttons
 * as the user clicks on those checkbox and radio buttons
 * we will make api request and show the products to users based on what he wants
 */

exports.listBySearch = (req, res) => {
    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);
    let findArgs = {}

    // console.log(order, sortBy, limit, skip, req.body.filters);
    // console.log("findArgs", findArgs);

    for (let key in req.body.filters) {
        if (req.body.filters[key].length > 0) {
            if (key === "price") {
                // gte -  greater than price [0-10]
                // lte - less than
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                }
            } else {
                findArgs[key] = req.body.filters[key];
            }
        }
    }

    Course.find(findArgs)
        .select("-photo")
        .populate("category")
        .sort([[sortBy, order]])
        .skip(skip)
        .limit(limit)
        .exec((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: "Courses not found"
                })
            }
            res.json({
                size: data.length,
                data
            })
        })
}
