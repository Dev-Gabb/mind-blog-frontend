# 💻 Mind Blog - Frontend (React + TypeScript)

Interface web desenvolvida para o case do processo seletivo da **Mind Group**. O projeto é uma aplicação moderna e responsiva para um blog, consumindo a API REST do backend.

---

## 🛠️ Tecnologias Utilizadas

- **Biblioteca Principal:** React
- **Linguagem:** TypeScript
- **Ferramenta de Build:** Vite
- **Estilização:** Tailwind CSS
- **Roteamento:** React Router (v6)
- **Requisições HTTP:** Axios
- **Ícones:** Lucide React

---

## 📌 Funcionalidades

- **Autenticação de Usuários:**
  - Login e Cadastro com persistência do Token JWT e dados do usuário no `localStorage`.
  - Proteção de rotas e exibição condicional do menu (Login/Cadastro vs. Perfil/Sair).
- **Gerenciamento de Artigos (CRUD):**
  - **Listagem (Read):** Visualização de todos os artigos postados com tratamento automático para falhas de carregamento de imagens (fallback).
  - **Criação (Create):** Formulário para publicação de novos artigos (restrito a usuários logados).
  - **Edição (Update):** Alteração de título, conteúdo e URL de imagem dos artigos do próprio autor.
  - **Exclusão (Delete):** Remoção de artigos com confirmação de segurança (restrito ao autor).

---

## 📋 Pré-requisitos

- Node.js (versão 18 ou superior)
- Backend da aplicação em execução (disponível na porta `3001` por padrão)

---

## ⚙️ Passo a Passo para Instalação e Execução

### 1. Clonar o Repositório

```bash
git clone [https://github.com/Dev-Gabb/mind-blog-frontend.git](https://github.com/Dev-Gabb/mind-blog-frontend.git)
cd mind-blog-frontend
