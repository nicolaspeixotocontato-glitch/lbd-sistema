# PROJECT_CONTEXT.md — La Bella Donna ERP (lbd-sistema)

> Documento de contexto técnico permanente. Deve ser **atualizado a cada mudança relevante**
> (nova feature, mudança de arquitetura, bug corrigido, débito técnico identificado ou pago).
> Última atualização: **2026-07-10**.

---

## 1. Objetivo do sistema

Sistema de gestão de estoque (mini-ERP) para a rede de pizzarias **La Bella Donna**, em
Porto Alegre. Controla o estoque de insumos em múltiplas lojas, permitindo:

- Registrar **entradas** de mercadoria (via cupom fiscal fotografado + IA, ou lançamento manual).
- Registrar **saídas** (consumo, perda, quebra, uso interno etc.).
- Fazer **transferências** de itens entre lojas.
- Consultar **histórico** completo de movimentações.
- Ver **estoque atual x mínimo** por loja, com alertas visuais.
- Gerar **etiquetas com QR Code** para identificar fisicamente os itens.
- Ler QR Codes pela câmera para localizar um item rapidamente (Saídas/Entradas).
- Gerar uma **lista de compras/reposição (Pedidos)**, agrupada por loja e por fornecedor,
  com indicador de tendência de preço pago.

Público-alvo: donos/gerentes da rede e operadores de loja, cada um com um nível de acesso
diferente (ver seção 8 — Regras de negócio).

---

## 2. Arquitetura atual

**Resumo em uma frase:** aplicação 100% client-side (HTML/CSS/JS puro, sem build, sem
backend), com todos os dados persistidos em `localStorage` do navegador, publicada
estaticamente no GitHub Pages.

Pontos-chave:

- **Sem servidor/API própria.** Cada página HTML é standalone, carrega `assets/app.js`
  (núcleo compartilhado) e implementa sua própria lógica inline em um `<script>` no fim do
  arquivo.
- **Sem banco de dados real.** Todo o estado (itens, histórico, fornecedores, sessão do
  usuário, loja ativa) vive no `localStorage` do navegador — ver seção 7.
- **Sem processo de build.** Não há `package.json`, bundler, transpilador ou minificador.
  Os arquivos `.html`/`.js`/`.css` são servidos exatamente como estão no repositório.
- **Deploy = GitHub Pages.** `.github/workflows/deploy.yml` publica a raiz do repositório
  (`publish_dir: ./`) a cada push na branch `main`, usando `peaceiris/actions-gh-pages`.
  Não há passo de lint, teste ou build antes da publicação — o que estiver em `main` vai
  ao ar imediatamente.
- **Integração externa único ponto de rede:** a tela Entradas chama diretamente a API da
  Anthropic (`https://api.anthropic.com/v1/messages`) **do navegador do usuário**, usando
  uma API key que o próprio usuário cola e que fica salva em `localStorage`
  (`lbd_api_key`). Não existe proxy/backend intermediando essa chamada.
- **Multiusuário "de mentirinha":** existe modelagem de usuários, perfis e permissões, mas
  como tudo é `localStorage`, **cada navegador/dispositivo tem seu próprio estado
  isolado** — não há sincronização real entre lojas/dispositivos/usuários. Ver detalhes
  em "Débitos técnicos".

### Diagrama de dependências entre arquivos

```
index.html ─────────────┐
painel.html ─────────────┤
estoque.html ────────────┤
entradas.html ───────────┼──> assets/app.js (núcleo: dados, auth, permissões, UI helpers)
saidas.html ─────────────┤       ├──> assets/jsQR.js (leitura de QR pela câmera)
transferencias.html ─────┤       └──> ICONS (SVGs inline)
historico.html ──────────┤
pedidos.html ────────────┤
etiquetas.html ──────────┴──> assets/qrcode.js (geração de QR Code, algoritmo próprio)

Todas as páginas ──> assets/style.css (design system)
entradas.html ──> CDN externo: xlsx.full.min.js (SheetJS, exportação .xlsx)
entradas.html ──> API externa: api.anthropic.com (extração de cupom via IA)
```

---

## 3. Tecnologias utilizadas

