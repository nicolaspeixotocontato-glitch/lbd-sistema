# CHANGELOG.md — La Bella Donna ERP (lbd-sistema)

> Histórico de mudanças do projeto. Ver `docs/PROJECT_CONTEXT.md` para o estado atual
> completo do sistema (arquitetura, dados, regras de negócio, débitos técnicos e bugs
> conhecidos) — este arquivo é um complemento histórico, não o substitui.

---

## Histórico resumido (a partir de `git log --oneline`, da mais antiga para a mais nova)

- `f6aeffe` — feat: MVP completo - saidas, transferencias, historico
- `faa1e72` — fix: stat cards em linha única no desktop
- `d359a43` — feat: permissões por perfil e remoção da dica de senha
- `292c3ca` — fix: corrige menu mobile e integridade do campo Responsável
- `72ebac7` — feat: entrada manual de nota como alternativa ao cupom por IA
- `6cd2ec1` — feat: sistema de QR Code para itens (geração de etiquetas e leitura via câmera)
- `55070e8` — Trocar leitura de QR Code por jsQR (compatível com todos navegadores)
- `703bef3` — Bloquear item duplicado e permitir exclusao (soft delete) no Estoque
- `e54b0ae` — Adicionar aba Pedidos com lista de compras por loja e por fornecedor
- `90fe0fc` — Corrigir migracao de fornecedores para dados ja salvos no navegador
- `dd64833` — Sprint de UX/produtividade: atalhos de teclado, foco e limpeza rapida de filtros

Detalhamento das duas sprints mais recentes abaixo.

---

## 2026-07-10 — Sprint de Pedidos (revisada e validada)

**Objetivo da sprint:** dar visibilidade a itens abaixo do mínimo em forma de lista de
compras, organizada tanto por loja quanto por fornecedor, com um indicador simples de se
o preço mais recente pago por cada item está bom, médio ou caro.

### Adicionado

- **Nova página `pedidos.html`**, com duas visões:
  - **Por loja**: para cada loja permitida ao usuário (`lojasPermitidas()`), lista os
    itens abaixo do mínimo (reaproveitando `getItensAbaixoMinimo()`), com estoque atual,
    mínimo e quantidade sugerida para repor.
  - **Por fornecedor**: agrupa os mesmos itens por `fornecedorId`, somando quantidades
    quando o mesmo item aparece em mais de uma loja, e mostra o valor total estimado do
    pedido por fornecedor.
- **`FORNECEDORES`** em `assets/app.js`: 8 fornecedores fictícios (`tipo: 'fornecedor'`
  ou `'atacado'`), e o campo `fornecedorId` adicionado a cada item de `DADOS_INICIAIS`.
- **`HISTORICO_PRECOS`** (mock determinístico): para cada item, 3 registros de preço
  pago gerados a partir de uma seed derivada do próprio id do item (`_seedFromId`) —
  variação de até ±15% sobre o `precoUnit`, sem aleatoriedade real (mesmo resultado a
  cada carregamento).
- **Indicador de tendência de preço** (`getIndicadorPreco`): compara o preço mais
  recente com a média dos anteriores — mais de 5% acima da média mostra "Pagando caro"
  (vermelho), dentro de ±5% mostra "Preço médio" (amarelo), mais de 5% abaixo mostra
  "Preço bom" (verde).
- Nova permissão `ver_pedidos`, liberada para `admin` e `gerente` (não para `operador`),
  e entrada correspondente em `NAV_ITEMS` (menu lateral).

### Corrigido

- **Bug de migração de dados**: `getData()` só populava `data.fornecedores` e o campo
  `fornecedorId` de cada item quando os dados eram criados do zero (primeiro acesso) —
  usuários que já tinham dados salvos no navegador antes desta feature ficavam sem esses
  campos, e `pedidos.html` mostrava "Nenhum pedido necessário" mesmo com itens abaixo do
  mínimo. `getData()` agora roda uma migração toda vez que carrega dados existentes:
  preenche `data.fornecedores` se estiver ausente/vazio, e recupera o `fornecedorId` de
  cada item a partir de `DADOS_INICIAIS` quando estiver faltando, salvando o resultado de
  volta caso algo tenha sido corrigido.

### Verificação

Revisada e validada end-to-end: fornecedores, histórico de preços fictício, indicador de
tendência colorido, permissões por perfil e a migração de dados antigos — sem bugs
pendentes.

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
  - `getFiltroLojaPadrao()` (seção 4b — Permissões) — retorna `'todas'` ou a loja do
    usuário, conforme `ver_outras_lojas`; compartilhada por Estoque e Histórico.
  - Novo componente visual `.input-clear-btn` em `assets/style.css` (botão "×" circular
    dentro de um campo de texto), e nova seção "Autocomplete" com os estilos de
    `.autocomplete-wrap`/`.autocomplete-list`/`.autocomplete-item`/`.item-selecionado`
    (antes duplicados nos `<style>` locais de Saídas e Transferências).
- **Botão "Limpar filtros"** em `estoque.html` e `historico.html` — reseta loja
  (respeitando `lojasPermitidas()`), categoria/tipo, status/período e busca em um clique.
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

### Alterado

- **Foco devolvido automaticamente ao campo de busca** após registrar uma saída
  (`saidas.html`) ou uma transferência (`transferencias.html`), e ao trocar de item
  (botão "Trocar") — permite lançar vários itens seguidos sem tocar no mouse.
- **Motivo de saída permanece selecionado** após confirmar uma saída em `saidas.html`
  (antes era limpo a cada lançamento) — agiliza sequências de saídas com o mesmo motivo
  (ex.: "Consumo em produção" durante o horário de pico). *Este é o único ponto desta
  sprint que muda um comportamento visível por padrão; não altera nenhuma regra de
  negócio, apenas o que fica preenchido na tela.*

### Não incluído nesta sprint (avaliado e adiado deliberadamente)

- **Paleta de comandos global (Ctrl+K)** — aprovada conceitualmente para uma sprint
  futura dedicada (busca global de páginas/itens + atalho para já abrir a tela de Saída
  com o item escolhido). Não implementada agora por ter escopo e complexidade maiores que
  o restante desta sprint.

### Revisão pós-implementação (antes do commit final)

Uma revisão de código encontrou e corrigiu 3 problemas antes do commit:

1. **Bug**: em `initAutocompleteTeclado`, a tecla `Esc` não fechava a lista de
   autocomplete quando ela mostrava apenas "Nenhum item encontrado" (o `return`
   antecipado por lista vazia acontecia antes da checagem da tecla `Esc`). Corrigido
   reordenando a checagem — `Esc` agora funciona independentemente de haver resultados.
2. **Duplicação**: função `getFiltroLojaPadrao()` estava copiada, idêntica, em
   `estoque.html` e `historico.html`. Extraída para `assets/app.js`.
3. **Duplicação**: bloco CSS de autocomplete (`.autocomplete-wrap`,
   `.autocomplete-list`, `.autocomplete-item`, `.item-selecionado`) estava duplicado,
   idêntico, entre `saidas.html` e `transferencias.html`. Centralizado em
   `assets/style.css`.

### Verificação

Testado manualmente em servidor local (login como admin, gerente e operador), cobrindo:
autocomplete + navegação por teclado (incluindo o cenário do bug do Esc, após a correção),
Enter para confirmar/destacar campo pendente, botões de limpar busca/filtros/formulário,
atalhos do Painel filtrados por permissão, e regressão nas páginas não alteradas
(Pedidos, Etiquetas) e no fluxo restrito do operador (Saídas). Nenhum erro de console
encontrado, antes ou depois da revisão.
