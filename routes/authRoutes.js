const router = require('express').Router()
const authController = require('../controllers/authController')

router.get('/login', authController.login_get)
router.post('/login', authController.login_post)
router.get('/logout', authController.logout_get)

router.get('/signup', authController.signup_get)
router.post('/signup', authController.signup_post)


module.exports = router