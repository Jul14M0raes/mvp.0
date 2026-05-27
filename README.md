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

/app (pasta principal do projeto)
├── /data (armazena dados - provisório até implementação de um banco de dados)
├──── questions.ts (banco de questões)
├──page.tsx (Arquivo principal, chama as telas - que atualemnte estão na pasta "Screens" - e renderiza-as)
├──/components
├────/Screens (Armazena as telas como componentes)
├────── HomeScreen.tsx (tela inicial, páigina "home")
├────── QuizScreen.tsx (Lógica de questões modelo "quiz")
├────── ResultsScreen ( Mostra o resultado e estátiscas da atividade feita para o usuário)
├────/ui (Guarda itens de interface que podem ser reutilizados)
├────── AudioButton.tsx (usa o navegador para transcrever texto em áudio)
├────── MetricCard.tsx (Guarda parâmetros de estátisca como XP e dias de ofensiva)
├────── Visualicon.tsx (Carrega os ícones que serão ultilizados no projeto, devendo ser importandos neste arquivos de "lucid-react")
├────── ProgressBar.tsx 
## Anexos
ICONES - https://lucide.dev/icons/