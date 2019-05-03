const router = require("express").Router()
const UserController = require('../controller/UserController')

router.post('/signup', UserController.Regis)
router.post('/signin', UserController.Login)
router.post('/signout', UserController.Logout)
router.post('/signinGoogle', UserController.GoogleSignIn)

module.exports = router