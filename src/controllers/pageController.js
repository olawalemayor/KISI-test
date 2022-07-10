const Articles = require("../articles/index");
const Mail = require("../mail");
const ArticleService = require("../services/index");
const path = require("path");

class PageController {
  #articleService;

  constructor(articleService) {
    this.#articleService = articleService;
  }

  renderHome() {
    return (req, res) =>
      this.#articleService.getArticleCategories().then((categories) => {
        //render with custom meta properties
        res.render("index", {
          title: "Home",
          categories,
          stylesheet: "home",
        });
      });
  }

  renderCategoryPage() {
    return (req, res) => {
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
    };
  }

  renderArticlePage() {
    return (req, res) => {
      const { articleTitle, categoryName } = req.params;

      this.#articleService.getSingleArticle(articleTitle).then((article) => {
        //render with custom meta properties
        res.render("article", {
          title: article.title,
          article,
          categoryName,
          stylesheet: "article",
          description: article.description,
          author: article.author,
          ogImage: article.image,
          ogUrl: path.join(categoryName, articleTitle),
        });
      });
    };
  }

  renderSearchResults() {
    return async (req, res) => {
      const { query, page, limit } = req.query;

      const articles = await this.#articleService.searchArticle(
        query,
        limit,
        page
      );

      //Conditionally render search result or not found page based on the availability of result
      articles.length
        ? //render result
          res.render("search", {
            title: query,
            articles,
            stylesheet: "search",
          })
        : // OR Not found page
          this.render404Page();
    };
  }

  render404Page() {
    return (req, res) =>
      res.render("404", { title: "Page not found", stylesheet: "404" });
  }

  postMail() {
    return async (req, res) => {
      let { name, email, color } = req.body;

      const result = await this.#articleService.sendMail(name, email, color);

      if (!result) return res.status(500);

      //set response and redirect to home
      res.status(200).redirect("/");
    };
  }
}

const articles = new Articles();
const mail = new Mail();
const articleService = new ArticleService(articles, mail);
const pageController = new PageController(articleService);

module.exports = pageController;
