const router = require("express").Router()
const AstroController = require('../controller/AstroController')

router.post('/daily/:sign', AstroController.getDailyReading)

router.get('/',AstroController.getUserHoro)

module.exports = router