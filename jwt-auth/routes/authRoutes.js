const { Router } = require('express')
const {} = require('../controllers/authControllers')
const {signup_post, login_post,logout} = require('../controllers/authControllers')
const router = Router()

router.post('/signup', signup_post)
router.post('/login',login_post )
router.get('/logout', logout)
module.exports = router