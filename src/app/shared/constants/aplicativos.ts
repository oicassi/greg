import { FlickrComponent } from '@aplicativos/flickr/flickr.component';
import { FotosComponent } from '@aplicativos/fotos/fotos.component';
import { FreesoundComponent } from '@aplicativos/freesound/freesound.component';
import { GithubComponent } from '@aplicativos/github/github.component';
import { TagsComponent } from '@aplicativos/tags/tags.component';
import { TextoComponent } from '@aplicativos/texto/texto.component';

/**
 * Constantes com referência aos aplicativos
 */
export class AplicativosConstants {

  static FLICKR = FlickrComponent;
  static FOTOS = FotosComponent;
  static FREESOUND = FreesoundComponent
  static GITHUB = GithubComponent;
  static TAGS = TagsComponent;
  static TEXTO = TextoComponent;
}

export class AplicativosModels {
  static TODOS = [
    {
      type: 'flickr',
      label: 'Flickr'
    },
    {
      type: 'fotos',
      label: 'Fotos'
    },
    {
      type: 'freesound',
      label: 'Freesound'
    },
    {
      type: 'github',
      label: 'Github'
    },
    {
      type: 'tags',
      label: 'Tags'
    },
    {
      type: 'texto',
      label: 'Texto'
    },
  ]
  
  static TIPOS_API = [
    'flickr',
    'freesound',
    'github'
  ]
}

