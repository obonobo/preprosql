export default class Article {
  readonly name: string;

  readonly src: string;

  constructor({ name = "", src = "" }: { name?: string; src?: string }) {
    this.name = name;
    this.src = src;
  }

  with({ name, src }: { name?: string; src?: string }): Article {
    return new Article({
      name: name ?? this.name,
      src: src ?? this.src,
    });
  }
}
