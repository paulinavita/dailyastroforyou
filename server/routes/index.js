const router = require("express").Router()
const astro = require('./astro')
const user = require("./user")

router.get("/", (req, res) => {
    res.status(200).json({msg : 'connected'})
})

router.use("/astros", astro)
router.use("/users", user)

module.exports = router