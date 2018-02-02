const express = require("express")
const { Router } = require("express")
const passport = require("passport")
const jwt = require("jsonwebtoken")
const expressJwt = require("express-jwt")
const config = require("../config/config")
const { authenticate, generateAccessToken, respond } = require("../middleware/authMiddleware")
const Account = require("../model/account")

module.exports = Router()
    .post('/register', (req, res) => {
        Account.register({ username : req.body.email}, req.body.password, (err, account) => {
            if (err) {
                res.send(err)
            } 
                passport.authenticate(
                    'local',{
                     session : false
                    })(req, res, () => {
                        res.status(200).send("Account successfully created")
            })
        })
    })
    
    .post('/login', passport.authenticate('local', {
        session : false
    }), generateAccessToken, respond )
    
    .get('/me', authenticate, (req, res) => {
        res.status(200).json(req.user)
    })