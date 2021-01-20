import { BioComponent } from '@aplicativos/bio/bio.component';
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
  static BIO = BioComponent;
}

export class AplicativosModels {
  static TODOS = [
    {
      type: 'bio',
      label: 'Bio'
    },
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
      label: 'GitHub'
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

  static SELECIONAVEIS = [
    {
      type: 'bio',
      label: 'Bio'
    },
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
      type: 'texto',
      label: 'Texto'
    },
  ]
  
  static TIPOS_API = [
    'flickr',
    'freesound',
    'github'
  ]

  static COR_EDITAVEL = [
    'bio',
    'flickr',
    'fotos',
    'freesound',
    'github',
    'texto',
  ]

  static TEXTOS = [
    'texto'
  ]

  static MODAL = [
    'flickr',
    'fotos',
    'freesound',
    'github',
  ]

  static FIXOS = [
    'tags',
    'bio'
  ]

  static INPUT_ARQUIVO = [
    'bio',
    'fotos'
  ]
}

