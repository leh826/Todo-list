<h1 align="center">Lista de Tarefas</h1>
<p align="center"><i>Uma lista de tarefas web, focada em tarefas de gestão de software</i></p>

## Sobre esse projeto
As tarefas contém os campos a seguir, que são obrigatórios e não nulos, além disso é possível editar cada um:<br>
- Nome<br>
- Custo<br>
- Data limite<br>

## Tecnológias Utilizadas
As tecnologias utilizadas na construção do projeto foram:
- React 
- PostgREST como API de comunicação com Banco de dados
- PostgSQL como Banco de dados relacional para armazenamento dos dados.
- React Context para manipular os dados das tarefas entrem os componentes.<br><br>
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Context-API](https://img.shields.io/badge/Context--Api-000000?style=for-the-badge&logo=react)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![MUI](https://img.shields.io/badge/MUI-%230081CB.svg?style=for-the-badge&logo=mui&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)
### Banco de Dados e API
![image](https://github.com/user-attachments/assets/35c7fd8a-6236-4c7f-9b9e-83bad1066e19)
<div> O projeto também foi usado com experimento para que eu conhecesse o funcionamento da API PostgREST, que me deixou intrigada com sua tecnologia de gerar uma API automaticamente a partir das tabelas do postgreSQL do usuário, um projeto open source incrível e que atendeu as minhas expectativas e funcionou bem para o projeto. Um bonus foi eu não precisar instalar nada em minha máquina, apenas configurar containers e usar docker-compose para utilizar. As configurações dela podem ser conferidas em https://github.com/leh826/Compose-PostgREST</div>

## Ferramentas Utilizadas
- Railway para hospedagem da API postgREST e para banco de dados.
- Visual Studio.
- Nestifly para hospedagem do site.<br><br>
![Netlify](https://img.shields.io/badge/netlify-%23000000.svg?style=for-the-badge&logo=netlify&logoColor=#00C7B7)
![Visual Studio](https://img.shields.io/badge/Visual%20Studio-5C2D91.svg?style=for-the-badge&logo=visual-studio&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
<img src="https://github.com/user-attachments/assets/d2b62a04-bd09-4bfc-9074-81b335444f5d" width="100" /><br>
<div>O Railway foi uma descoberta para o projeto, e foi essencial, me auxiliou com seu sistema que gera automaticamente um banco de dados Postgres gerenciado, que pode ser consultado tanto pelo próprio ambiente como pelo pgAdmin. Além disso, permitindo o deploy de repositorios github e docker, foi fundamental para que conseguisse hospedar a API PostgREST.</div>

## Tela Principal
![home](https://github.com/user-attachments/assets/e2426adc-4e4b-4a5f-9fa9-d2515aab0fb3)

## Como ter acesso?
 ```
 https://todo-list-leh826.netlify.app
```
## Instalação
Passo 1: Clone o repositório em sua maquina com o link 
``` 
git clone "https://github.com/leh826/Todo-list.git"
```
Passo 2: Entre no diretorio 
```
cd Todo-list
```
Passo 3: Instale as dependências via terminal ]
```
npm install
```
Passo 4: Rode o projeto
```
npm run dev
```

## Impressões e experiências com o projeto
Durante este projeto, adquiri experiência e coloquei em prática meus conhecimentos sobre React, Docker, APIs e deploy.<br>
Habilidades: Coloquei em prática habilidades de back-end, como conexão com API, tratamento de erros e verificação de dados.<br>
Dificuldades: Minha principal dificuldade foi implementar a funcionalidade de reordenação das tarefas, especialmente por ter estruturado o projeto em uma tabela e integrado com o servidor de dados, o que não estava familiriazada a realizar. Foi um processo demorado até conseguir desenvolver uma lógica funcional e eficiente, mas estou contente com o resutado.
