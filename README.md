# 📒 Agenda de Contatos - Instituto Pata e Coração

Este projeto foi desenvolvido como parte de um trabalho acadêmico com o objetivo de construir uma aplicação CRUD em C# que tivesse aplicação prática no mundo real, especialmente com foco em ajudar alguma instituição.

Pensando nisso, criamos uma **Agenda de Contatos** voltada para uso em uma clínica veterinária ou instituição de cuidados animais, como o **Instituto Pata e Coração**.

---

## 🎯 Objetivo

Desenvolver uma API RESTful utilizando **C# com .NET 9**, integrada com um front-end simples e responsivo para o gerenciamento de contatos (clientes, responsáveis por pets, etc). A aplicação permite:

- ✅ Criar, visualizar, editar e excluir contatos
- ✅ Agrupar contatos por grupos personalizados
- ✅ Autenticar usuários (cadastro e login)

---

## ⚙️ Tecnologias Utilizadas

### 🧠 Back-end
- C# com .NET 9
- ASP.NET Core Web API
- SQL Server (persistência dos dados)
- Entity Framework Core

### 🎨 Front-end
- HTML5, CSS3
- Bootstrap 5
- JavaScript puro (Fetch API)

---

## 🔌 Endpoints da API

| Verbo HTTP | Rota             | Descrição                       |
|------------|------------------|---------------------------------|
| `GET`      | /api/Contato     | Lista todos os contatos         |
| `POST`     | /api/Contato     | Cria um novo contato            |
| `PUT`      | /api/Contato/{id}| Atualiza um contato existente   |
| `DELETE`   | /api/Contato/{id}| Remove um contato               |

Também há endpoints para **grupos de contatos** e **usuários (login e cadastro)**.

---

## 🖥️ Como Rodar o Projeto

### 🔧 Back-end (API)

1. Acesse a pasta do projeto da API:
   ```bash
   cd Api
