const Category = require("../module/categories");

const categoriesController = {
  //tạo category sau đó lưu vào mongodb
  addCategory: async (req, res) => {
    try {
      const newCategory = new Category(req.body);
      const saveCategory = await newCategory.save();
      res.status(200).json(saveCategory);
    } catch (error) {
      console.log(error);
    }
  },

  //cập nhật cateogory bằng params
  updateCategory: async (req, res) => {
    try {
      const updatedCategory = await Category.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedCategory);
    } catch (err) {
      next(err);
    }
  },
  
  //cập nhật xóa category bằng params
  deleteCategory: async (req, res) => {
    try {
      await Category.findByIdAndDelete(req.params.id);
    } catch (error) {
      console.log(error);
    }
  },

  // láy tất cả category
  getCategories: async (req, res) => {
    try {
      const categories = await Category.find();
      res.status(200).json(categories);
    } catch (error) {
      console.log(error);
    }
  },
  //láy category bằng id
  getCategory: async (req, res) => {
    try {
      const category = await Category.findById(req.params.id);
      res.status(200).json(category);
    } catch (error) {
      console.log(error);
    }
  },
};
module.exports = categoriesController;
