const express = require("express");
const router = express.Router();
const pageController = require("../controllers/pageController");

//Articles (Category page)
router.get("/:categoryName", pageController.renderCategoryPage());

//Article (Single page)
router.get("/:categoryName/:articleTitle", pageController.renderArticlePage());

module.exports = router;
