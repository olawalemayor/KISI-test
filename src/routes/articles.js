const express = require("express");
const router = express.Router();
const pageController = require("../controllers/pageController");

//Articles (Category page)
router.get("/:categoryName", (req, res) =>
  pageController.renderCategoryPage(req, res)
);

//Article (Single page)
router.get("/:categoryName/:articleTitle", (req, res) =>
  pageController.renderArticlePage(req, res)
);

module.exports = router;
