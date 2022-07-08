const Articles = require("../articles/index");
const Mail = require("../mail");
const ArticleService = require("../services/index");
const path = require("path");

class PageController {
  #articleService;

  constructor(articleService) {
    this.#articleService = articleService;
  }

  renderHome(req, res) {
    this.#articleService.getArticleCategories().then((categories) => {
      res.render("index", {
        title: "Home",
        categories,
        stylesheet: "home",
      });
    });
  }

  renderCategoryPage(req, res) {
    const { categoryName } = req.params;
    const { page, limit } = req.query;

    //The categoryName is the slug
    this.#articleService
      .getArticlesByCategory(categoryName, limit, page)
      .then((articles) => {
        res.render("articles", {
          title: categoryName,
          articles,
          categoryName,
          stylesheet: "articles",
        });
      });
  }

  renderArticlePage(req, res) {
    const { articleTitle, categoryName } = req.params;

    this.#articleService.getSingleArticle(articleTitle).then((article) => {
      res.render("article", {
        title: article.title,
        article,
        categoryName,
        stylesheet: "article",
        description: article.description,
        ogImage: article.ogImage,
        ogUrl: path.join(categoryName, articleTitle),
      });
    });
  }

  renderSearchResults(req, res) {
    const { query, page, limit } = req.query;

    this.#articleService.searchArticle(query, limit, page).then((articles) => {
      articles.length
        ? res.render("search", {
            title: query,
            articles,
            stylesheet: "search",
          })
        : this.render404Page(req, res);
    });
  }

  render404Page(req, res) {
    res.render("404", { title: "Page not found", stylesheet: "404" });
  }

  async postMail(req, res) {
    const { name, email, color } = req.body;
    const result = await this.#articleService.sendMail(name, email, color);

    if (!result) return res.status(500);

    res.status(200);

    return this.renderHome(req, res);
  }
}

const articles = new Articles();
const mail = new Mail();
const articleService = new ArticleService(articles, mail);
const pageController = new PageController(articleService);

module.exports = pageController;
