# GREG

## Como instalar e rodar:

Para o funcionamento da aplicação, primeiramente é necessário estar com o back-end configurado (Java + PostgreSQL + neo4j). Além disso, deve-se inserir as APIs keys para que as requests possam ser realizadas para as APIs de terceiro. Após isso, basta instalar as dependência e executar a aplicação. Os passos serão listados a seguir:

1. Certifique-se de ter o [Node instalado (e o NPM)](https://nodejs.org/en/) 
> Detalhe: O Node deve estar pelo menos na versão 12

2. Certifique-se de ter o [Angular instalado ](https://angular.io/)
> Detalhe: A versão do Agular usada nesta aplicação é a 8

3. Certifique-se de que o back-end está em funcionamento. Isso envolve: neo4j com um banco de dados criado, postgreSQL com um banco de dados com o nome `gregs` criado e o código em java com as dependências instaladas e os arquivos de configuração atualizados com as informações dos bancos de dados. O que deve ser alterado está em:
`src/main/resources/application.properties` alterar o username e a senha do banco de dados
`java/br.ufpr.tcc.gregs.graph/Neo4JSessionFactory.java` alterar o user e a senha para acessar o banco de dados em grafo (neo4j)

4. Inserir as API keys para acessar o **Flickr** e o **Freesound**. Isso é feito alterando os seguinte arquivo:
`src/app/core/_services/api.service.ts` Atribuir o valor das APIs às seguintes variávies: `flickrApiKey` (API Key do flickr) e `freesoundApiKey` (API Key do freesound)

5. Instalar as dependências usando o npm. Basta executar o seguinte comando na pasta raíz da aplicação:
```bash
npm install
```
6. Por fim, basta executar a aplicação. Normalmente uma aplicação Angular é executada com o comando `ng serve`, porém neste caso deve-se utilizar o comando `npm start` pois este executa um script para habilitar um proxy para acessar a API do freesound (sem o proxy não era possível a comunicação com tal API)



#### Observações
Para adquirir as API keys, basta acessar as páginas de cada API, criar um cadastro e seguir as instruções:

- [API Flickr](https://www.flickr.com/services/developer/)
- [API Freesound](https://freesound.org/docs/api/)
