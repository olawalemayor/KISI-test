class ArticleService {
  #articlesRepo; //Repository
  #Mail;

  constructor(articlesRepo, Mail) {
    this.#articlesRepo = articlesRepo;
    this.#Mail = Mail;
  }

  async getArticleCategories() {
    const result = await this.#articlesRepo.getArticleCategories();

    if (result) return result;

    return Promise.resolve({ data: [] });
  }

  async getSingleArticle(articleTitle) {
    const result = await this.#articlesRepo.getSingleArticle(articleTitle);
    if (result) return result;

    return null;
  }

  //The categoryName is the slug
  async getArticlesByCategory(categoryName, pagination, pageNumber) {
    const result = await this.#articlesRepo.getArticlesByCategory(
      categoryName,
      pagination,
      pageNumber
    );

    if (result) return result;

    return Promise.resolve({ data: [] });
  }

  async searchArticle(query, pagination, pageNumber) {
    const result = await this.#articlesRepo.searchArticle(
      query,
      pagination,
      pageNumber
    );

    if (result) return result;

    return Promise.resolve({ data: [] });
  }

  async sendMail(name, email, color) {
    const result = await this.#Mail.sendMail(name, email, color);
    if (result) return result;
  }
}

module.exports = ArticleService;
