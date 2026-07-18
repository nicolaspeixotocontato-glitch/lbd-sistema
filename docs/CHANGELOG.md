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

Detalhamento das sprints mais recentes abaixo (Importação de estoque via CSV primeiro,
por ser a mais nova).

---

## 2026-07-18 — Importação de estoque em lote via CSV (Estoque)

**Objetivo:** dar um jeito de atualizar a quantidade atual de estoque de vários itens
de uma vez, a partir do inventário mensal que Nicolas já fecha fora do sistema —
inviável hoje item por item para 150+ itens × 2-3 lojas. Funcionalidade reutilizável
(vai se repetir todo mês), não um script único.

### Adicionado

- **Botão "Importar CSV"** em `estoque.html`, ao lado do "Exportar CSV" já existente,
  visível só para quem tem `editar_estoque` (mesma permissão do CRUD de itens —
  hoje só `admin`).
- **Formato de entrada**: CSV com cabeçalho `nome,loja,quantidade_atual` (`loja` =
  `LBD01`/`LBD02`/`LBD03`, quantidade aceita decimais). Parser simples, sem biblioteca
  externa — formato fixo, sem aspas nem vírgulas dentro dos valores.
- **Match por nome** usando `normalizarBusca()` (já existente em `assets/app.js`,
  ignora acento e caixa — mesmo critério da busca das telas) contra os itens
  **ativos** do catálogo. Cada linha do CSV é classificada:
  - **Encontrado** — nome bate com exatamente um item ativo.
  - **Não encontrado** — nenhum item ativo com esse nome.
  - **Ambíguo** — bate com mais de um item ativo (não importado automaticamente, evita
    atualizar o item errado).
  - **Inválido** — loja não reconhecida ou quantidade não numérica/negativa.
- **Pré-visualização obrigatória antes de aplicar**: tabela com nome da planilha, loja,
  "atual → novo" (ou o motivo, para as linhas não encontradas/ambíguas/inválidas) e um
  resumo no topo ("X itens serão atualizados, Y não encontrados, Z ambíguos"). Nada é
  escrito no estoque até o usuário clicar "Aplicar importação" explicitamente.
- **Ao confirmar**: só as linhas "Encontrado" são aplicadas — `qty[loja]` do item vai
  para o novo valor, e uma linha em `historico` tipo `'ajuste'` (mesmo tipo já usado
  pela Contagem) é gravada com `motivo: 'Importação de inventário (CSV)'` e a diferença
  aplicada. Histórico só é gravado quando o valor de fato muda (item sem diferença não
  gera ruído, mesmo critério já usado na Contagem).
- **Não mexe em `min`, preço, categoria ou fornecedor** — só `qty`. Não é uma
  "contagem" formal: não passa por `contagem.html`, não grava em `data.contagens`, não
  exige observação. É uma correção direta de estoque em massa, equivalente a editar
  vários itens de uma vez pela tela.
- **Não cria itens novos** a partir do CSV — itens não encontrados ficam de fora, para
  revisão manual (cadastro continua sendo feito pelo botão "Novo item" já existente).

### Verificação

Testado em servidor local com um CSV de 5 linhas cobrindo os 4 status: um item
batendo exatamente (Abacaxi 400g), um nome sem acento que bate por
`normalizarBusca()` mas ficou **ambíguo** de propósito (duplicata de teste criada só
para essa validação — "Agua com gas" bate com dois itens ativos ao mesmo tempo), um
nome inexistente ("Produto Fantasma") e duas linhas inválidas (loja não reconhecida,
quantidade não numérica). Confirmado que nada foi escrito no estoque enquanto a
pré-visualização estava aberta; confirmado que só a linha "Encontrado" gerou mudança
de `qty` e uma linha de `historico` (motivo correto, diferença correta); confirmado
que `min` do item não mudou; confirmado que o botão "Importar CSV" fica oculto para
um perfil `gerente` (só `editar_estoque`/admin vê).

---

