require('dotenv').config()
const jwt = require('jsonwebtoken')
const db = require("../database/models")
const Blacklist = db.Blacklist;

const verifyToken = async (req, res, next) => {
    if (req.headers.authorization) {

        const token = req.headers.authorization.split(' ')[1]
        if (token) {
            const checkBlacklist = await Blacklist.findOne({ where: { token } });
    
            if (checkBlacklist) {
                return res.status(401).send({
                    auth: false,
                    message: 'Your token is blacklist, please login again'
                })
            }
    
            jwt.verify(token, process.env.JWT_KEY,  (err) => {
                if (err) {
                    return res.status(500).send({ auth: false, message: err })
                }
                next()
            })
        } else {
            res.status(401).send({
                auth: false,
                message: 'Token required'
            })            
        }

    } else {
        res.status(401).send({
            auth: false,
            message: 'Token required'
        })
    }
}

module.exports = { verifyToken }