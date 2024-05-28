const express = require('express')
const router = express.Router()
const BookingController = require("../controller/bookingController");

router.post("/create", BookingController.create)
router.get("/", BookingController.getAll)
router.post("/:id", BookingController.getOne)
router.get("/find/:leaveId", BookingController.getbookingLeaveById)

module.exports = router
