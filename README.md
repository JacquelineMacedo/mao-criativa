# ✋ Mão Criativa — Desenhe no Ar com as Mãos

Aplicação web de desenho em tempo real que usa rastreamento de mãos por inteligência artificial. Sem mouse, sem tela touch — basta levantar a mão na frente da câmera e começar a criar.

---

## O que ele faz

- **Desenho no ar**: aponte o dedo indicador e mova a mão para desenhar traços coloridos com efeito neon
- **Transformações espaciais**: use a outra mão para mover, redimensionar e rotacionar qualquer traço desenhado
- **Interface glassmorphism**: painel de controle com visual premium, semi-transparente e responsivo
- **Fundo de câmera**: exibe o feed da câmera como plano de fundo, criando a sensação de desenhar no espaço real
- **Salvamento**: exporta o desenho como imagem PNG
- **Desfazer / Refazer**: histórico completo de ações
- **Renderização em tempo real**: motor de desenho WebGL a 60FPS

---

## Gestos com as Mãos

### Mão Direita — Desenhar

| Gesto | Ação |
|---|---|
| ☝️ Dedo indicador levantado | Desenha traços |
| ✌️ Dois dedos levantados | Modo mover (para essa mão) |

### Mão Esquerda — Controlar traços

| Gesto | Ação |
|---|---|
| ✌️ Dois dedos levantados | Seleciona e move o traço mais próximo |
| 🤏 Pinça (polegar + indicador) | Redimensiona o traço (abrir = aumentar, fechar = diminuir) |
| 🖐️ Palma aberta + girar pulso | Rotaciona o traço |

### Dicas de uso

- Com uma mão só, ela é automaticamente tratada como mão de desenho
- Ao soltar a rotação, o traço encaixa no ângulo mais próximo de 45°
- Ao soltar o movimento, o traço tem um leve efeito de inércia

---

## Painel de Controle (interface)

| Botão | Função |
|---|---|
| **Paleta de Cores** | 6 cores neon disponíveis: ciano, rosa, amarelo, verde, vermelho e branco |
| **Espessura do Pincel** | Slider de 1px a 50px |
| **Intensidade do Brilho** | Slider de 0 a 50 (efeito glow neon) |
| **Desfazer** | Remove o último traço |
| **Refazer** | Restaura o último traço desfeito |
| **Limpar** | Apaga todos os traços da tela |
| **Salvar** | Baixa o desenho como `.png` |
| **Ocultar / Mostrar Câmera** | Ativa ou desativa o fundo de câmera |
| **Gestos On / Off** | Ativa ou desativa o rastreamento de mãos |
| **Ajuda** | Abre o guia de gestos na tela |

---

## Instalação e Execução

### Pré-requisitos

- [Node.js](https://nodejs.org/) versão 18 ou superior
- npm (incluído com o Node.js)
- Navegador moderno com suporte a câmera (Chrome ou Edge recomendados)

### Passo a passo

**1. Clone ou baixe o projeto**

```bash
git clone https://github.com/seu-usuario/mao-criativa.git
cd mao-criativa
```

Ou baixe o ZIP e extraia na pasta de sua preferência.

**2. Instale as dependências**

```bash
npm install
```

**3. Inicie o servidor de desenvolvimento**

```bash
npm run dev
```

**4. Acesse no navegador**

```
http://localhost:5173
```

**5. Conceda permissão de câmera**

Ao abrir, o navegador vai pedir acesso à câmera. Clique em **Permitir** e aguarde o modelo de IA carregar (alguns segundos na primeira vez).

**6. Levante a mão e comece a desenhar!**

---

### Build para produção

```bash
npm run build
```

Os arquivos otimizados serão gerados na pasta `dist/`. Podem ser hospedados em qualquer servidor estático (Vercel, Netlify, GitHub Pages, etc.).

---

## Tecnologias utilizadas

| Tecnologia | Função |
|---|---|
| **React 19** | Interface e gerenciamento de estado |
| **Vite 8** | Bundler e servidor de desenvolvimento |
| **MediaPipe Hands** | Rastreamento de mãos em tempo real via IA |
| **Canvas API (WebGL)** | Motor de renderização dos traços a 60FPS |
| **Framer Motion** | Animações da interface |
| **Lucide React** | Ícones da interface |
| **Tailwind CSS** | Estilização utilitária |
| **Three.js** | Suporte a cálculos 3D e transformações |

---

## Inteligência Artificial utilizada no desenvolvimento

Este projeto foi desenvolvido com auxílio de ferramentas de IA:

- **[Claude Code](https://claude.ai/code)** (Anthropic) — assistente de programação usado para construir, corrigir e evoluir o código durante todo o desenvolvimento. Toda a lógica de suavização de gestos, persistência de rastreamento, correções de performance e tradução da interface foram feitas em colaboração com o Claude Code.
- **MediaPipe Hands** (Google) — modelo de IA que detecta e rastreia os 21 pontos da mão em tempo real diretamente no navegador, sem enviar dados para nenhum servidor.

---

## Autoria

Desenvolvido por **Jacqueline Macêdo**
Instagram: [@jacque_tech](https://www.instagram.com/jacque_tech/)
