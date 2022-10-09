'use strict'
const express = require('express')
const employe = require('./employeRoutes')
const auth = require('./authRoutes')
const users = require('./usersRouter')
const router = express()

router.get(`/api/v1/`, (_req, res) => {
    res.json({
        "message": "Welcome to restfullapi"
    })
})

router.use(employe)
router.use(auth)
router.use(users)

module.exports = router