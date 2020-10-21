export interface Usuario {
    id: number;
    email: string;
    password: string;
    nome: string;
    sobrenome: string;
    token: string;
    url: string;

    // expiração
    exp:number;
    // entrada
    iat: number;
    // nome
    sub: string;
}