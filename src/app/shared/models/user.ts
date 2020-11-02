import { Pessoa } from './pessoa';
import { FileGregs } from './file-greg';
import { Pagina } from './pagina';
export interface Usuario {
    id: number;
    email: string;
    password: string;
    nome: string;
    sobrenome: string;
    authorization: string;
    url: string;
    imagemUsuario: FileGregs;
    pagina: Pagina;
    pessoa:Pessoa;
    tags: string[];

    // expiração
    exp:number;
    // entrada
    iat: number;
    // nome
    sub: string;
}