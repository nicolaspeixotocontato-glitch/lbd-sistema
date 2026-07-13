# SPRINT_BOARD.md — La Bella Donna ERP (lbd-sistema)

> Quadro de tarefas do momento — o que está sendo feito agora, nada além disso.
> Ao contrário do ROADMAP.md (plano de longo prazo), este documento é descartável:
> reescreva o conteúdo inteiro a cada novo ciclo de trabalho, sem manter histórico aqui
> (histórico vive no CHANGELOG.md).
> Última atualização: 13/07/2026.

## Em andamento agora

- Nenhuma tarefa em andamento no momento.

## Concluído recentemente

- [x] Fase 4 — ajuste manual de quantidade em Pedidos (`pedidos.html`, seção "Por
      fornecedor"): colunas "Sugerido"/"Pedido", indicador visual de ajuste, resumo
      executivo/seleção/WhatsApp/CSV usando o valor ajustado, estado só em memória —
      implementada e validada em servidor local. Bug pré-existente encontrado durante
      a validação (`labelTipoFornecedor` não reconhece fornecedor `tipo: 'direto'`),
      registrado no `CHANGELOG.md`, não corrigido nesta sprint (fora de escopo).
- [x] Correções pós-teste da Fase 3 (Contagem): busca sem acentuação
      (`normalizarBusca()` compartilhada), badge de diferença com largura fixa,
      rascunho persistente isolado por usuário — validado em servidor local.
- [x] Fase 3 — tela de Contagem física (semanal/mensal), cálculo automático de
      consumo/CMV e ajuste de estoque (`contagem.html`, novo tipo de histórico
      `'ajuste'`, novo array `data.contagens`) — implementada e validada em servidor
      local (contagem semanal e mensal, diferença positiva e negativa, bloqueio do
      fechamento mensal sem observação). Fórmula de consumo corrigida durante a
      validação (dupla contagem de entradas); detalhe em `CHANGELOG.md`.
- [x] Corrigir Fase 1 de fato (fornecedores reais + LBD02 → Nonoai) — validado em produção.
- [x] Corrigir categorização de itens enlatados e remover item duplicado — validado.
- [x] Remover recurso de IA / chave de API exposta em Entradas — validado.
- [x] Publicar dashboard de acompanhamento ao vivo em `dashboard/index.html`.
- [x] Micro Sprint Mobile First (`assets/style.css`, `entradas.html`,
      `saidas.html`) — implementada, validada visualmente em
      portrait/landscape/tablet/desktop, e **commitada e enviada ao GitHub**
      (commit `52477e9`, 13/07/2026).

## Próximo da fila (ainda não iniciado)

- [ ] Formalizar o processo de entrega padrão (prompt → execução → validação técnica
      em produção com hard refresh → registro no changelog e no roadmap).
- [ ] Corrigir `labelTipoFornecedor()` em `pedidos.html` para reconhecer fornecedor
      `tipo: 'direto'` (hoje cai no rótulo errado "Sem fornecedor cadastrado").
- [ ] Revisar os débitos técnicos remanescentes listados em `PROJECT_CONTEXT.md`.
- [ ] Decidir o que fazer com `0001-fix-mobile-responsavel.patch` (arquivo solto,
      não rastreado pelo Git, na raiz do projeto — aparenta ser resíduo de uma
      correção já commitada anteriormente).

## Bloqueios ativos

- Nenhum no momento.
