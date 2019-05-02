const router = require("express").Router()
const AstroController = require('../controller/AstroController')

router.post('/daily/:sign', AstroController.getDailyReading)

module.exports = router