const express = require('express')
const router = express.Router()
const searchRoute = require("../controller/searchController");

router.get("/", searchRoute.searchRoom);
module.exports = router