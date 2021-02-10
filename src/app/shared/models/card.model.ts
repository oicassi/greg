export class Card {
  constructor(nome: string, tags: string[], url: string) {
    this.nome = nome;
    this.tags = tags;
    this.avatar = url;
  }

  nome: string;
  url: string;
  avatar: string;
  tags: string[];
}
