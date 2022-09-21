'use strict'
const express = require('express')
const auth = require('../controllers/authController')
const { check, validationResult } = require('express-validator')
const passwordHash = require('password-hash')
const router = express.Router();

const checkValidation = [
    check('username').not().isEmpty().withMessage('required value').isAlphanumeric(),
    check('fullname').isAlpha().isLength({ min:5, max: 50 }),
    check('email').not().isEmpty().withMessage('required value').isEmail(),
    check('password').not().isEmpty().withMessage('required value').isAlphanumeric(),
];

const checkValidationLogin = [
    check('username').not().isEmpty().withMessage('required value').isAlphanumeric(),
    check('password').not().isEmpty().withMessage('required value').isAlphanumeric(),
];

const postParam = (req) => {
    const passwordToSave = passwordHash.generate(req.body.password),
        data = {
            username: req.body.username.trim(),
            fullname: req.body.fullname.trim(),
            email: req.body.email,
            password: passwordToSave,
            createdAt: new Date(),
            updatedAt: new Date()
        };
    return data;
}

router.post(`/api/v1/auth/register`, [checkValidation], (req, res) =>  {
    const errors = validationResult(req);
    (!errors.isEmpty() ? res.status(422).json(errors) : auth.register(postParam(req), res)      )
})
router.post(`/api/v1/auth/login`, [checkValidationLogin], (req, res) => {
     const errors = validationResult(req);

     (!errors.isEmpty() ? res.status(422).json(errors) : auth.authentication(req, res))
})

module.exports = router