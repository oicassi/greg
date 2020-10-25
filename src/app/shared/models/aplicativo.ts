import { Foto, Repo, Audio } from './aplicativo-item';

/**
 * Comum para todos os aplicativos
 */
export class AplicativoBase {
  component_name: string;
  order: number;
  type: string;
  bgColor: string;
  fgColor: string;
}

/**
 * Comum para os aplicativos que utilizam APIs externas
 */
export class AplicativoApi extends AplicativoBase {
  username: string;
  description: string;
  profile_url: string;
  avatar_img: string;
}

/**
 * Classe com os dados do aplicativo Flickr
 */
export class AplicativoFlickr {
  full_name: string;
  alias: string;
  photo_array: Foto[];
}

/**
 * Classe com os dados do aplicativo Github
 */
export class AplicativoGithub {
  repo_array: Repo[];
}

/**
 * Classe com os dados do aplicativo Freesound
 */
export class AplicativoFreesound {
  audio_array: Audio[];
}

