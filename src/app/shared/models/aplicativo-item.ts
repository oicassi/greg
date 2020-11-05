/**
 * Class de objetos do tipo Foto (Flickr ou fotos locais)
 */
export class Foto {
  name: string = '';
  description: string = '';
  url: string = '';
}

/**
 * Classe de objetos tipo Repositório (Github)
 */
export class Repo {
  name: string = '';
  description: string = '';
  url: string = '';
  data: string = '';
}

/**
 * Class de objetos tipo Audio (Freesound)
 */
export class Audio {
  name: string = '';
  description: string = '';
  url: string = '';
  tags: string[] = [];
}

/**
 * Classe de objetos tipo texto
 */
export class Texto {
  title: string = '';
  body: string = '';
}