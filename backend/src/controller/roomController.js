const Room = require("../module/RoomModule");
const Hotel = require("../module/HotelModule");
const roomController = {
  createRoom: async (req, res, next) => {
    const hotelId = req.body.hotelid;
    let roomData = req.body;

    try {
      const hotel = await Hotel.findById(hotelId);
      if (!hotel) {
        return next(createError(404, "Hotel not found"));
      }
      const newRoom = new Room({ ...roomData, Hotel_id: hotelId });
      await newRoom.save();

      res.status(201).json("Create room successfully.");
    } catch (err) {
      next(err);
    }
  },
  updateRoom: async (req, res, next) => {
    try {
      const updatedRoom = await Room.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedRoom);
    } catch (err) {
      next(err);
    }
  },
  getAllRoomDate: async (req, res, next) => {
    try {
      const room = await Room.findOne({ "roomNumbers._id": req.params.id });
      const roomNumber = room.roomNumbers.id(req.params.id);
      res.status(200).json(roomNumber.unavailableDates);
    } catch (err) {
      next(err);
    }
  },
  getUnavailableDatesForRoom: async (req, res, next) => {
    try {
      // Lấy id của phòng từ request parameters
      const roomId = req.params.roomId;
      // Lấy số phòng từ request query
      const roomNumber = req.query.number;

      // Tìm phòng trong cơ sở dữ liệu dựa trên roomId
      const room = await Room.findById(roomId);

      // Kiểm tra xem phòng có tồn tại không
      if (!room) {
        return res.status(404).json({ message: "Không tìm thấy phòng" });
      }

      // Tìm kiếm số phòng cụ thể trong roomNumbers
      const selectedRoom = room.roomNumbers.find(
        (rm) => rm.number === parseInt(roomNumber)
      );

      // Kiểm tra xem số phòng đã chọn có tồn tại không
      if (!selectedRoom) {
        return res.status(404).json({ message: "Không tìm thấy số phòng" });
      }

      // Trả về unavailableDates của số phòng đã chọn
      res.status(200).json({ unavailableDates: selectedRoom.unavailableDates });
    } catch (error) {
      // Xử lý lỗi nếu có
      console.error(error);
      res
        .status(500)
        .json({ message: "Đã xảy ra lỗi khi lấy unavailableDates" });
    }
  },
  updateRoomAvailability: async (req, res, next) => {
    try {
      await Room.updateOne(
        { "roomNumbers._id": req.params.id },
        {
          $push: {
            "roomNumbers.$.unavailableDates": req.body.dates,
          },
        }
      );
      res.status(200).json("Room status has been updated.");
    } catch (err) {
      next(err);
    }
  },
  checkRoomDate: async (req, res, next) => {
    try {
      const room = await Room.findOne({ "roomNumbers._id": req.params.id });
      const roomNumber = room.roomNumbers.id(req.params.id);

      const newDates = req.body.dates.map((date) => new Date(date));
      if (
        roomNumber.unavailableDates.some((unavailableDate) =>
          newDates.some(
            (newDate) =>
              new Date(unavailableDate).toDateString() ===
              newDate.toDateString()
          )
        )
      ) {
        return res.status(400).json("The date is already unavailable.");
      }
      res.status(200).json("The date is available.");
    } catch (err) {
      next(err);
    }
  },

  deleteRoom: async (req, res, next) => {
    try {
      await Room.findByIdAndDelete(req.params.id);
      res.status(200).json("Room has been deleted.");
    } catch (err) {
      next(err);
    }
  },

  getRoom: async (req, res, next) => {
    try {
      const room = await Room.findById(req.params.id);
      res.status(200).json(room);
    } catch (err) {
      next(err);
    }
  },
  getRoomSlug: async (req, res, next) => {
    try {
      const room = await Room.findOne({ slug: req.params.slug });
      res.status(200).json(room);
    } catch (err) {
      next(err);
    }
  },
  getRoomByHotel: async (req, res, next) => {
    try {
      const room = await Room.find({ Hotel_id: req.params.id });
      res.status(200).json(room);
    } catch (err) {
      next(err);
    }
  },
  getRooms: async (req, res, next) => {
    try {
      const rooms = await Room.find();
      res.status(200).json(rooms);
    } catch (err) {
      next(err);
    }
  },
};

module.exports = roomController;
