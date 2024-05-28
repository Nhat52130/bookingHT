const express = require('express')
const router = express.Router()
const roomController = require("../controller/roomController");
const { route } = require('./searchRouter');
//CREATE
router.post("/create",  roomController.createRoom);

//UPDATE
router.put("/availability/:id", roomController.updateRoomAvailability);
router.put("/:id", roomController.updateRoom);
//DELETE
router.delete("/:id/:hotelid", roomController.deleteRoom);
//GET
router.get("/getAllRoomDate/:id", roomController.getAllRoomDate);
// router.get("/:id", roomController.getRoom);
//GET ALL
router.get('/unavailableDates/:roomId', roomController.getUnavailableDatesForRoom);
router.get("/", roomController.getRooms);
router.get("/find/:id", roomController.getRoom);
router.get("/:slug", roomController.getRoomSlug);
router.get("/hotel/:id", roomController.getRoomByHotel);
router.post("/checkDate/:id", roomController.checkRoomDate);
module.exports =  router;
