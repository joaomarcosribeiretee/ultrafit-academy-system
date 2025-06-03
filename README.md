# 🏋️ UltraFit Academy System

Sistema web para **professores de academias** gerenciarem alunos, treinos e avaliações físicas de forma prática, moderna e centralizada.  
O sistema visa substituir planilhas e métodos manuais, proporcionando maior organização e eficiência no dia a dia do profissional da área.

---

## 📥 Clonando o Projeto

```bash
git clone https://github.com/joaomarcosribeiretee/ultrafit-academy-system.git
```

Depois, siga os passos abaixo para rodar o backend e o frontend.

---

## 📌 Funcionalidades

- ✅ Cadastro de alunos com dados pessoais  
- ✅ Criação de treinos personalizados (com grupos musculares e exercícios)  
- ✅ Vinculação de treinos aos alunos  
- ✅ Registro e visualização de avaliações físicas  
- ✅ Edição e exclusão de treinos e alunos  
- ✅ Interface focada na usabilidade por professores  

---

## 🛠️ Tecnologias Utilizadas

**Frontend:** HTML, CSS, JavaScript  
**Backend:** Node.js, Express  
**Banco de Dados:** MySQL  

---

## ⚙️ Como Executar o Projeto

### 🔧 Pré-requisitos

Você precisa ter instalado:

- Node.js  
- npm  
- MySQL  

---

### 🗃️ Configuração do Banco de Dados

1. Inicie o MySQL localmente.  
2. Crie o banco e as tabelas com o script que está em:

```
/backend/src/db/sistema_academia.sql
```

3. Verifique as credenciais de acesso no arquivo `server.js` (usuário, senha, nome do banco).

---

### 🖥️ Rodando o Backend

Abra um terminal e execute:

```bash
cd backend
cd src
node server.js
```

A API será iniciada na porta `3001`.

---

### 💻 Rodando o Frontend

Em outro terminal, execute:

```bash
cd frontend
npm install     # (apenas na primeira vez)
npm start
```

O sistema abrirá automaticamente no navegador (geralmente em `http://localhost:3000`).

---

## 📂 Estrutura do Projeto

```
ultrafit-academy-system/
├── backend/
│   └── src/
│       ├── db/
│       │   └── sistema_academia.sql
│       ├── routes/
│       └── server.js
├── frontend/
│   ├── html/
│   ├── js/
│   ├── css/
└── README.md
```

---

## 🔐 Segurança e Persistência

- Todos os dados são armazenados de forma segura em banco MySQL.  
- A estrutura do projeto facilita manutenção e expansão futura.

---

## 👥 Autores

- André Cavalcanti Teles Dos Santos  
- Felipe Casagrande Espel  
- Guilherme Diniz Leocadio  
- Gustavo Leite Ioels  
- João Marcos Ribeirete Garbelini  
- Vitor Assunção Silva  
