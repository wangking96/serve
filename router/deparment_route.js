const express = require('express')
const deparmentController = require('../controller/deparment_controller')
const router = express.Router()

// 获取部门路由
router.get('/getDeparment', deparmentController.getDeparment)

module.exports = router