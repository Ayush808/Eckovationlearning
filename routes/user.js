const express = require('express')
const router = express.Router()

const { requireSignIn, isAdmin, isAuth } = require('../controllers/auth')
const { userById, readUser, updateUser, enrollUser, getUserEnrolledCourses } = require('../controllers/user')
const { courseById, incrementEnrollment } = require('../controllers/course')

router.get('/secret/:userId', requireSignIn, isAuth, isAdmin, (req, res) => {
    res.json({
        user: req.profile
    })
})

router.get('/user/:userId', requireSignIn, isAuth, readUser)
router.put('/user/:userId', requireSignIn, isAuth, updateUser)
//router.get('/orders/by/user/:userId', requireSignIn, isAuth, purchaseHistory)
router.put('/user/enroll/:courseId/:userId', requireSignIn, isAuth, incrementEnrollment, enrollUser)
router.get('/user/courses/:userId', requireSignIn, isAuth, getUserEnrolledCourses)

router.param("userId", userById)
router.param("courseId", courseById)

module.exports = router