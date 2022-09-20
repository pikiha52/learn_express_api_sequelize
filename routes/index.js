'use strict'
const express = require('express')
const employe = require('./employeRoutes')
const router = express()

router.get(`/api/v1/`, (_req, res) => {
    res.json({
        "message": "Welcome to restfullapi"
    })
})

module.exports = router
router.use(employe)