import Article from "./Article";

export default class ArticleStore {
  private readonly store: { [name: string]: Article };

  constructor(...articles: Article[]) {
    this.store = articles.reduce((p, c) => ({ ...p, [c.name]: c }), {});
  }

  get articles() {
    return Object.values(this.store);
  }

  getArticle(name: string): Article {
    return this.store[name];
  }

  with(...articles: Article[]) {
    return new ArticleStore(...this.articles.concat(articles));
  }
}
