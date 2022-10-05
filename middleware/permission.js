require('dotenv').config()
const jwt = require('jsonwebtoken');
const db = require('../database/models')
const AccessModule = db.AccessModule;

exports.grantAccess = function(key){
    return async (req, res, next) => {
        try {

            const token = req.headers.authorization.replace('Bearer ', '');
            const decoded = jwt.verify(token, process.env.JWT_KEY);
            var userId = decoded.userToken.id;
            
            checkKey = await AccessModule.findAll({ where: { user_id: userId, key: key } });
            
            if (checkKey.length < 1) {
                return res.status(401).send({ message: "Not access this module" });
            }
            
            next();
        }
        catch (error) {
            next(error)
        }
    }
}