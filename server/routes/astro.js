const router = require("express").Router()
const AstroController = require('../controller/AstroController')


router.get('/',AstroController.getUserHoro)

module.exports = router