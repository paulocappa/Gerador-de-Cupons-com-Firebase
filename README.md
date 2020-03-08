# Gerador de Cupons Utilizando Firebase

`Responsável pela criação, edição e remoção de cupons utilizando NodeJS, ReactJS e Firebase`

- Desenvolvido a parte funcional (backend) que fica responsável pela conexão com o banco de dados Firebase, e que também é responsável por validar as informações vindas do frontend

- Desenvolvido o frontend com ReactJS, utilizado react-router-dom para fazer SPA, evitando recarregamentos na página

## Como utilizar:

1 - Clone este repositório

2 - Na pasta onde você clonou o repositório execute o comando `yarn` (será necessário instalar o yarn caso não o tenha) tanto na pasta backend quanto na frontend para instalar as dependências do repositório

3 - No firebase, inicie um novo projeto e ative o `Realtime Database`

4 - Copie as configurações do seu projeto para o arquivo que está dentro de `backend/src/config/database`, apenas preencha os valores no objeto com as configurações do seu projeto.

4 - Execute o comando `cd ./backend` e inicie o servidor com `yarn dev`, deixe-o executando e abra um novo terminal

5 - No novo terminal vá até o diretório onde foi clonado o repositório e execute o comando `cd ./frontend` e após `yarn start`. O site irá abrir e estará pronto para serem criados novos cupons!

## Imagens da aplicação

![Listagem de Cupons](https://user-images.githubusercontent.com/50975031/76172875-c9554580-6178-11ea-9c9c-55664d821079.png)

![Cadastro de Cupons](https://user-images.githubusercontent.com/50975031/76172885-e38f2380-6178-11ea-8f95-51a5258c1875.png)

![Excluir Cupom](https://user-images.githubusercontent.com/50975031/76172921-2a7d1900-6179-11ea-9bc6-bc33800586b5.png)

![Editar Cupom](https://user-images.githubusercontent.com/50975031/76172922-2a7d1900-6179-11ea-9174-a04b664f5cf0.png)
