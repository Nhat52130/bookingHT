const express = require('express')
const router = express.Router()
const orderController = require("../controller/orderController");

router.post("/accessBooking", orderController.accessBookingbyUser)
router.get("/getOrder/:userId", orderController.getOrderByUser)
module.exports = router