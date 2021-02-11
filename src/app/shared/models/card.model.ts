export class Card {
  constructor(nome: string, tags: string[], avatar: string, url: string) {
    this.nome = nome;
    this.tags = tags;
    this.avatar = avatar;
    this.url =  url;
  }

  nome: string;
  url: string;
  avatar: string;
  tags: string[];
}
