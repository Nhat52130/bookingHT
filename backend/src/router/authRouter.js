const express = require('express')
const router = express.Router()
const authController = require("../controller/authController");

router.post("/register", authController.isRegister)
router.post("/login", authController.isLogin)
router.post('/logout',authController.logOut)
router.post('/changepassword', authController.changePassword)
router.post('/refresh', authController.refreshAccessToken)
// router.post('/refresh', authController.refreshAccessToken)

module.exports = router
