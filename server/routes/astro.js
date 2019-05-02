const router = require("express").Router()
const AstroController = require('../controller/AstroController')

router.post('/daily/:sign', AstroController.getDailyReading)

router.post('/',AstroController.getUserHoro)
router.get('/videos', AstroController.getVideos)


module.exports = router