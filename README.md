# LeDuc MVP v.0.1
- Projeto criado para desenvolver verão MVP/BETA da proposta do App LeDuc com o obetivo de testar com um pequeno grupo focal posteriormente. O projeto deverá possuir funcionalidades essenciais para validar a proposta.

## Objetivo
    O LeDuc se faz como uma plataforma para contribuir para educação de Jovens e Adultos a partir de metodologias como microlearning, gamificação e aprendizado contextualizado.

## Tecnologias do projeto
- Next.js
- TypeScript
- Tailwind
- etc..

## Funcionalidades
- Quiz
- Áudio
- Sistema de ofensivas
- Sistema de progresso

## Estrutura de pastas resumidas

/app
├── data
│   └── questions.ts          # banco de questões
│
├── components
│   ├── Screens
│   │   ├── HomeScreen.tsx    # tela inicial
│   │   ├── QuizScreen.tsx    # lógica do quiz
│   │   └── ResultsScreen.tsx # resultado e estatísticas
│   │
│   └── ui
│       ├── AudioButton.tsx   # transforma texto em áudio
│       ├── MetricCard.tsx    # XP, ofensiva etc.
│       ├── VisualIcon.tsx    # centraliza ícones do lucide-react
│       └── ProgressBar.tsx
│
└── page.tsx                  # arquivo principal da aplicação
## Anexos
ICONES - https://lucide.dev/icons/