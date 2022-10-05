'use strict'
const express = require('express')
const employe = require('../controllers/employeController')
const { verifyToken } = require('../middleware/verify')
const { grantAccess } = require('../middleware/permission')
const router = express.Router()

const actionshow = '1001'
const actionnew = '1002'
const actionedit = '1003'
const actiondelete = '1004'


router.get(`/api/v1/employe`, verifyToken, grantAccess(actionshow), employe.index)
router.post(`/api/v1/employe`, verifyToken, grantAccess(actionnew), employe.store)
router.get(`/api/v1/employe/:id`, verifyToken, grantAccess(actionshow), employe.show)
router.put(`/api/v1/employe/:id`, verifyToken, grantAccess(actionedit), employe.update)
router.delete(`/api/v1/employe/:id`, verifyToken, grantAccess(actiondelete), employe.destroy)

module.exports = router

// `/api/v1/employe` ini adalah bagian url
// setelah eksekusi url akan melanjutkkan ke middleware terlebih dahulu
// jika lolos validasi dimiddleware akan dilanjunkan ke function
// grantAccess adalah middleware untuk cek apakah user tsb memilik akses untuk module tsb