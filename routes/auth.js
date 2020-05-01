const express = require('express')
const router = express.Router()

//import user controller
const { signUp, signIn, generateSecret, isOtpCorrect, signOut, requireSignIn } = require('../controllers/auth')

//import validator
const { userSignupValidator } = require('../validator/validator')

router.post('/signup', userSignupValidator, signUp)
router.post('/signin', signIn)
router.get('/signout', signOut)
// router.post('/totp-secret', generateSecret);
// router.post('/validate', isOtpCorrect)



module.exports = router