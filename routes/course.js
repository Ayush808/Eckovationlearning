const express = require('express')
const router = express.Router()

//import  category controller
const { createCourse, addmoreDetails, courseById, read, remove, updateCourse, list, relatedList, listCategories, getPhoto } = require('../controllers/course')
//import middleware to ensure category only accessed by admin
const { isAdmin, isAuth, requireSignIn } = require('../controllers/auth')
const { userById } = require('../controllers/user')

router.post('/course/create/:userId', requireSignIn, isAuth, isAdmin, createCourse)
router.put('/course/addmore/:userId/:courseId', requireSignIn, isAuth, isAdmin, addmoreDetails)
router.get('/course/:courseId', read)
router.delete('/course/:courseId/:userId', requireSignIn, isAuth, isAdmin, remove)
router.put('/course/:courseId/:userId', requireSignIn, isAuth, isAdmin, updateCourse)

router.get('/courses', list)
router.get('/courses/related/:courseId', relatedList)
router.get('/courses/categories', listCategories)
router.get('/course/photo/:courseId', getPhoto)

router.param("userId", userById)
router.param("courseId", courseById)

module.exports = router 