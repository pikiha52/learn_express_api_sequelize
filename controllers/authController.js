const db = require("../database/models")
const Users = db.Users
const Blacklist = db.Blacklist
const AccessModule = db.AccessModule
const jwt = require('jsonwebtoken')
const passwordHash = require('password-hash')
require("dotenv").config()

const tokenCheck = async (req, res) => {
    if (req.headers.authorization) {
        res.json({ msg: 'Token verify' }).status(200);
    } else {
        res.json({ msg: 'Token required' }).status(422);
    }
}

const register = async (input, res) => {
    try {
        const save = await Users.create(input)
        res.json(save).status(200)
    } catch (error) {
        res.json(error).status(422)
    }
}

// console.log(require('crypto').randomBytes(64).toString('hex'))
const authentication = async (req, res) => {
    try {
        const username = req.body.username.trim();
        const password = req.body.password.trim();
        const cekUsername = await Users.findOne({ where: { username: username } });
        const fetchResult = cekUsername.dataValues
        const verify = passwordHash.verify(password, fetchResult.password);

        if (verify != true) {
            res.json({ msg: 'Password incorect !' }).status(422)
        } else {

            const userToken = {
                id: fetchResult.id,
                username: fetchResult.username
            }

            moduleKey = await AccessModule.findAll({
                where: {
                    user_id: fetchResult.id
                },
                attributes: ["key"],
            });

            jwt.sign({ userToken }, process.env.JWT_KEY, {
                expiresIn: '365d'
            }, (err, token) => {
                res.json({
                    token: token,
                    "modules": moduleKey,
                    "username": cekUsername.username,
                    "fullname": cekUsername.fullname,
                    "email": cekUsername.email
                }).status(200)
            });

        }

    } catch (error) {
        res.json({ msg: `username or password not match` }).status(422)
    }
}

const logout = async (req, res) => {
    try {
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(' ')[1]
            await Blacklist.create({ token: token })
            res.json({ msg: 'Logout sucessfully' }).status(200);
        } else {
            res.json({ msg: 'Token required' }).status(422);
        }
    } catch (error) {
        res.json({ msg: error }).status(422)
    }
}

module.exports = {
    register, authentication, logout, tokenCheck
}