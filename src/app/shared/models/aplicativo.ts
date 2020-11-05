import { Foto, Repo, Audio, Texto } from '@models/aplicativo-item';

/**
 * Comum para todos os aplicativos
 */
export class AplicativoBase {
  component_name: string = '';
  order: number = null;
  type: string = '';
  bgColor: string = '#FFFFFF';
  fgColor: string = '#444444';
}

/**
 * Comum para os aplicativos que utilizam APIs externas
 */
export class AplicativoApi extends AplicativoBase {
  username: string = '';
  description: string = '';
  profile_url: string = '';
  avatar_img: string = '';
}

/**
 * Classe com os dados do aplicativo Flickr
 */
export class AplicativoFlickr extends AplicativoApi {
  full_name: string = '';
  alias: string = '';
  photo_array: Foto[] = [];
}

/**
 * Classe com os dados do aplicativo Github
 */
export class AplicativoGithub extends AplicativoApi {
  repo_array: Repo[] = []
}

/**
 * Classe com os dados do aplicativo Freesound
 */
export class AplicativoFreesound extends AplicativoApi {
  audio_array: Audio[] = [];
}

/**
 * Classe com os dados do componente fotos
 */
export class AplicativoFoto extends AplicativoBase {
  photo_array: Foto[] = [];
}

/**
 * Classe com os dados do componente texto
 */
export class AplicativoTexto extends AplicativoBase {
  texto_array: Texto[] = []
}

/**
 * Classe com os dados do componente de tags
 */
export class AplicativoTags extends AplicativoBase {
  tag_array: string[] = []
}

