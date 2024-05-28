const express = require("express");
const userController = require("../controller/userController");

const router = express.Router();

//UPDATE
router.put("/:id", userController.updateUser);

//DELETE
router.delete("/:id", userController.deleteUser);

//GET
router.get("/:id", userController.getUser);

//GET ALL
router.get("/",userController.getUsers);

module.exports = router;
