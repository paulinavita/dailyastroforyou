require('dotenv').config()
const express = require('express')
const routes = require('./routes')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const PORT = 3000
const url = `mongodb://localhost/dailyastro`

mongoose.connect(url, {useNewUrlParser: true})
.then(() => {console.log('======> MongoDB Connected <=======');
})
.catch((err) => {console.log(err)})

app.use(express.json())
app.use(express.urlencoded({extender : true}))
app.use(cors())
app.use("/", routes)

app.listen(PORT, () => {console.log('listening on...', PORT)})
