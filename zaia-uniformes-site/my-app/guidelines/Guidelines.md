# ContabilizeTech Project Guidelines

## Projeto ContabilizeTech - Frontend com Edição Inline

### Visão Geral
Este projeto foi atualizado para conectar com o backend da ContabilizeTech e implementar um sistema completo de edição inline para administradores. O sistema permite que administradores logados editem o conteúdo da landing page diretamente na interface, sem precisar acessar painéis separados.

### Funcionalidades Implementadas

#### 1. Conexão com API Backend
- **URL da API**: `https://contabilizetech-frontend.onrender.com`
- **Autenticação**: JWT token para login de administradores
- **Endpoints de Conteúdo**: GET/PUT/POST/DELETE `/api/content`
- **Sistema de Fallback**: Conteúdo padrão quando API não está disponível

#### 2. Sistema de Edição Inline
- **Componente EditableText**: Permite edição de qualquer texto da página
- **Modo de Edição**: Ativado apenas para administradores logados
- **Interface Intuitiva**: Ícones de edição aparecem ao passar o mouse
- **Salvamento Automático**: Atualizações são enviadas diretamente para a API

#### 3. Contextos Implementados
- **AuthContext**: Gerencia autenticação e detecção de admin
- **ContentContext**: Carrega e gerencia todo o conteúdo da API
- **EditContext**: Controla o modo de edição e mudanças não salvas

#### 4. AdminBar
- **Controles de Edição**: Ativar/desativar modo de edição
- **Status de Salvamento**: Feedback visual de alterações
- **Botão de Atualizar**: Recarrega conteúdo da API
- **Logout Seguro**: Avisa sobre alterações não salvas

### Como Usar o Sistema de Edição

#### Para Administradores:
1. **Login**: Acesse `/login` e faça login com credenciais de administrador
2. **Ativar Edição**: Clique em "Editar" na AdminBar
3. **Editar Conteúdo**: Passe o mouse sobre textos e clique no ícone de edição
4. **Salvar**: As alterações são salvas automaticamente na API
5. **Sair da Edição**: Clique em "Sair da Edição" na AdminBar

#### Componentes Editáveis:
- **Hero Section**: Título, descrição, CTAs e estatísticas
- **Features Section**: Título e descrições
- **Services Section**: Título, descrição e todos os serviços
- **Footer**: Informações de contato, links e copyright

### Estrutura de Conteúdo (Content Keys)

#### Hero Section
- `hero.title`: Título principal
- `hero.description`: Descrição
- `hero.cta.primary`: Botão principal
- `hero.cta.secondary`: Botão secundário
- `hero.stats.companies.number`: Número de empresas
- `hero.stats.companies.label`: Label empresas
- `hero.stats.satisfaction.number`: % satisfação
- `hero.stats.satisfaction.label`: Label satisfação
- `hero.stats.support.number`: Tempo de suporte
- `hero.stats.support.label`: Label suporte

#### Services Section
- `services.title`: Título da seção
- `services.description`: Descrição da seção
- `services.item1.title` até `services.item6.title`: Títulos dos serviços
- `services.item1.description` até `services.item6.description`: Descrições dos serviços

#### Footer
- `footer.description`: Descrição da empresa
- `footer.contact.email`: Email de contato
- `footer.contact.phone`: Telefone
- `footer.contact.address`: Endereço
- `footer.services.title`: Título seção serviços
- `footer.services.item1` até `footer.services.item5`: Links de serviços
- `footer.company.title`: Título seção empresa
- `footer.company.item1` até `footer.company.item5`: Links da empresa
- `footer.legal.privacy`: Link política de privacidade
- `footer.legal.terms`: Link termos de uso
- `footer.legal.lgpd`: Link LGPD
- `footer.social.handle`: Handle das redes sociais
- `footer.copyright`: Texto de copyright

### Desenvolvimento

#### Adicionando Novos Conteúdos Editáveis:
```tsx
<EditableText
  contentKey="nova.chave.conteudo"
  fallback="Texto padrão"
  type="text" // ou "textarea"
  as="span" // ou qualquer elemento HTML
/>
```

#### Estrutura de Arquivos:
- `/src/utils/api.ts`: Funções de comunicação com API
- `/src/contexts/`: Contextos React para estado global
- `/components/EditableText.tsx`: Componente de edição inline
- `/components/AdminBar.tsx`: Barra de controle administrativo
- `/.env`: Configurações da API

### Configurações de Ambiente

```env
REACT_APP_API_BASE_URL=https://contabilizetech-frontend.onrender.com
REACT_APP_API_AUTH_LOGIN=/api/auth/login
REACT_APP_API_CONTENT_GET=/api/content
REACT_APP_API_CONTENT_UPDATE=/api/content
```

### Critérios de Qualidade

#### ✅ Implementado:
- [x] Login conectado com API real
- [x] Conteúdo carregado da API
- [x] Edição inline funcional para administradores
- [x] Salvamento automático na API
- [x] Interface intuitiva de edição
- [x] Feedback visual de estado
- [x] Sistema de fallback para conteúdo
- [x] Padronização de imports
- [x] Estrutura preparada para imagens locais

#### 🎯 Próximos Passos Sugeridos:
- [ ] Implementar upload de imagens
- [ ] Adicionar mais seções editáveis (Testimonials, Plans, FAQ)
- [ ] Criar preview de alterações antes de salvar
- [ ] Implementar histórico de alterações
- [ ] Adicionar temas/personalizações visuais
- [ ] Criar sistema de backup de conteúdo

### Notas Técnicas

#### Autenticação:
- Token JWT armazenado em localStorage
- Detecção automática de papel de administrador
- Logout seguro com verificação de alterações não salvas

#### Performance:
- Carregamento lazy de conteúdo
- Updates otimistas para melhor UX
- Fallbacks para API indisponível

#### Segurança:
- Validação de admin no frontend e backend
- Sanitização de conteúdo editado
- Timeout de sessão automático