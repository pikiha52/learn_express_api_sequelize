'use strict'
const express = require('express')
const users = require('../controllers/usersController')
const { verifyToken } = require('../middleware/verify')
const { grantAccess } = require('../middleware/permission')
const { validation } = require('../middleware/validation')
const { validationResult } = require('express-validator')
const router = express.Router()

router.get(`/api/v1/users`, verifyToken, users.index);
router.post(`/api/v1/users`, verifyToken, users.store);
router.delete(`/api/v1/users/:id`, verifyToken, users.destroy);

module.exports = router