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
- `f00d2cf` — docs: adiciona contexto do projeto e changelog, revisa Sprint de UX

Detalhamento das sprints mais recentes abaixo (Micro Sprint Mobile First primeiro, por
ser a mais nova — ainda **sem commit**, ver nota na própria entrada).

---

## 2026-07-13 — Micro Sprint Mobile First

**Objetivo da sprint:** melhorar exclusivamente a experiência em celulares e tablets
(360–1024px) — sem adicionar funcionalidades novas, sem alterar regra de negócio, sem
tocar em `assets/app.js` nem nos documentos executivos. Escopo: `assets/style.css` e as
8 páginas operacionais (Painel, Estoque, Entradas, Saídas, Transferências, Histórico,
Pedidos, Etiquetas).

> **Nota:** esta sprint foi implementada e validada, mas **não foi commitada nem
> enviada ao GitHub** — instrução explícita desta rodada. Os arquivos alterados
> continuam como mudanças locais não commitadas.

### Corrigido

- **Tabelas quebravam texto em várias linhas dentro das células** (`.table td` não
  tinha `white-space: nowrap`, ao contrário de `.table th`) — em telas estreitas, nomes
  de item e categoria ficavam ilegíveis, quebrados caractere a caractere dentro da
  coluna, em vez de manter uma linha e acionar o scroll horizontal que `.table-wrap` já
  oferece. Afetava **todas** as tabelas do sistema (Estoque, Histórico, Pedidos,
  Etiquetas). Corrigido adicionando `white-space: nowrap` a `.table td`.
- **Topbar estourava a altura fixa em telas muito estreitas** (~360–400px): "La Bella
  Donna" e o nome da loja quebravam para 2 linhas ao mesmo tempo, ultrapassando os 52px
  de altura do topbar (confirmado via `scrollHeight > clientHeight`). Corrigido: texto
  do logo e da loja truncam com reticências em vez de quebrar; a versão (`v1.0.0`),
  informação de menor prioridade, some em telas pequenas para sobrar espaço.
- **Botões de rodapé cortados/sobrepostos** — em Transferências, o botão "Confirmar
  transferência" ficava com o texto cortado ao lado de "Limpar formulário" (confirmado
  via overflow horizontal do `.card-footer`). O mesmo padrão existe em outras 5 páginas
  (Estoque, Entradas, Etiquetas, Saídas, além de Transferências). Corrigido permitindo
  que `.card-header`/`.card-footer` quebrem para a linha de baixo em telas pequenas —
  sem efeito em desktop, onde já cabem numa linha só.
- **Campo de busca praticamente inutilizável ao lado de um botão**: em Estoque/Histórico
  ("Buscar..." + "Limpar filtros") e em Saídas/Entradas ("Buscar item"/seleção de item +
  "Escanear"), o campo principal ficava espremido a ~130–180px de largura. Corrigido:
  em telas pequenas, o campo passa a ocupar a linha inteira e o botão desce para a linha
  de baixo (nova classe `.mobile-stack-row`, aplicada em `saidas.html` e `entradas.html`;
  `.search-input` ajustado globalmente para Estoque/Histórico).

### Alterado

- **Alvos de toque aumentados em mobile/tablet**: `.btn-icon.btn-sm` (ícones de
  editar/excluir em Estoque, botões −/+ de quantidade em Saídas, remover item em
  Entradas) passa de 28×28px para 40×40px; checkboxes nativos (Etiquetas, Pedidos)
  passam do tamanho padrão do navegador (~13px) para 20×20px.

### Não alterado (fora do escopo desta sprint)

- Rolagem horizontal de tabelas em telas estreitas — já era o comportamento correto e
  esperado (`.table-wrap { overflow-x: auto }`); não é um problema, só ficou mais visível
  depois da correção do `white-space: nowrap`.
- `.input-clear-btn` (botão "×" de limpar busca, 22×22px) — touch target pequeno, mas
  ação secundária; ficou para uma sprint futura.
- Reorganizar os ~16 chips de categoria do Estoque num dropdown/accordion para reduzir
  rolagem vertical — mudança estrutural maior, avaliada e descartada para esta *micro*
  sprint (mantém o componente existente, só ajusta espaçamento/toque).

### Verificação

Testado visualmente em servidor local, nas 8 páginas do escopo, em três condições:
**Portrait** (360×800), **Landscape** (812×375 e 640×360) e **Tablet** (768×1024) —
além de uma conferência em Desktop (1280×800) para confirmar que nada mudou fora dos
breakpoints mobile. Todas as correções confirmadas via inspeção de layout
(`getBoundingClientRect`, `scrollWidth`/`scrollHeight`) além de captura visual. Nenhum
erro de console em nenhuma página/resolução.

---

## 2026-07-10 — Sprint 2: Central de Compras

