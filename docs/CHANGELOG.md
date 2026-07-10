# CHANGELOG.md — La Bella Donna ERP (lbd-sistema)

> Histórico de mudanças relevantes do projeto, em ordem cronológica reversa (mais recente
> primeiro). Formato livre inspirado em [Keep a Changelog](https://keepachangelog.com/).
> Ver `docs/PROJECT_CONTEXT.md` para o estado atual completo do sistema.

---

## 2026-07-10 — Sprint de UX/Produtividade

**Objetivo da sprint:** reduzir cliques, acelerar a navegação e melhorar o dia a dia de
quem lança movimentações o dia inteiro (operadores de Saídas, principalmente), **sem**
alterar regra de negócio, estrutura de dados, LocalStorage ou arquitetura.

### Adicionado

- **Utilitários compartilhados em `assets/app.js`** (seção 7 — UI Helpers), reaproveitados
  por várias páginas:
  - `destacarCampoPendente(el)` — foca um campo, rola até ele e aplica um destaque visual
    vermelho temporário (nova classe `.field-pendente` em `assets/style.css`).
  - `initClearButton(inputId, btnId)` — liga um botão "×" a um campo de texto: mostra o
    botão só quando há texto, limpa o valor e refoca o campo ao clicar.
  - `initAutocompleteTeclado(inputEl, listaEl, onSelecionar)` — navegação por teclado
    genérica para listas de autocomplete: `↑`/`↓` percorre as sugestões, `Enter` escolhe a
    sugestão destacada (ou a primeira, se nenhuma foi destacada ainda), `Esc` fecha a
    lista.
  - Novo componente visual `.input-clear-btn` em `assets/style.css` (botão "×" circular
    dentro de um campo de texto).
- **Botão "Limpar filtros"** em `estoque.html` e `historico.html` — reseta loja
  (respeitando `lojasPermitidas()`), categoria/tipo, status/período e busca em um clique.
  Nova função `getFiltroLojaPadrao()` em ambas as páginas, usada tanto no botão quanto na
  inicialização (substituindo a lógica que antes só rodava uma vez no load).
- **Botão de limpar busca ("×")** em `estoque.html`, `historico.html`, `saidas.html` e
  `transferencias.html`.
- **Navegação completa por teclado no autocomplete de item** (`↑`/`↓`/`Enter`/`Esc`) em
  `saidas.html` e `transferencias.html`. Em Transferências, a seleção de item (antes só
  no listener de clique) foi extraída para uma função nomeada `selecionarItem(itemId)`,
  reaproveitada pelo clique e pelo teclado.
- **Atalhos rápidos no Painel** (`painel.html`): nova linha de botões — Nova entrada, Nova
  saída, Transferência, Estoque e Pedidos — logo abaixo do título, filtrados por
  `checkPermissao()` (mesmo critério do menu lateral).
- **Confirmação por Enter no campo de quantidade**, desde que todos os campos
  obrigatórios estejam válidos; caso contrário, destaca o primeiro campo pendente
  (`destacarCampoPendente`):
  - `saidas.html`: ordem de checagem item → motivo → quantidade.
  - `transferencias.html`: ordem de checagem lojas iguais → item → responsável →
    quantidade.
  - `entradas.html` (nota manual): Enter em "Qtd. recebida" aciona "Adicionar item" (ou
    destaca item/quantidade pendente).
- **Botão "Limpar formulário"** em `saidas.html`, `transferencias.html` e `entradas.html`
  (nota manual) — reinicia o lançamento em andamento sem precisar recarregar a página.
  Em Entradas, reaproveita a função já existente `resetManualForm()`.
- `docs/CHANGELOG.md` (este arquivo).

### Alterado

- **Foco devolvido automaticamente ao campo de busca** após registrar uma saída
  (`saidas.html`) ou uma transferência (`transferencias.html`), e ao trocar de item
  (botão "Trocar") — permite lançar vários itens seguidos sem tocar no mouse.
- **Motivo de saída permanece selecionado** após confirmar uma saída em `saidas.html`
  (antes era limpo a cada lançamento) — agiliza sequências de saídas com o mesmo motivo
  (ex.: "Consumo em produção" durante o horário de pico). *Este é o único ponto desta
  sprint que muda um comportamento visível por padrão; não altera nenhuma regra de
  negócio, apenas o que fica preenchido na tela.*
- `docs/PROJECT_CONTEXT.md` atualizado (seções 5.1, 6 e 9) para refletir os novos
  utilitários e comportamentos.

### Não incluído nesta sprint (avaliado e adiado deliberadamente)

- **Paleta de comandos global (Ctrl+K)** — aprovada conceitualmente para uma sprint
  futura dedicada (busca global de páginas/itens + atalho para já abrir a tela de Saída
  com o item escolhido). Não implementada agora por ter escopo e complexidade maiores que
  o restante desta sprint.

### Verificação

Todos os itens foram testados manualmente em um servidor local (login como admin,
gerente e operador), cobrindo: autocomplete + navegação por teclado, Enter para
confirmar/destacar campo pendente, botões de limpar busca/filtros/formulário, atalhos do
Painel filtrados por permissão, e regressão nas páginas não alteradas (Pedidos,
Etiquetas) e no fluxo restrito do operador (Saídas). Nenhum erro de console encontrado.

---

## Antes deste changelog

As mudanças abaixo aconteceram antes da criação deste arquivo; resumidas a partir do
histórico do Git (`git log`) para dar contexto de evolução do projeto:

| Commit | Resumo |
|---|---|
| `90fe0fc` | Corrige migração de fornecedores para dados já salvos no navegador (usuários antigos sem `fornecedorId`/`data.fornecedores`) |
| `e54b0ae` | Adiciona a aba **Pedidos**: lista de compras por loja e por fornecedor, com indicador de tendência de preço |
| `703bef3` | Estoque: bloqueia item duplicado (mesmo nome) e permite excluir item (soft delete `ativo:false`) |
| `55070e8` | Troca a leitura de QR Code para `jsQR` (funciona em qualquer navegador, substituindo o `BarcodeDetector` nativo que só rodava no Chrome Android) |
| `6cd2ec1` | Sistema de QR Code para itens: geração de etiquetas para impressão e leitura via câmera |
| `72ebac7` | Entradas: adiciona lançamento manual de nota como alternativa à extração por IA |
| `292c3ca` | Corrige menu mobile (z-index do overlay) e trava o campo Responsável ao usuário logado |
| `d359a43` | Introduz permissões por perfil (admin/gerente/operador) e remove dica de senha na tela de login |
| `faa1e72` | Ajusta stat cards para ficarem em linha única no desktop |
| `f6aeffe` | MVP inicial: Saídas, Transferências e Histórico |

Para o estado atual completo do sistema (arquitetura, dados, regras de negócio,
funcionalidades, débitos técnicos e bugs conhecidos), consulte sempre
`docs/PROJECT_CONTEXT.md` — este changelog é um complemento histórico, não substitui
aquele documento.
