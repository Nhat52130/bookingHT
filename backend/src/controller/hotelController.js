const Hotel = require("../module/HotelModule");
const Room = require("../module/RoomModule");
const jwt = require('jsonwebtoken');

const hotelController = {
  createHotel: async (req, res, next) => {
  
    let imagePaths = req.files.map((file) => file.path);
    const hotelData = {
      ...req.body,
      photos: imagePaths,
      userId: req.user.id,
    };
    const newHotel = new Hotel(hotelData);

    try {
      await newHotel.save();
      res.status(200).json("create hotel success.");
    } catch (err) {
      next(err);
    }
  },
  updateHotel: async (req, res, next) => {
    try {
      const updatedHotel = await Hotel.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedHotel);
    } catch (err) {
      next(err);
    }
  },
  deleteHotel: async (req, res, next) => {
    try {
      await Hotel.findByIdAndDelete(req.params.id);
      res.status(200).json("Hotel has been deleted.");
    } catch (err) {
      next(err);
    }
  },
  getHotelSlug: async (req, res, next) => {
    try {
      const hotel = await Hotel.findOne({ slug: req.params.slug });
      res.status(200).json(hotel);
    } catch (err) {
      next(err);
    }
  },
  getHotelsByUserIdJwt: async (req, res, next) => {
    try {
      const hotels = await Hotel.find({ userId: req.user.id });
      res.status(200).json(hotels);
    } catch (err) {
      console.log(err);
      next(err);
    }
  },
  getHotelByIdUser: async(req,res,next) => {
    try {
      const hotels = await Hotel.find({ userId: req.params.id });
      res.status(200).json(hotels);
    } catch (err) {
      console.log(err);
      next(err);
    }
  },
  getHotel: async (req, res, next) => {
    try {
      const hotel = await Hotel.findById(req.params.id);
      res.status(200).json(hotel);
    } catch (err) {
      next(err);
    }
  },
  getHotels: async (req, res, next) => {
    // const { min, max, ...others } = req.query;
    try {
      const hotels = await Hotel.find({
        // ...others,
        // cheapestPrice: { $gt: min | 1, $lt: max || 999 },
      });
      res.status(200).json(hotels);
    } catch (err) {
      next(err);
    }
  },
  getHotelByCategory: async (req, res, next) => {
    try {
      const hotels = await Hotel.find({ category: req.params.category });
      res.status(200).json(hotels);
    } catch (err) {
      next(err);
    }
  },
  countByCity: async (req, res, next) => {
    const cities = req.query.cities.split(",");
    try {
      const list = await Promise.all(
        cities.map((city) => {
          return Hotel.countDocuments({ city: city });
        })
      );
      res.status(200).json(list);
    } catch (err) {
      next(err);
    }
  },
  countByType: async (req, res, next) => {
    try {
      const hotelCount = await Hotel.countDocuments({ type: "hotel" });
      const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
      const resortCount = await Hotel.countDocuments({ type: "resort" });
      const villaCount = await Hotel.countDocuments({ type: "villa" });
      const cabinCount = await Hotel.countDocuments({ type: "cabin" });

      res.status(200).json([
        { type: "hotel", count: hotelCount },
        { type: "apartments", count: apartmentCount },
        { type: "resorts", count: resortCount },
        { type: "villas", count: villaCount },
        { type: "cabins", count: cabinCount },
      ]);
    } catch (err) {
      next(err);
    }
  },
  getHotelRooms: async (req, res, next) => {
    try {
      const hotel = await Hotel.findById(req.params.id);
      const list = await Promise.all(
        hotel.rooms.map((room) => {
          return Room.findById(room);
        })
      );
      res.status(200).json(list);
    } catch (err) {
      next(err);
    }
  },
};
module.exports = hotelController;