**Objetivo da sprint:** transformar `pedidos.html` de uma lista de reposição em uma
central de compras que apoia a decisão de quem compra insumos para múltiplas lojas todo
dia — priorizando velocidade operacional (menos cliques, menos erros), sem alterar
arquitetura, backend, LocalStorage ou regras de negócio existentes.

### Adicionado

- **Criticidade por item** (`getCriticidade(pct, status)`, novo em `assets/app.js`): 4
  níveis — Crítico (zerado), Alto (`pct < 50%`), Médio (`pct` 50–80%), Baixo (`pct` 80–100%)
  — com badge dedicado por nível (`badge-out`, novo `badge-alto`, `badge-low`,
  `badge-neutral`), visível em ambas as seções da tela.
- **Ordenação por prioridade**: itens ordenados por criticidade (mais crítico primeiro,
  depois alfabético) em "Por loja" e "Por fornecedor"; fornecedores ordenados pelo item
  mais crítico que carregam, com valor total como critério de desempate.
- **Bloco "Sem fornecedor definido"**: corrige um bug em que itens sem `fornecedorId`
  cadastrado desapareciam silenciosamente da seção "Por fornecedor" — agora aparecem num
  bloco próprio, visível e sinalizado.
- **Resumo executivo** (topo da tela): itens a repor, itens críticos, fornecedores
  envolvidos e valor total estimado — sempre reflete o total real, independente dos
  filtros ativos.
- **Filtros**: por loja (reaproveita o padrão `loja-tabs`), por fornecedor e por
  categoria (`filter-chips`) — só aparecem chips de fornecedores/categorias que
  realmente têm item pendente no momento.
- **Seleção múltipla de itens**: checkbox por item e checkbox "selecionar todos" por
  fornecedor na seção "Por fornecedor"; todos os itens vêm selecionados por padrão.
  Estado em memória (`Set` de ids), nunca gravado no `localStorage`.
- **Seleção rápida**: botões "Selecionar todos", "Selecionar apenas críticos" e "Limpar
  seleção" — atuam sobre o conjunto de itens *atualmente filtrado*, não sobre todo o
  sistema.
- **Resumo dinâmico da seleção**: atualiza ao vivo a cada mudança de seleção — itens
  selecionados, quantidade total agrupada por unidade (ex.: "18 kg, 45 un, 6 L", evitando
  somar unidades diferentes de forma incorreta), valor estimado e fornecedores
  envolvidos.
- **Campo de observação do pedido**: texto livre, em memória (não persistido), incluído
  automaticamente no final da mensagem de WhatsApp.
- **Botão "Copiar para WhatsApp"** por fornecedor: monta uma mensagem só com os itens
  selecionados daquele fornecedor + a observação, copia para a área de transferência
  (`navigator.clipboard.writeText`, com fallback avisado caso falhe) e abre
  `https://wa.me/?text=...` para o usuário escolher o contato — sem precisar de telefone
  cadastrado do fornecedor.
- **Exportar CSV**: exporta os itens selecionados dos fornecedores atualmente
  filtrados/exibidos, com criticidade e subtotal por linha; segue o mesmo padrão e a
  mesma permissão (`exportar_dados`) já usados em Estoque/Histórico.
- Novos tokens de design reutilizáveis em `assets/style.css`: `--orange`/`--orange-dim`
  e `.badge-alto`; `.stat-card--danger` e `.stat-card-icon-text` promovidos de estilo
  local (só existiam em `painel.html`) para o design system compartilhado.

### Revisão pós-implementação

Uma passada de revisão encontrou uma pequena redundância de cálculo: `renderTudo()`
chamava duas funções que recalculavam `getTodosItensPendentes()` independentemente.
Corrigido computando uma vez e reaproveitando nas duas (parâmetro opcional, com fallback
para quem chama essas funções fora do fluxo de `renderTudo()`, como os handlers de
seleção). Nenhum bug de comportamento encontrado além do já descrito acima (bloco "Sem
fornecedor definido").

### Verificação

Testado manualmente em servidor local (login como admin, gerente e operador): resumo
executivo, ordenação de itens e fornecedores por criticidade, os 4 badges de criticidade,
filtros combinados (loja + fornecedor + categoria), as 3 ações de seleção rápida, resumo
dinâmico após cada mudança de seleção, mensagem de WhatsApp (conteúdo e itens corretos,
observação incluída), exportação CSV (conteúdo e respeito ao filtro/seleção ativos),
correção do bloco "Sem fornecedor definido" com um item de teste criado propositalmente
sem fornecedor, permissões (gerente restrito à própria loja e sem exportar CSV; operador
bloqueado, como já era o caso) e regressão em Painel, Estoque e Etiquetas. Nenhum erro de
console em nenhum momento.

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
