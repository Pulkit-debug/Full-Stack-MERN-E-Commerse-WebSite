const Category = require("../models/category");

// route controller to get a particular category ID (kind of a backbone)

exports.getCategoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, cate) => {
    if (err) {
      return res.status(400).json({
        error: "Category not found in DB",
      });
    }

    req.category = cate;
    next();
  });
};

// router controller to create a new category

exports.createCategory = (req, res) => {
  const category = new Category(req.body);
  category.save((err, category) => {
    if (err) {
      return res.status(400).json({
        error: "Not able to save Category in DB",
      });
    }
    res.json(category);
  });
};

// route controller to get one single category

exports.getCategory = (req, res) => {
  res.json(req.category);
};

// route controller to get all the categories present in the Database
exports.getAllCategory = (req, res) => {
  Category.find().exec((err, categories) => {
    if (err) {
      return res.status(400).json({
        error: "No Categories Found!",
      });
    }
    res.json(categories);
  });
};

exports.updateCategory = (req, res) => {
  // Here we are able to grab the req.category becasuse of the parameter middleware that we wrote at the top.
  const category = req.category;
  category.name = req.body.name;
  // req.body.name will grab the name that is being edited on the front end and then that detail will be updated in the category.name

  category.save((err, updatedCategory) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to update category",
      });
    }
    res.json(updatedCategory);
  });
};

exports.removeCategory = (req, res) => {
  const category = req.category;
  category.remove((err, category) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to Delete Category",
      });
    }
    res.json({
      message: `Successfully Deleted category - ${category.name}`,
    });
  });
};