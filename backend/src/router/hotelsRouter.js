const express = require("express");
const router = express.Router();
const hotelsRouter = require("../controller/hotelController");
const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

const middleware = require("../middleware/middleware");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Thư mục lưu trữ tập tin
  },
  filename: function (req, file, cb) {
    crypto.randomBytes(16, (err, buf) => {
      if (err) {
        return cb(err);
      }
      const fileName = buf.toString('hex') + path.extname(file.originalname);
      cb(null, fileName);
    });
  },
});

const upload = multer({ storage: storage });

//CREATE
router.post("/create", upload.array('photos', 12),middleware.verifyUser,hotelsRouter.createHotel);

//UPDATE
router.put("/:id", middleware.verifyUser,hotelsRouter.updateHotel);
//DELETE
router.delete("/:id", middleware.verifyUser,hotelsRouter.deleteHotel);
//GET

router.get("/:slug", hotelsRouter.getHotelSlug);
router.get("/find/:id", hotelsRouter.getHotel);
// router.get("/find/user/:id", middleware.verifyUser,hotelsRouter.getHotelsByUserIdJwt);
router.get("/find/user/:id", hotelsRouter.getHotelByIdUser);
//GET ALL

router.get("/", hotelsRouter.getHotels);
router.get("/countByCity", hotelsRouter.countByCity);
router.get("/countByType", hotelsRouter.countByType);
router.get("/room/:id", hotelsRouter.getHotelRooms);
router.get("/find/category/:category", hotelsRouter.getHotelByCategory);
module.exports = router;
