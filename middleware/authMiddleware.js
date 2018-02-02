const jwt = require("jsonwebtoken")
const jwtExpress = require("express-jwt")
const config = require("../config/config")

const authenticate = jwtExpress({secret : config.SECRET})

const generateAccessToken = (req, res, next)=>{
 req.token = req.token || {};
 req.token = jwt.sign({
   id : req.user.id  
 }, config.SECRET, {
     expiresIn : config.TOKENTIME
 });
    next();
}

const respond = (req, res) => {
    res.status(200).json({
        user : req.user.username,
        token : req.token
    })
}

module.exports = {authenticate, generateAccessToken, respond }