## 2026-07-13 — Fase 4: Ajuste manual de quantidade em Pedidos

**Objetivo:** permitir ajustar manualmente a quantidade a comprar de cada item na
seção "Por fornecedor" de `pedidos.html`, para cobrir datas sazonais com demanda maior
que o normal, sem mudar a fórmula de cálculo do valor sugerido.

### Adicionado

- **Colunas "Sugerido" e "Pedido"** na tabela "Por fornecedor": "Sugerido" continua
  mostrando `Math.max(min - atual, 0)`, só leitura, sem mudança na fórmula. "Pedido" é
  um campo numérico editável (aceita decimais — `step="0.01"`, sem arredondar, pensado
  para itens em `kg`/`L`), pré-preenchido com o valor sugerido.
- **Indicador visual discreto** (ícone pequeno, cor de alerta) ao lado do campo quando
  "Pedido" ≠ "Sugerido" — some sozinho quando o valor volta a bater com o sugerido.
- **Tudo que usava a quantidade sugerida passa a usar o valor de "Pedido"**: resumo
  executivo, resumo da seleção, mensagem do WhatsApp por fornecedor e exportação CSV.
  A ordenação por criticidade continua usando o status atual do item
  (`getCriticidade`), não o valor ajustado — como pedido.
- **Estado só em memória** (`ajustesQtd`, objeto `itemId → quantidade`), no mesmo
  padrão já usado para seleção de itens e observação do pedido — nunca é salvo no
  `localStorage`. Sobrevive à troca de filtro (loja/fornecedor/categoria) dentro da
  mesma sessão de tela; um reload completo da página volta tudo ao valor sugerido.
- **Seção "Por loja" não foi alterada** — continua mostrando só a quantidade sugerida,
  sem campo editável. Decisão explícita: essa seção é só uma lista de referência por
  loja (linha por loja, sem ações de seleção/WhatsApp/CSV atreladas), enquanto "Por
  fornecedor" é a visão que de fato alimenta a compra — evita dois estados de ajuste
  para o mesmo item desincronizados entre si.
- Atualização parcial do DOM ao digitar (só o badge do indicador e o rodapé do bloco
  do fornecedor, sem reconstruir a tabela inteira) — evita perder o foco do campo a
  cada tecla digitada, mesmo padrão já usado na tela de Contagem.
