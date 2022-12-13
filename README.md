# driven-projeto16-boardcamp

* **Projeto #16 - Boardcamp** do aluno Luiz Cláudio F. Fernandez, Turma 8 da Driven.

* **Deploy** (vulgo *Link da Titia*): https://projeto16-boardcamp-api.onrender.com

* Front-end do projeto: https://github.com/bootcamp-ra/boardcamp-front.

---

## Instruções para rodar localmente

* Certifique-se de ter o [Git](https://git-scm.com/), [Node](https://nodejs.org/en/) (ou [NVM](https://github.com/nvm-sh/nvm)) e [PostgreSQL](https://www.postgresql.org/download/) instalados e configurados.

* Baixe ou clone o projeto na sua máquina local.

* Certifique-se de que o servidor do PostgreSQL esteja rodando.

* Crie o banco de dados abrindo um terminal no diretório `./database-boardcamp` e executando o comando:

    ```
    bash ./create-database
    ```

* No diretório criado, instale as dependências do projeto com o comando:

    ```
    npm i
    ```

    ou

    ```
    npm install
    ```

- Com base no arquivo `.env.example`, crie um arquivo `.env` preenchendo as variáveis de acordo com a configuração padrão do banco criado anteriormente ou com os devidos ajustes baseados na sua configuração local. Por padrão, o banco exigirá a seguinte configuração:

    ```
    DATABASE_URL=postgres://bootcamp_role:senha_super_hiper_ultra_secreta_do_role_do_bootcamp@localhost:5432/boardcamp
    ```

    - Observação: não sendo especificado, a aplicação tentará rodar na porta 4000. Caso queira que outra porta seja utilizada, crie e preencha a varíavel `PORT` também no `.env`.

* Altere no arquivo `./src/database/database.js` o valor de `ssl` de `true` para `false`.

* Rode o projeto no ambiente de desenvolvimento com o comando:

    ```
    npm run dev
    ```

* Um servidor local estará rodando na porta 4000 (ou outra especificada no `.env`) ao ser retornado a mensagem:

    ```
    Server running on port 4000
    ```