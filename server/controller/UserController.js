const User = require('../models/user')
require('dotenv').config
const jwt = require('jsonwebtoken')
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

class UserController {
    static GoogleSignIn(req, res){  
        let payload = null;
        client.verifyIdToken({
            idToken: req.body.id_token,
            audience: process.env.GOOGLE_CLIENT_ID
        })
        .then((ticket) => {
            payload = ticket.getPayload();
            const userid = payload['sub'];
            console.log(ticket);
            return User.findOne({ email : payload.email})
        })
        .then((user) => {
            if(user){
                let payload = {
                    userName: user.name,
                    email: user.email
                }
                let token = jwt.sign(payload, process.env.API_KEY)
                console.log('token --->',token, '<---token')
                res.status(200).json({token})
            }else{
                return User.create({
                    userName: payload.name,
                    email: payload.email,
                    password: "123456"
                })
                .then((user) => {
                    let payload = {
                        userName: user.name,
                        email: user.email
                    }
                    let token = jwt.sign(payload, process.env.API_KEY)
                    console.log('token --->',token, '<---token')
                    res.status(200).json({token})
                })
                .catch((err) => {
                    res.status(500).json(err)
                })
            }
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json(err)
        })
    }

    static Regis(req, res){
        User
        .create({
            userName: req.body.userName,
            email: req.body.email,
            password: req.body.password
        })
        .then(result => {
            return User.findOne({email : req.body.email})
        })
        .then(result => {
            if(result){
                let {userName} = result
                let payload = {
                    userName: result.userName,
                    email: result.email
                }
                let token = jwt.sign(payload, process.env.API_KEY)
                console.log('token regis-->',token)
                res.status(200).json({
                    token, userName
                })    
            }else{
                res.status(404).json({
                    msg: "Not Found"
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                msg: "Internal Server Error Login"
            })
        })
    }

    static Login(req, res){
        User
        .findOne({
            email : req.body.email
        })
        .then(result => {
            if(result){
                let {userName} = result
                let payload = {
                    userName: result.userName,
                    email: result.email
                }
                let token = jwt.sign(payload, process.env.API_KEY)
                console.log('token login-->',token)
                res.status(200).json({
                    token, userName
                })    
            }else{
                res.status(404).json({
                    msg: "Not Found"
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                msg: "Internal Server Error Login"
            })
        })
    }

    static Logout(req, res){
        // i dunno
    }
}

module.exports = UserController