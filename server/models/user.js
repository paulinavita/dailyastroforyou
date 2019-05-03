const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

let Schema = mongoose.Schema

let user = new Schema({
    userName : {
        type: String,
        required: true
      },
    email : {
        type: String,
        required: true
      },
    password : {
        type: String,
        required: true
      }
})

user.pre('save', function(next){
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(this.password, salt);
    this.password = hash
    console.log(this.password)
    next()
})

let User = mongoose.model('User', user)

module.exports = User