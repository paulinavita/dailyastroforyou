const router = require("express").Router()
const AstroController = require('../controller/AstroController')

router.get('/videos', AstroController.getVideos)


module.exports = router