| Camada | Tecnologia |
|---|---|
| Markup/Estilo | HTML5 + CSS3 puro (sem framework, sem Tailwind/Bootstrap) |
| Lógica | JavaScript vanilla (ES6+), sem framework (sem React/Vue/etc.) |
| Persistência | `localStorage` do navegador (sem backend, sem banco de dados) |
| Geração de QR Code | Implementação própria do algoritmo ISO/IEC 18004 (`assets/qrcode.js`), 100% offline |
| Leitura de QR Code | [jsQR](https://github.com/cozmo/jsQR) vendorizado em `assets/jsQR.js` (funciona em qualquer navegador via `<canvas>` + `getUserMedia`) |
| Exportação de planilhas | [SheetJS (xlsx)](https://sheetjs.com/) via CDN, usado só em `entradas.html` |
| IA para extração de cupom fiscal | API da Anthropic (Messages API), chamada direto do navegador |
| Fontes | Google Fonts — `Cormorant Garamond` (display) + `Inter` (corpo) |
| Hospedagem/Deploy | GitHub Pages, via GitHub Actions (`peaceiris/actions-gh-pages`) |
| Controle de versão | Git + GitHub (`nicolaspeixotocontato-glitch/lbd-sistema`) |

Não há: gerenciador de pacotes (npm/yarn), testes automatizados, linter configurado,
TypeScript, ou qualquer ferramenta de build.

---

## 4. Estrutura das pastas

```
lbd-sistema/
├── .github/
│   └── workflows/
│       └── deploy.yml              # publica a raiz no GitHub Pages a cada push em main
├── assets/
│   ├── app.js                      # núcleo do sistema (dados, auth, permissões, UI helpers)
│   ├── style.css                   # design system completo (~1460 linhas, tema único escuro)
│   ├── jsQR.js                     # biblioteca vendorizada — leitura de QR Code via câmera
│   ├── qrcode.js                   # gerador de QR Code próprio (para etiquetas)
│   ├── db.js                       # VAZIO — não referenciado em nenhuma página (código morto)
│   └── icons.js                    # VAZIO — não referenciado em nenhuma página (código morto)
├── docs/
│   └── PROJECT_CONTEXT.md          # este documento
├── index.html                      # tela de login
├── painel.html                     # dashboard / visão geral
├── estoque.html                    # listagem e gestão de itens (CRUD)
├── entradas.html                   # entrada de mercadoria (cupom via IA ou nota manual)
├── saidas.html                     # saída/retirada de estoque
├── transferencias.html             # transferência entre lojas
├── historico.html                  # histórico de movimentações
├── pedidos.html                    # lista de compras (por loja / por fornecedor)
├── etiquetas.html                  # geração e impressão de etiquetas com QR Code
├── 0001-fix-mobile-responsavel.patch  # resíduo de patch já aplicado (commit 292c3ca) — candidato a remoção
├── API Claude LBD Sistema.txt       # anotação pessoal (gitignored, não versionado)
├── Dados relevantes Claude.txt      # anotação pessoal (gitignored, não versionado)
└── .gitignore
```

Não existem subpastas para `components/`, `pages/`, `lib/`, `tests/` etc. — é uma
estrutura "flat" típica de projeto estático simples.

---

## 5. Módulos existentes

### 5.1 `assets/app.js` (núcleo — 865 linhas), organizado em seções comentadas:

| # | Seção | Conteúdo |
|---|---|---|
| 1 | Constantes | `LOJAS`, `CATEGORIAS`, `FORNECEDORES`, `MOTIVOS_SAIDA`, `USUARIOS` |
| 2 | Dados Iniciais | `DADOS_INICIAIS` (seed de 30 itens + 6 registros de histórico) |
| 2b | Histórico de preços (mock) | `_seedFromId`, `gerarHistoricoPrecos`, `HISTORICO_PRECOS` |
| 3 | Storage | `getData`/`saveData` (com migração), `getSession`/`saveSession`/`clearSession` |
| 4 | Auth | `login`, `requireAuth`, `getUsuarioAtivo`, `logout` |
| 4b | Permissões | `PERMISSOES_POR_PERFIL`, `PAGINA_PERMISSAO`, `checkPermissao`, `lojasPermitidas`, `verificarAcessoPagina` |
| 5 | Estoque | `getStatusEstoque`, `getItensAbaixoMinimo`, `getItensZerados`, `registrarMovimentacao`, `registrarTransferencia`, `adicionarItem`, `editarItem`, `excluirItem`, `getHistoricoPrecos`, `getUltimoPrecoPago`, `getIndicadorPreco` |
| 6 | Formatação | `fmt`, `fmtR`, `fmtDate`, `fmtDateFull` |
| 7 | UI Helpers | `toast`, `destacarCampoPendente`, `initClearButton`, `initAutocompleteTeclado`, `openModal`/`closeModal`, `initSidebarMobile`, `NAV_ITEMS`, `buildSidebar`, `buildTopbar`, `initTopbar`, `getLojaAtiva`/`setLojaAtiva`, `abrirSeletorLoja` |
| 7b | Scanner de QR Code | `iniciarCameraScanner`, `abrirScannerQR`, `fecharScannerQR` (usa `jsQR.js`) |
| 8 | Icons | objeto `ICONS` (SVGs inline, ~25 ícones) |

> **Sprint de UX (2026-07-10):** `destacarCampoPendente`, `initClearButton` e
> `initAutocompleteTeclado` são utilitários de produtividade reutilizados por
> Estoque, Histórico, Saídas, Transferências e Entradas — ver seção 9 e
> `docs/CHANGELOG.md` para o detalhamento completo.

### 5.2 Páginas (cada uma é um módulo próprio, com script inline)

| Página | Rota | Responsável por |
|---|---|---|
| Login | `index.html` | Seleção de usuário + senha, redireciona por perfil |
| Painel | `painel.html` | Dashboard: stat cards, alertas de estoque, histórico 24h, resumo por loja (admin) |
| Estoque | `estoque.html` | Listagem/filtro de itens, novo/editar/excluir item, exportar CSV |
| Entradas | `entradas.html` | Upload de cupom + extração via IA **ou** nota manual, match de itens, registro de entrada, exportar `.xlsx` |
| Saídas | `saidas.html` | Busca/autocomplete + scanner QR, registro de saída com motivo |
| Transferências | `transferencias.html` | Transferência de item entre duas lojas, com preview de estoque origem/destino |
| Histórico | `historico.html` | Listagem paginada e filtrável de todas as movimentações, exportar CSV |
| Pedidos | `pedidos.html` | Lista de compras "por loja" e "por fornecedor", com indicador de tendência de preço |
| Etiquetas | `etiquetas.html` | Seleção de itens + geração/impressão de etiquetas com QR Code |

### 5.3 Design system (`assets/style.css`)

Tema único **escuro** (não há modo claro/`prefers-color-scheme`), com tokens em `:root`
(cores, tipografia, espaçamento, sombra, z-index). Componentes reutilizáveis já
padronizados: App Shell (sidebar + topbar), Stat Cards, Card, Table, Buttons (`btn-primary`,
`btn-secondary`, `btn-ghost`, `btn-danger`, `btn-icon`), Badges (`badge-ok/low/out/info/neutral`),
Forms, Modal, Toast, Progress Bar, Filter Chips, Search Input, Empty States, Loja Tabs,
Hist Rows, Alert Rows.

---

## 6. Fluxo do sistema

1. **Login (`index.html`):** usuário escolhe seu nome num `<select>` e digita uma "senha"
   (ver regra em Segurança/Bugs — a senha é o próprio nome em minúsculas). Sucesso grava
   uma sessão em `localStorage` e redireciona: `operador` → `saidas.html`; demais →
   `painel.html`.
2. **Toda página protegida chama `initTopbar(pagina)`**, que:
   - Chama `requireAuth()` — sem sessão válida, redireciona para `index.html`.
   - Chama `verificarAcessoPagina(pagina)` — sem a permissão exigida por
     `PAGINA_PERMISSAO`, redireciona (`operador` → `saidas.html`; demais → `painel.html`).
   - Monta sidebar (`buildSidebar`, filtrando `NAV_ITEMS` pela permissão do usuário) e
     topbar (`buildTopbar`, com nome/iniciais do usuário e loja ativa).
3. **Operações de estoque** (`registrarMovimentacao`, `registrarTransferencia`,
   `adicionarItem`, `editarItem`, `excluirItem`) sempre: leem `getData()`, mutam o objeto
   em memória, chamam `saveData(data)` (grava tudo de volta em `localStorage`) e retornam
   `{ ok, erro? }` — o chamador decide como exibir o resultado (`toast`).
4. **Todo evento de estoque vira uma linha em `data.historico`** (entrada, saída ou
   transferência), consultável em `historico.html` e usada por `painel.html` e
   `pedidos.html`.
5. **Sessões de tela (`entradas.html`/`saidas.html`/`transferencias.html`)**: as tabelas
   "desta sessão" (notas, retiradas) são **estado em memória (variável JS)**, não
   persistido — recarregar a página as apaga (as movimentações já confirmadas no estoque
   continuam salvas, só a *listagem local da sessão* some).
6. **Entradas via IA:** usuário sobe uma foto/PDF → `chamarAnthropicExtrairCupom()` envia
   para a API da Anthropic com um prompt de extração estruturada → JSON é parseado →
   usuário revisa/confirma o "match" de cada item extraído com um item real do estoque
   (`sugerirItem`, por similaridade de texto) → confirma → `registrarMovimentacao('entrada', …)`
   para cada item confirmado.
7. **Pedidos:** para cada loja permitida ao usuário, roda `getItensAbaixoMinimo(lojaId)`;
   agrega tudo por `fornecedorId`; para cada fornecedor, cruza com `HISTORICO_PRECOS` para
   calcular tendência de preço (`getIndicadorPreco`) e valor total estimado do pedido.
8. **Fluxo rápido de lançamento (Saídas/Transferências/nota manual de Entradas):** o
   campo de busca de item aceita navegação por teclado (↑↓ para percorrer sugestões,
   Enter para escolher a destacada ou a primeira, Esc para fechar a lista); pressionar
   Enter no campo de quantidade confirma o lançamento se tudo estiver válido, ou foca e
   destaca (`.field-pendente`) o primeiro campo faltante; após confirmar, o foco volta
   automaticamente para a busca (em Saídas, o motivo selecionado permanece, para agilizar
   lançamentos consecutivos do mesmo motivo). Um botão "Limpar formulário" reinicia o
   lançamento manualmente quando necessário.

---

## 7. Estrutura dos dados (incluindo LocalStorage)

### 7.1 Chaves de `localStorage` em uso

| Chave | Definida em | Conteúdo |
|---|---|---|
| `lbd_data_v1` | `app.js` (`STORAGE_KEY_DATA`) | Objeto principal: `{ itens[], historico[], fornecedores[] }` |
| `lbd_session_v1` | `app.js` (`STORAGE_KEY_SESSION`) | `{ userId, ts, lojaAtiva }` |
| `lbd_loja_ativa_v1` | `app.js` (`STORAGE_KEY_LOJA`) | string com o id da loja ativa (fallback) |
| `lbd_api_key` | `entradas.html` (`API_KEY_STORAGE`) | API key da Anthropic, em texto puro |
| `lbd_api_key_prompted` | `entradas.html` (`API_KEY_PROMPTED_STORAGE`) | flag para só pedir a API key uma vez |

Não há expiração/TTL em nenhuma dessas chaves — a sessão de login, por exemplo, é válida
para sempre até `logout()` ser chamado manualmente ou o `localStorage` ser limpo.

### 7.2 Objeto principal (`getData()` → `lbd_data_v1`)

```js
{
  itens: [
    {
      id: 'i01',                 // string, gerado como 'i' + timestamp36 + random para novos itens
      nome: 'Queijo Mussarela',
      cat: 'Queijos',            // uma das CATEGORIAS
      un: 'kg',                  // unidade livre (kg, un, L, pct...)
      precoUnit: 32.9,
      min: { LBD01: 20, LBD02: 15, LBD03: 10 },   // estoque mínimo por loja
      qty: { LBD01: 34, LBD02: 8, LBD03: 0 },     // estoque atual por loja
      ativo: true,                // soft delete: false = "excluído"
      fornecedorId: 'f1',         // id em FORNECEDORES/data.fornecedores (pode faltar em itens custom)
    },
    // ...30 itens no seed inicial
  ],
  historico: [
    // entrada/saída:
    { id, ts, tipo: 'entrada'|'saida', lojaId, itemId, qty, motivo, userId, userNome },
    // transferência:
    { id, ts, tipo: 'transferencia', origemId, destinoId, itemId, qty, userId, userNome },
  ],
  fornecedores: [
    { id: 'f1', nome: 'Laticínios Vale Verde', tipo: 'fornecedor' | 'atacado' },
    // ...8 fornecedores no seed inicial (populado/migrado por getData())
  ],
}
```

### 7.3 `HISTORICO_PRECOS` (constante em memória, **não é parte de `data`/localStorage**)

Gerado **uma única vez**, no carregamento do script, a partir de `DADOS_INICIAIS.itens`
(não de `getData()`), com variação determinística por item via `_seedFromId(item.id)`:

```js
HISTORICO_PRECOS = {
  i01: [
    { data: <timestamp -60 dias>, precoPago: <precoUnit ± até 15%> },
    { data: <timestamp -30 dias>, precoPago: <precoUnit ± até 15%> },
    { data: <timestamp -7 dias>,  precoPago: <precoUnit ± até 15%, "mais recente"> },
  ],
  // ...
}
```

Importante: só existe entrada para os 30 itens do seed original. Itens criados depois via
`adicionarItem()` não aparecem aqui (ver "Débitos técnicos").

### 7.4 Sessão (`lbd_session_v1`)

```js
{ userId: 'u1', ts: 1700000000000, lojaAtiva: 'LBD01' }
```

### 7.5 Constantes de referência (hardcoded em `app.js`, fora de `localStorage`)

- `LOJAS`: 3 lojas fixas (`LBD01` Cristóvão, `LBD02` Zona Sul, `LBD03` Nova Loja).
- `USUARIOS`: 4 usuários fixos (ver tabela na seção 8).
- `CATEGORIAS`: 16 categorias fixas (nem todas usadas pelos itens do seed).
- `MOTIVOS_SAIDA`: 8 motivos fixos para saída de estoque.
- `FORNECEDORES`: 8 fornecedores fictícios (fonte "de verdade"; `data.fornecedores` é uma
  cópia gerenciada por `getData()`).

---

## 8. Regras de negócio

### 8.1 Perfis e permissões

| Perfil | Usuários (seed) | Permissões |
|---|---|---|
| `admin` | Nicolas (u1) | **Todas** — `checkPermissao()` retorna `true` sempre para admin, sem checar a lista |
| `gerente` | Carlos (u2, LBD01), Maria (u3, LBD02) | `ver_painel`, `ver_estoque`, `ver_entradas`, `ver_saidas`, `ver_transferencias`, `ver_historico`, `ver_pedidos` |
| `operador` | Pedro (u4, LBD01) | Só `ver_saidas` |

Consequências importantes (por não estarem na lista de nenhum perfil, exceto admin):
- **Só admin** pode: criar/editar/excluir itens de estoque e gerar etiquetas
  (`editar_estoque`), e exportar CSV/XLSX (`exportar_dados`).
- **Só admin** enxerga `ver_outras_lojas` — ou seja, `gerente`/`operador` ficam sempre
  travados na própria loja (`usuario.loja`); só o admin escolhe livremente qualquer loja
  no seletor de loja da topbar.
- `LBD03` (Nova Loja) **não tem nenhum usuário `gerente`/`operador` associado** no seed —
  só o admin consegue de fato operar essa loja hoje.

### 8.2 Autenticação

- "Senha" = nome do usuário em minúsculas (`login()` compara
  `senha.trim().toLowerCase() === usuario.nome.toLowerCase()`). Não há hash, não há
  usuário/senha reais — é um mecanismo de conveniência para demo/uso interno, **não uma
  autenticação segura**.
- Sessão sem expiração; `logout()` é o único jeito de encerrar.

### 8.3 Estoque

- Um item nunca é apagado de verdade — "excluir" marca `ativo: false` (soft delete),
  preservando o vínculo com `historico`. Todas as listagens filtram `item.ativo`.
- Não é permitido cadastrar dois itens ativos com o **mesmo nome** (case-insensitive,
  trim) — verificado no submit do formulário "Novo item" em `estoque.html`.
- Status de estoque por loja: `out` (zerado, `qty <= 0`), `low` (`qty < min`), `ok` (caso
  contrário). `pct` do progress bar é `qty/min`, limitado a 100%.
- Saída não pode deixar o estoque negativo (`registrarMovimentacao` valida
  `qty > atual`); idem para transferência a partir da origem.
- Toda movimentação de estoque grava uma linha em `historico` com `userId`/`userNome` de
  quem executou.

### 8.4 Pedidos (lista de compras)

- "Item abaixo do mínimo" = `status` `low` ou `out` (`getItensAbaixoMinimo`).
- Quantidade a pedir = `max(min - atual, 0)` — nunca negativa.
- Seção "Por fornecedor" soma a quantidade a pedir do mesmo item **entre todas as lojas
  visíveis ao usuário** (`lojasPermitidas()`), agrupando por `fornecedorId`.
- Indicador de tendência de preço compara o preço pago mais recente
  (`HISTORICO_PRECOS[item].slice(-1)`) com a média dos registros anteriores:
  - `> +5%` → "Pagando caro" (vermelho, seta para cima).
  - `entre -5% e +5%` → "Preço médio" (amarelo, seta horizontal).
  - `< -5%` → "Preço bom" (verde, seta para baixo).
- Fornecedor `tipo: 'atacado'` exibe badge "Compra no atacado"; `tipo: 'fornecedor'` exibe
  "Pedido direto".

### 8.5 Entradas

- Dois modos, mutuamente exclusivos por sessão de tela: "Cupom por foto (IA)" ou "Nota
  manual".
- Extração por IA nunca inventa valor: campos ilegíveis viram `null` (regra reforçada no
  prompt de sistema).
- Antes de dar entrada no estoque, todo item extraído passa por uma tela de
  "match" — o sistema sugere o item correspondente do cadastro (por similaridade de
  texto simples, `sugerirItem`), mas o usuário confirma/corrige manualmente item a item.
  Um item pode ser marcado como "— Não corresponde —" para ser ignorado.
- "Só adicionar à planilha" registra a nota na sessão **sem** alterar o estoque;
  "Adicionar à planilha + dar entrada no estoque" faz as duas coisas.

---

## 9. Funcionalidades concluídas

- [x] Login simples por usuário + perfis de permissão (admin/gerente/operador)
- [x] Painel com indicadores gerais, alertas de estoque baixo e histórico recente
- [x] CRUD de itens de estoque (criar, editar, **excluir por soft delete**), com bloqueio
  de nome duplicado
- [x] Entradas via cupom fiscal (foto/PDF) com extração por IA (Anthropic) + match manual
- [x] Entradas via nota manual (sem depender de IA)
- [x] Saídas com busca por nome (autocomplete) e leitura de QR Code pela câmera
- [x] Transferências entre lojas com preview de estoque origem/destino
- [x] Histórico completo, filtrável (loja/tipo/período/busca) e paginado
- [x] Exportação CSV (Estoque, Histórico) e `.xlsx` (Entradas)
- [x] Geração de etiquetas com QR Code (biblioteca própria) e impressão
- [x] Leitura de QR Code universal via `jsQR` (funciona em qualquer navegador, corrigindo
  a limitação anterior do `BarcodeDetector` nativo, que só rodava no Chrome Android)
- [x] Página **Pedidos**: lista de compras por loja e por fornecedor, com indicador de
  tendência de preço
- [x] Migração automática de dados legados no `getData()` (fornecedores/`fornecedorId`
  para usuários que já tinham dados salvos antes da feature Pedidos)
- [x] **Sprint de UX/produtividade** (2026-07-10): foco automático após registrar
  movimentação, botão "Limpar filtros" (Estoque/Histórico), botão de limpar busca em
  todos os campos de pesquisa, navegação completa por teclado no autocomplete de item
  (↑↓/Enter/Esc) em Saídas e Transferências, atalhos rápidos no Painel (Entrada, Saída,
  Transferência, Estoque, Pedidos), confirmação por Enter no campo de quantidade
  (Saídas/Transferências/nota manual de Entradas) com destaque visual do campo pendente
  quando faltar algo, motivo de saída mantido entre lançamentos consecutivos, e botão
  "Limpar formulário" em Saídas/Transferências/Entradas. Detalhes completos em
  `docs/CHANGELOG.md`.

## 10. Funcionalidades em andamento

- **Extração de cupom fiscal via IA**: fluxo está implementado e integrado, mas:
  - O model id usado (`claude-sonnet-4-6`) precisa ser validado — não corresponde a um
    padrão de nome de modelo atual conhecido (ver Bugs conhecidos).
  - Não há registro nesta base de código de testes reais com cupons/notas variados.
- **Multiloja/multiusuário "de verdade"**: a modelagem (perfis, permissões, lojas) existe
  e funciona *dentro de um único navegador*, mas ainda não existe sincronização real de
  dados entre dispositivos/usuários diferentes — hoje é, na prática, single-device.

## 11. Funcionalidades pendentes

- Backend/API própria + banco de dados compartilhado (pré-requisito para multiusuário real)
- Autenticação segura (hash de senha, expiração de sessão, recuperação de senha)
- Tela de administração de usuários (hoje só existem os 4 usuários hardcoded em `app.js`)
- Tela de administração de fornecedores (hoje só existe o array `FORNECEDORES`, sem CRUD)
- Vincular preços realmente pagos (das notas de Entradas) ao histórico de preços usado em
  Pedidos, substituindo o mock atual
- Notificações proativas de estoque baixo/zerado (e-mail, push, WhatsApp etc.)
- Relatórios financeiros mais completos (custo por pizza, DRE simplificado etc.)
- Testes automatizados (unitários/integração/e2e)
- Pipeline de CI com lint/build/testes antes do deploy
- Modo claro / tema configurável (hoje só existe o tema escuro)
- Internacionalização (hoje 100% em pt-BR, sem abstração de textos)

## 12. Débitos técnicos

1. **"Banco de dados" = `localStorage`**: sem sincronização entre dispositivos, sem
   backup automático, sem histórico de versões — limpar o cache do navegador apaga tudo.
   É o débito técnico mais importante para qualquer plano de reestruturação.
2. **Autenticação trivial**: senha = nome do usuário; sem hashing; sessão sem expiração.
   Adequado só para uso interno de confiança, não escalável com segurança.
3. **Dados de referência hardcoded no código-fonte**: `USUARIOS`, `FORNECEDORES`,
   `CATEGORIAS`, `MOTIVOS_SAIDA`, `LOJAS` só mudam editando `app.js` e fazendo novo deploy.
4. **`HISTORICO_PRECOS` é mock estático**: calculado uma vez a partir dos 30 itens do seed
   original; não reflete edições de `precoUnit` nem cobre itens criados depois via "Novo
   item" (nesses casos, `pedidos.html` cai no fallback neutro "Preço médio").
5. **Estado de sessão de tela não persistido**: as tabelas "desta sessão" em
   Entradas/Saídas/Transferências são variáveis JS em memória — um refresh acidental
   perde a listagem local (embora as movimentações já confirmadas no estoque continuem
   salvas).
6. **Código morto**: `assets/db.js` e `assets/icons.js` existem, estão vazios e não são
   referenciados por nenhuma página.
7. **Resíduo de patch já aplicado**: `0001-fix-mobile-responsavel.patch` na raiz do repo
   corresponde ao commit `292c3ca` (já mesclado) — candidato a remoção.
8. **Duplicação de código**: o bloco de busca/autocomplete de item é praticamente
   idêntico entre `saidas.html` e `transferencias.html` — poderia virar uma função
   compartilhada em `app.js`.
9. **Zero testes automatizados** e **zero verificação (lint/build) no CI** antes do
   deploy — `deploy.yml` publica direto a cada push em `main`.
10. **API key da Anthropic em texto puro no `localStorage`** do navegador (visível via
    DevTools) — aceitável para um único usuário de confiança, arriscado se o
    dispositivo/navegador for compartilhado.
11. **Anotações pessoais com uma API key em texto puro** existem na raiz do projeto
    (`API Claude LBD Sistema.txt`) — já estão listadas em `.gitignore` e **não foram
    commitadas/pushadas** (confirmado via `git ls-files`), mas o ideal é mover esse tipo
    de segredo para um gerenciador de senhas em vez de um arquivo `.txt` local.
12. **CSS em arquivo único (~1460 linhas)** sem pré-processador — manejável hoje, mas vai
    exigir organização (ex.: split por componente) se o projeto crescer bem mais.

## 13. Bugs conhecidos

1. **Model id possivelmente inválido na extração por IA**: `entradas.html` chama a API da
   Anthropic com `model: 'claude-sonnet-4-6'`, um identificador que não corresponde a
   nenhuma convenção de nome de modelo atual conhecida. Se o id estiver incorreto/obsoleto,
   toda extração de cupom por IA falha. **Precisa ser validado/corrigido antes de confiar
   nessa feature em produção.**
2. **`LBD03` sem usuário dedicado**: nenhum `gerente`/`operador` do seed tem
   `loja: 'LBD03'` — só o admin opera essa loja hoje. Pode ser proposital (loja nova,
   ainda sem equipe cadastrada) ou um esquecimento — vale confirmar com o time.
3. **Indicador de preço sempre neutro para itens novos**: itens criados via "Novo item"
   em Estoque não têm registro em `HISTORICO_PRECOS`; em `pedidos.html` isso resulta em
   `getIndicadorPreco` sempre retornar `status: 'medio'` (não é um crash, mas o rótulo
   "Preço médio" pode enganar o usuário achando que há dado histórico real).

*(O bug de migração de fornecedores para dados legados salvos antes da feature Pedidos já
foi identificado e corrigido — ver commit `90fe0fc`.)*

## 14. Próximos passos recomendados

1. **Decidir o destino da arquitetura de dados** antes de qualquer refatoração grande:
   continuar em `localStorage` (aceitando a limitação single-device) ou migrar para um
   backend real (API própria + banco, ou BaaS como Supabase/Firebase) para permitir
   múltiplas lojas/usuários simultâneos de verdade.
2. Se a decisão for migrar para backend: desenhar a API (REST ou GraphQL), mover as
   regras de negócio hoje em `assets/app.js` (seções 4 a 5) para o servidor, e
   implementar autenticação real (hash + sessão/JWT com expiração).
3. Extrair `USUARIOS` e `FORNECEDORES` para telas de administração (CRUD via UI), em vez
   de hardcoded no JS.
4. Validar/corrigir o `model` usado na chamada à API da Anthropic em `entradas.html`.
5. Introduzir testes básicos (mesmo que só nas funções puras de `app.js`, como
   `getStatusEstoque`, `registrarMovimentacao`, `getIndicadorPreco`) **antes** de iniciar
   a reestruturação, para servir de rede de segurança contra regressões.
6. Adicionar um passo de verificação (lint/build/testes) no `deploy.yml` antes do publish.
7. Resolver os débitos técnicos "de baixo custo": remover `assets/db.js`,
   `assets/icons.js` e `0001-fix-mobile-responsavel.patch`; unificar o autocomplete de
   item duplicado entre Saídas e Transferências.
8. Planejar como o `HISTORICO_PRECOS` (mock) vai ser substituído por preços reais assim
   que Entradas passar a persistir os preços pagos por nota.
9. Definir um plano de migração de segredos (API key da Anthropic) para fora de arquivos
   `.txt` locais, mesmo que hoje não estejam expostos no Git.

---

## Como manter este documento

- Ao concluir uma feature, mova-a de "em andamento/pendentes" para "concluídas" e
  atualize a data no topo.
- Ao identificar um débito técnico ou bug novo, adicione-o nas seções 12/13 no momento em
  que for descoberto — não deixe para depois.
- Ao mudar qualquer regra de permissão, dado, ou fluxo, atualize a seção correspondente
  (8, 7, 6) no mesmo commit da mudança de código.
