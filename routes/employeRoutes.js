'use strict'
const express = require('express')
const employe = require('../controllers/employeController')
const { verifyToken } = require('../middleware/verify')
const router = express.Router()

router.get(`/api/v1/employe`, verifyToken, employe.index)
router.post(`/api/v1/employe`, verifyToken, employe.store)
router.get(`/api/v1/employe/:id`, verifyToken, employe.show)
router.put(`/api/v1/employe/:id`, verifyToken, employe.update)
router.delete(`/api/v1/employe/:id`, verifyToken, employe.destroy)

module.exports = router

// `/api/v1/employe` ini adalah bagian url
// setelah eksekusi url akan melanjutkkan ke middleware terlebih dahulu
// jika lolos validasi dimiddleware akan dilanjunkan ke function