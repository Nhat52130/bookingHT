const Featured = require('../module/featured');

const featuredController = {
  // Create
  create: async (req, res, next) => {
    try {
      const featured = new Featured(req.body);
      await featured.save();
      res.status(201).json(featured);
    } catch (err) {
      next(err);
    }
  },

  // Update
  update: async (req, res, next) => {
    try {
      const featured = await Featured.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.status(200).json(featured);
    } catch (err) {
      next(err);
    }
  },

  // Delete
  delete: async (req, res, next) => {
    try {
      await Featured.findByIdAndRemove(req.params.id);
      res.status(200).json({ message: 'Deleted successfully' });
    } catch (err) {
      next(err);
    }
  },

  // Get all
  getAll: async (req, res, next) => {
    try {
      const featured = await Featured.find({});
      res.status(200).json(featured);
    } catch (err) {
      next(err);
    }
  },

  // Get by hotel id
  getByHotelId: async (req, res, next) => {
    try {
      const featured = await Featured.find({ hotelId: req.params.hotelId });
      res.status(200).json(featured);
    } catch (err) {
      next(err);
    }
  },
};

module.exports = featuredController;