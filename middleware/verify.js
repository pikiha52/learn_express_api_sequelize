require('dotenv').config()
const jwt = require('jsonwebtoken')

const verifyToken = async (req, res, next) => {
    
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(' ')[1]
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
}

module.exports = { verifyToken }