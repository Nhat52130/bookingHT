const express = require('express')
const router = express.Router()
const categoriesController = require("../controller/categoriesController");
router.get("/", categoriesController.getCategories);
router.get("/:id", categoriesController.getCategory);
router.post("/create", categoriesController.addCategory);
router.put("/update/:id", categoriesController.updateCategory);
router.delete("/delete/:id", categoriesController.deleteCategory);
module.exports = router;
