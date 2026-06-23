# Diagnóstico de Maturidade de IA Comercial • OmniChat

Um aplicativo interativo, moderno e de alta performance desenvolvido em **Astro 5** e **Tailwind CSS 4** para avaliar a maturidade de canais de vendas com Inteligência Artificial, atribuição, autonomia operacional e governança comercial no WhatsApp.

## 🚀 Funcionalidades Principais

- **Diagnóstico em 5 Estágios**: Um funil consultivo interativo e dinâmico que classifica as respostas das empresas e sugere planos estratégicos personalizados.
- **Acordeão de Dimensões Premium**: Um sistema de acordeão interativo, responsivo e pixel-perfect (Figma Spec) para as 5 principais dimensões de maturidade:
  1. *Estratégia e Canal*
  2. *Dados e Atribuição*
  3. *Operação e Performance*
  4. *Governança e Segurança*
  5. *Ownership e Organização*
- **Sincronização de Setores e Dados**: Mudança dinâmica e automatizada de dados de gargalos, cases recomendados e métricas dependendo do setor selecionado (Varejo, Saúde, Finanças, SaaS, Logística).
- **Integração Google Tag Manager**: Suporte completo para rastreamento de conversão por eventos customizados em `dataLayer` (`diagnostic_started`, `diagnostic_option_selected`, `diagnostic_results_viewed`, `diagnostic_whatsapp_click`, `diagnostic_lead_submitted`).
- **Otimização Extrema de WebGL**: Fundo de matriz terminal interativo e animado utilizando shaders puros que consome 90% menos GPU através de limite de 30 FPS, DPR de 1.0 fixo e pausa automática ao mudar de aba (`visibilitychange`).
- **SEO Otimizado**: Metatags, descrições, OpenGraph e canonical integrado via `<SEO>` do `astro-seo`.

---

## 📁 Estrutura Final do Projeto

```
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.astro           # Componente de botão estilizado
│   │   │   └── FaultyTerminal.astro   # Shader WebGL otimizado (30 FPS, DPR 1.0, visibility-gated)
│   │   ├── Header.astro               # Navbar com logo oficial OmniChat e divisor de design Figma
│   │   ├── StageLanding.astro         # Tela 01: Hero de Introdução
│   │   ├── StageQuiz.astro            # Tela 02: Quiz Multietapas (10 perguntas)
│   │   ├── StageResults.astro         # Tela 03: Resultados e Acordeão de 5 dimensões
│   │   └── StageLead.astro            # Tela 04: Captação de Lead e integração WhatsApp
│   ├── layouts/
│   │   └── Layout.astro               # Layout base com fontes Lato/Inter, GTM e tags SEO
│   ├── pages/
│   │   └── index.astro                # Homepage controlando o estado de transição e cálculo do quiz
│   └── styles/
│       └── global.css                 # Importação Tailwind CSS 4 + variáveis do tema
├── public/
│   ├── favicon.svg                    # SVG principal do favicon
│   ├── favicon/                       # Pasta organizada de ativos de favicons (apple, android, manifest)
│   ├── og/
│   │   └── opengraph.png              # Imagem oficial de preview para redes sociais (Figma Spec)
│   └── fonts/                         # Fontes Inter e Lato auto-hospedadas de alta performance
├── .env                               # Variáveis de ambiente (ex: PUBLIC_GTM_ID)
├── package.json                       # Configuração de scripts e dependências do Node.js
└── astro.config.mjs                   # Arquivo de configuração de compilação do Astro
```

---

## 🛠️ Comandos

No diretório do projeto, você pode rodar os seguintes comandos:

| Comando | Descrição |
| :--- | :--- |
| `npm install` | Instala todas as dependências do projeto. |
| `npm run dev` | Inicia o servidor local na porta `3000`. |
| `npm run build` | Compila o site estático para produção na pasta `./dist/`. |
| `npm run preview` | Visualiza localmente a build de produção gerada. |

---

## 📈 Eventos de Conversão Rastreados (GTM)

Os seguintes eventos são injetados automaticamente no `dataLayer` do navegador para integrações de pixels de anúncios (Meta Ads, Google Ads):

- `diagnostic_started`: Disparado ao iniciar o diagnóstico.
- `diagnostic_option_selected`: Disparado a cada resposta do quiz (etapa e valor).
- `diagnostic_results_viewed`: Disparado ao exibir a tela de resultado final.
- `diagnostic_whatsapp_click`: Disparado ao solicitar o relatório no WhatsApp.
- `diagnostic_lead_submitted`: Disparado ao enviar as informações cadastrais.

---

## 🎨 Personalização de Estilos

- **Cores**: As cores de destaque e da identidade corporativa OmniChat estão unificadas via CSS Variables em `src/styles/global.css`:
  - `--background`: `#09070e` (Preto profundo do espaço)
  - `--accent`: `#f2d14e` (Dourado OmniChat)
  - `--foreground`: `#f4f3f6` (Cinza claro para máxima legibilidade)
- **Fontes**: Lato (headings/menus) e Inter (conteúdo dinâmico) auto-hospedadas na pasta `/public/fonts` eliminando requisições lentas a servidores externos.

---

## 📄 Licença

Este projeto está licenciado sob os termos da licença MIT.
