const createArticle = (item) => {
  return Object.freeze({
    id: item.id,
    date: new Date(item.date),
    slug: item.slug,
    categories: item.categories,
    excerpt: item.excerpt.rendered.replace(/<[^>]+>/g, ""),
    content: item.content.rendered.replace(/<[^>]+>/g, ""),
    title: item.seoTitle || item.title.rendered,
    seoTitle: item.seoTitle,
    description: item.seoDescription,
    author: item.parsely.meta.creator[0],
    image: item.jetpack_featured_media_url,
    canonicalUrl: item.canonical_url,
  });
};

module.exports = createArticle;
