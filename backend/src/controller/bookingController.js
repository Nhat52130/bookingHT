const Booking = require("../module/BookingModule");
const User = require("../module/UserModule");
const Room = require("../module/RoomModule");

const bookingController = {
  create: async (req, res) => {
    const leaveId = req.body.leaveId;
    const bookingData = req.body;
    if (!leaveId) {
      return res.status(400).json("User id is required");
    }
    try {
      const booking = new Booking({
        leaveId: leaveId,
        name: bookingData.name,
        phone: bookingData.phone,
        rooms: bookingData.rooms.map((room) => ({
          roomId: room.roomId,
          price: room.price,
          roomNumbers: room.roomNumbers.map((roomNumber) => ({
            number: roomNumber.number,
            unavailableDates: roomNumber.unavailableDates,
          })),
        })),
        //active: bookingData.active,
      });
      // for (const room of booking.rooms) {
      //   for (const roomNumber of room.roomNumbers) {
      //     await Room.updateOne(
      //       { _id: room.roomId, "roomNumbers.number": roomNumber.number },
      //       {
      //         $push: {
      //           "roomNumbers.$.unavailableDates": {
      //             $each: roomNumber.unavailableDates,
      //           },
      //         },
      //       }
      //     );
      //   }
      // }
      const savedBooking = await booking.save();
      res.status(200).json(savedBooking);
    } catch (error) {
      console.error("Error creating booking:", error);
    }
  },
  getAll: async (req, res) => {
    try {
      const booking = await Booking.find();
      res.status(200).json(booking);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getOne: async (req, res) => {
    try {
      const booking = await Booking.findById(req.params.id);
      res.status(200).json(booking);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  delete: async (req, res) => {
    try {
      const booking = await Booking.findByIdAndDelete(req.params.id);
      if (!booking) {
        res.status(404).json("No booking found");
      }
      res.status(200).json(booking);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getbookingLeaveById: async(req, res) => {
    try {
      const booking = await Booking.find({ leaveId: req.params.leaveId });
      res.status(200).json(booking);
    } catch (error) {
      res.status(500).json(error);
    }
  }
};
module.exports = bookingController;
