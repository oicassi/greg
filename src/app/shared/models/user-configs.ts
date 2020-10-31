import { FileGregs } from './file-greg';
/**
 * Modelo utilizado da pagina configurações
 */
export class UserConfigs {
    nome: number;
    sobrenome: string;
    email: string;
    imagemUsuario: FileGregs;
    urlPagina: string;
    senhaAntiga: any;
    senhaNova: any;
}