- **Preço na mensagem do WhatsApp**: cada linha de item passa a mostrar o último
  preço pago (`precoEstimado`) e o rótulo da tendência (`getIndicadorPreco` +
  `labelIndicadorPreco`, o mesmo já exibido na tela — "Pagando caro"/"Preço
  médio"/"Preço bom"), formato `Nome — Qtd UN (último preço: R$ X,XX — Rótulo)`.

### Observado durante a validação (fora do escopo desta sprint, não corrigido aqui)

- `labelTipoFornecedor()` em `pedidos.html` só reconhece fornecedor `tipo: 'atacado'`
  ou `'fornecedor'` — qualquer fornecedor com `tipo: 'direto'` (a maioria dos 21
  fornecedores reais cadastrados na Fase 1, ex.: MSX, Pamplona, CEASA) cai no `return`
  padrão da função e exibe o badge **"Sem fornecedor cadastrado"**, mesmo sendo um
  fornecedor cadastrado normalmente. É um bug pré-existente (rótulo incorreto, não
  afeta cálculo/agrupamento), fora do escopo pedido para esta sprint — registrado aqui
  para correção futura.

### Verificação

Testado em servidor local com itens de estoque simulados (min/qty preenchidos
manualmente via console, já que o catálogo real ainda está zerado): ajuste de um item
`un` pra cima (Abacaxi, 8→12) e de um item `kg` pra baixo com decimal (Bacon,
15→12,5); confirmado que a mensagem de WhatsApp e o total do rodapé refletem os
valores ajustados, não os sugeridos; confirmado que trocar o filtro de categoria não
apaga os ajustes de itens que continuam visíveis; confirmado que recarregar a página
volta tudo ao valor sugerido; confirmado que valor negativo digitado no campo é
corrigido para 0 (tanto no cálculo quanto no campo exibido); confirmado, com um item
de cada categoria de indicador de preço, que a mensagem de WhatsApp mostra o preço e
o rótulo corretos para "Pagando caro", "Preço médio" e "Preço bom".

---

## 2026-07-13 — Correções pós-teste da Fase 3 (Contagem)

**Objetivo:** corrigir 3 problemas encontrados por Nicolas ao testar a tela de
Contagem pela primeira vez.

### Corrigido

- **Busca ignorava acentuação** — buscar "mussarela" não encontrava "Mussarela" (e
  vice-versa) porque a comparação era só `.toLowerCase().includes()`, sem remover
  acento. Criada função compartilhada `normalizarBusca()` em `assets/app.js` (remove
  acentuação via `.normalize('NFD')` antes de comparar) e aplicada em todo lugar que
  busca item por nome: `contagem.html`, `estoque.html`, `saidas.html`,
  `transferencias.html` e `historico.html` (que também busca por nome de usuário).
  `entradas.html` já tinha sua própria função equivalente (`normalizarTexto`, usada em
  `sugerirItem`) — trocada pela função compartilhada para não manter duas
  implementações da mesma coisa. `pedidos.html` não tem busca por nome (só filtros),
  nada a corrigir lá.
- **Deslocamento visual ao digitar a quantidade contada** — o badge de diferença
  (`.diferenca-badge`) não tinha largura fixa; a largura mudava conforme o número
  digitado (de "Sem diferença" pra "+5", por exemplo), deslocando o resto da
  linha/coluna. Corrigido com `min-width` fixo (104px, cobre até "Sem diferença", o
  rótulo mais longo) e `justify-content: center`.
- **Perda de dados ao navegar para fora da tela sem confirmar (prioridade alta)** —
  não havia nenhum rascunho: sair de Contagem por engano perdia todo o preenchimento.
  Implementado rascunho persistente, isolado do estoque real:
  - Nova chave de `localStorage` dedicada por usuário (`lbd_contagem_draft_v1_<userId>`,
    via `getContagemDraftKey()` em `assets/app.js`) — nunca escreve em `lbd_data_v1`;
    o estoque real só muda ao confirmar a contagem, exatamente como antes.
  - Salva a cada alteração de quantidade, observação, loja ou tipo
    (`salvarRascunhoContagem()`).
  - Ao abrir a tela, restaura automaticamente se existir rascunho do usuário logado
    (loja, tipo e valores por item) e avisa com um toast discreto ("Rascunho anterior
    restaurado").
  - Limpo ao confirmar a contagem com sucesso, e ao fazer logout
    (`logout()`, em `assets/app.js`, agora limpa o rascunho de contagem do usuário que
    está saindo).

### Verificação

Testado em servidor local: busca sem acento encontrando item com acento em
`contagem.html`, `estoque.html`, `saidas.html`, `transferencias.html`; badge de
diferença mantendo largura de 104px digitando de vazio até "-12.345" (nenhum
deslocamento); preenchimento parcial de uma contagem sobrevivendo à navegação para
outra página e voltando; confirmado que `lbd_data_v1` permanece intocado enquanto o
rascunho existe; confirmado que o rascunho some após `logout()` e que um usuário
diferente (Carlos, gerente) não enxerga o rascunho de outro usuário (Nicolas) ao abrir
a tela — cada um tem sua própria chave isolada.

---

## 2026-07-13 — Fase 3: Contagem física de estoque e CMV real

**Objetivo da sprint:** substituir o cálculo manual de consumo/CMV feito hoje na
planilha por uma tela dentro do sistema, seguindo exatamente o processo que Nicolas já
usa (contagem simplificada semanal + contagem geral mensal), sem mudar a fórmula nem o
processo — só tirar isso da planilha.

### Adicionado

- **Nova página `contagem.html`**, no mesmo padrão visual/estrutural de
  `entradas.html`/`saidas.html`. Acesso liberado para `admin`, `gerente` e `operador`
  (nova permissão `ver_contagem`, adicionada a `PERMISSOES_POR_PERFIL`) e novo item
  "Contagem" no menu lateral.
- **Fluxo de contagem**: escolha de loja (pré-selecionada pela loja ativa/loja do
  usuário) e tipo (semanal ou mensal); lista todos os itens ativos com a quantidade
  atual do sistema pré-preenchida no campo de contagem, um campo por item. Busca por
  nome e filtro por categoria afetam só a exibição — a contagem sempre processa todos
  os itens ativos, independente do filtro (mesmo padrão já usado em Pedidos).
- **Cálculo automático por item** (`calcularContagem()`, novo em `assets/app.js`):
  `entradasNoPeriodo` (net entrada/saída desde a última contagem do mesmo tipo nessa
  loja, ou desde o início na primeira contagem), `consumoCalculado` (estoque atual menos
  quantidade contada), `valorConsumo` (consumo × último preço pago, com fallback para o
  preço unitário cadastrado) e `diferenca` (contado menos estoque atual, só para
  exibição/sinal).
- **Regra da contagem mensal**: itens com diferença são destacados na tabela e exigem
  observação preenchida antes de liberar o botão "Confirmar contagem" — validado tanto
  na tela (botão desabilitado, contador de pendências) quanto em `registrarContagem()`
  (rejeita a gravação inteira se faltar observação em algum item). Na contagem semanal
  a observação não existe.
- **Novo tipo de histórico `'ajuste'`** (`registrarContagem()`, novo em `assets/app.js`):
  grava uma linha por item **só quando há diferença** (item sem diferença não gera
  ruído no histórico), com `motivo: 'contagem'` e `contagemId` apontando para o registro
  da contagem. `historico.html` (chip/badge "Ajuste (contagem)") e `painel.html`
  (atividade recente) atualizados para exibir esse tipo corretamente.
- **Novo array `data.contagens`** (migração automática e não-destrutiva em `getData()`
  para quem já tinha dados salvos): um registro por contagem confirmada, com todos os
  itens processados (inclusive os sem diferença), usado pela própria tela para mostrar
  "Contagens anteriores desta loja" e a data da última contagem de cada tipo.

### Corrigido durante a validação

- **Fórmula de consumo estava contando a mesma entrada duas vezes.** A especificação
  original somava `estoqueAnterior + entradasNoPeriodo − quantidadeContada`, mas
  `estoqueAnterior` (a `qty` atual do sistema) já reflete em tempo real as entradas
  registradas pela tela de Entradas — somar `entradasNoPeriodo` de novo inflava o
  consumo calculado (reproduzido com um caso real: +20 de entrada, contagem de 18,
  sistema calculava consumo 22 em vez de 2). Corrigido para `consumoCalculado =
  estoqueAnterior − quantidadeContada`; `entradasNoPeriodo` continua calculado e exibido,
  como dado de contexto.

### Fora do escopo desta sprint

- Ficha Técnica / CMV por produto vendido (item maior, futuro, já mapeado em
  `PROJECT_CONTEXT.md` seção 14.1) — aqui "CMV" é só o valor de consumo de insumos.
- Nenhum threshold automático de "diferença grave" — só o destaque visual e a
  observação obrigatória na contagem mensal.
- `entradas.html`, `saidas.html` e `transferencias.html` não foram alterados além do
  necessário para o novo tipo de histórico.

### Verificação

Testado em servidor local (login como admin, LBD01): contagem semanal e contagem
mensal, item com diferença positiva e item com diferença negativa, bloqueio de
fechamento mensal sem observação (confirmado que nada é gravado até a observação ser
preenchida), `qty[loja]` e `historico` conferidos diretamente no `localStorage` após
salvar. Nenhum erro de console.

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
