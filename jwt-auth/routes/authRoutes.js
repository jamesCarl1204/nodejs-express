const { Router } = require('express')
const {} = require('../controllers/authControllers')
const {signup_post, login_post,logout, loginValidationRules, signupValidationRules, loginLimiter} = require('../controllers/authControllers')
const router = Router()

router.post('/signup',signupValidationRules, signup_post)
router.post('/login', loginLimiter, loginValidationRules, login_post )
router.get('/logout', logout)
module.exports = router