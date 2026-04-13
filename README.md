# Zaia Uniformes - Sistema de Gestão de Conteúdo

[![Next.js](https://img.shields.io/badge/Next.js-15.0.0-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0.0-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0.0-38B2AC)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-8.9.3-green)](https://www.mongodb.com/)

Sistema completo de landing page e painel administrativo para Zaia Uniformes, com funcionalidades de edição de conteúdo em tempo real, gestão de usuários e upload de imagens.

## 📋 Sobre o Projeto

Este projeto consiste em uma aplicação full-stack moderna para gestão de conteúdo web, desenvolvida com as melhores práticas de desenvolvimento. O sistema permite a criação e edição de páginas web de forma intuitiva através de uma interface administrativa, com recursos avançados de CMS (Content Management System).

### ✨ Funcionalidades Principais

- **🏠 Landing Page Responsiva**: Design moderno e otimizado para todos os dispositivos
- **👨‍💼 Painel Administrativo**: Interface completa para gestão de conteúdo
- **📝 Edição Inline**: Modificação de textos e imagens diretamente na página
- **🖼️ Upload de Imagens**: Sistema de upload com armazenamento na nuvem (Cloudinary)
- **👥 Gestão de Usuários**: Controle de acesso com diferentes níveis de permissão
- **🔐 Autenticação JWT**: Sistema seguro de login e autorização
- **📱 Design Responsivo**: Experiência otimizada para desktop e mobile
- **🎨 Tema Personalizável**: Paleta de cores customizável via Tailwind CSS

## 🏗️ Arquitetura do Projeto

```
zaia-uniformes-site/
├── my-app/                    # Frontend Next.js
│   ├── components/           # Componentes React reutilizáveis
│   ├── contexts/            # Context API para estado global
│   ├── utils/               # Utilitários e configurações
│   ├── public/              # Assets estáticos
│   └── src/app/             # Páginas Next.js (App Router)
├── zaia-backend-node/        # Backend Node.js/Express
│   ├── controllers/         # Controladores da API
│   ├── models/             # Modelos do MongoDB
│   ├── routes/             # Definições das rotas
│   ├── middleware/         # Middlewares personalizados
│   └── config/             # Configurações do banco e upload
└── package.json            # Dependências compartilhadas
```

## 🚀 Tecnologias Utilizadas

### Frontend
- **Next.js 15** - Framework React com App Router
- **TypeScript** - Tipagem estática para maior segurança
- **Tailwind CSS 4** - Framework CSS utilitário
- **Radix UI** - Componentes acessíveis e customizáveis
- **Lucide React** - Ícones modernos e consistentes
- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Validação de dados
- **Axios** - Cliente HTTP para APIs

### Backend
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web minimalista
- **MongoDB** - Banco de dados NoSQL
- **Mongoose** - ODM para MongoDB
- **JWT** - Autenticação baseada em tokens
- **bcryptjs** - Hashing de senhas
- **Cloudinary** - Armazenamento e otimização de imagens
- **Multer** - Processamento de uploads de arquivos

## 📋 Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina:

- **Node.js** (versão 18 ou superior)
- **npm** ou **yarn** ou **pnpm**
- **MongoDB** (local ou Atlas)
- **Git**

### Variáveis de Ambiente

#### Backend (.env)
```env
PORT=5001
MONGODB_URI=mongodb://localhost:27017/zaia-uniformes
JWT_SECRET=sua-chave-secreta-aqui
CLOUDINARY_CLOUD_NAME=seu-cloud-name
CLOUDINARY_API_KEY=sua-api-key
CLOUDINARY_API_SECRET=sua-api-secret
```

#### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:5001/api
```

## 🔧 Instalação e Execução

### 1. Clone o repositório
```bash
git clone https://github.com/ReinaldMendes/contabilizetech-frontend.git
cd zaia-uniformes-site
```

### 2. Instale as dependências

#### Backend
```bash
cd zaia-backend-node
npm install
```

#### Frontend
```bash
cd ../my-app
npm install
```

### 3. Configure o banco de dados
Certifique-se de que o MongoDB está rodando localmente ou configure a string de conexão no arquivo `.env`.

### 4. Execute o projeto

#### Backend (Terminal 1)
```bash
cd zaia-backend-node
npm run dev
```
O servidor backend estará disponível em `http://localhost:5001`

#### Frontend (Terminal 2)
```bash
cd my-app
npm run dev
```
A aplicação frontend estará disponível em `http://localhost:3000`

## 📖 Como Usar

### Primeiro Acesso
1. Acesse `http://localhost:3000/admin/register` para criar o primeiro usuário administrador
2. Faça login em `http://localhost:3000/admin/login`
3. Ative o modo de edição clicando no botão "Admin" no header
4. Comece a editar textos e imagens diretamente na página

### Funcionalidades do CMS
- **Edição de Texto**: Clique em qualquer texto editável para modificá-lo
- **Upload de Imagens**: Clique no ícone de câmera sobre as imagens para substituí-las
- **Gerenciamento de Usuários**: Acesse `/admin/users` para gerenciar usuários
- **Configurações**: Modifique conteúdo através do painel administrativo

## 🧪 Scripts Disponíveis

### Frontend
```bash
npm run dev      # Inicia servidor de desenvolvimento
npm run build    # Build para produção
npm run start    # Inicia servidor de produção
npm run lint     # Executa linting
npm run type-check # Verifica tipos TypeScript
```

### Backend
```bash
npm run dev      # Inicia servidor com nodemon
npm run start    # Inicia servidor de produção
npm run build    # Instala dependências de produção
```

## 🔒 Segurança

- **Autenticação JWT**: Tokens seguros com expiração
- **Hashing de Senhas**: bcryptjs para proteção de senhas
- **Validação de Dados**: Zod para validação de entrada
- **CORS**: Controle de acesso cross-origin
- **Rate Limiting**: Proteção contra ataques de força bruta

## 📱 Responsividade

O sistema é totalmente responsivo e otimizado para:
- 📱 **Mobile** (320px - 768px)
- 📟 **Tablet** (768px - 1024px)
- 💻 **Desktop** (1024px+)

## 🚀 Deploy

### Frontend (Vercel)
```bash
npm run build
# Deploy através do painel do Vercel ou CLI
```

### Backend (Railway, Heroku, etc.)
```bash
npm run build
npm start
# Configure as variáveis de ambiente na plataforma escolhida
```

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

### Padrões de Código
- Use TypeScript para tipagem
- Siga as convenções do ESLint
- Mantenha commits pequenos e descritivos
- Teste suas mudanças antes de submeter

## 📝 Licença

Este projeto está sob a licença ISC. Veja o arquivo `LICENSE` para mais detalhes.

## 👥 Suporte

Para suporte ou dúvidas:
- 📧 **Email**: contato@zaiauniformes.com.br
- 📱 **WhatsApp**: (42) 9866-5220
- 📍 **Localização**: Ponta Grossa, PR

## 🙏 Agradecimentos

- [Next.js](https://nextjs.org/) - Framework React
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS
- [Radix UI](https://www.radix-ui.com/) - Componentes acessíveis
- [Lucide](https://lucide.dev/) - Biblioteca de ícones
- [MongoDB](https://www.mongodb.com/) - Banco de dados

---

**Zaia Uniformes** - Excelência em uniformes profissionais desde 2026 🚀
