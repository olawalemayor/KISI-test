const axios = require("axios");
const lodash = require("lodash");
const createArticle = require("./article");

class Articles {
  #apiURL = process.env.API_URL;

  async getArticleCategories() {
    try {
      const { data } = await axios.get(`${this.#apiURL}categories`);
      return data.map((category) =>
        Object.freeze({
          id: category.id,
          name: category.name,
          slug: category.slug,
        })
      );
    } catch (error) {
      throw error;
    }
  }

  async getSingleArticle(articleTitle) {
    //ArticleTitle is the slug
    try {
      const { data } = await axios.get(
        `${this.#apiURL}posts?slug=${articleTitle}`
      );

      return createArticle(data[0]);
    } catch (error) {
      throw error;
    }
  }

  async getArticlesByCategory(categoryName, pagination, pageNumber) {
    //categoryName is slug in this case
    try {
      //Set pagination
      const perPage = pagination ? pagination : 6;
      const page = pageNumber ? pageNumber : 1;

      //Set category ID then get articles
      const categories = await this.getArticleCategories();
      const category = categories.find(
        (category) => category.slug === categoryName
      );

      const articles = await axios.get(
        `${this.#apiURL}posts?per_page=${perPage}&categories=${
          category.id
        }&page=${page}`
      );

      return articles.data.map((article) => createArticle(article));
    } catch (error) {
      throw error;
    }
  }

  async searchArticle(query, pagination, pageNumber) {
    try {
      //Set pagination
      const perPage = pagination ? pagination : 10;
      const page = pageNumber ? pageNumber : 1;

      //get query results
      const { data: result } = await axios.get(
        `${this.#apiURL}search?search=${query}&per_page=${perPage}&page=${page}`
      );

      return result.map((article) => {
        return {
          name: article.name,
          title: article.title,
          url: article.url,
        };
      });
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Articles;
