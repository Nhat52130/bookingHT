const express = require('express');
const router = express.Router();
const featuredController = require('../controller/featuredController');

// Create
router.post('/', featuredController.create);

// Update
router.put('/:id', featuredController.update);

// Delete
router.delete('/:id', featuredController.delete);

// Get all
router.get('/', featuredController.getAll);

// Get by hotel id
router.get('/hotel/:hotelId', featuredController.getByHotelId);

module.exports = router;