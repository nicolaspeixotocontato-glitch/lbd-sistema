# SPRINT_BOARD.md — La Bella Donna ERP (lbd-sistema)

> Quadro de tarefas do momento — o que está sendo feito agora, nada além disso.
> Ao contrário do ROADMAP.md (plano de longo prazo), este documento é descartável:
> reescreva o conteúdo inteiro a cada novo ciclo de trabalho, sem manter histórico aqui
> (histórico vive no CHANGELOG.md).
> Última atualização: 18/07/2026.

## Em andamento agora

- Nenhuma tarefa em andamento no momento.

## Concluído recentemente

- [x] Importação de estoque em lote via CSV (`estoque.html`): botão "Importar CSV",
      match por nome com `normalizarBusca()`, pré-visualização obrigatória
      (Encontrado/Não encontrado/Ambíguo/Inválido) antes de qualquer escrita, grava
      `historico` tipo `'ajuste'` só nas linhas confirmadas — implementada e validada
      em servidor local (CSV de teste cobrindo os 4 status, inclusive um caso ambíguo
      proposital). Não estava no plano original — registrada fora da numeração de
      fases no `ROADMAP.md`.
- [x] Fase 3 (Contagem) e Fase 4 (ajuste manual de Pedidos) implementadas, commitadas
      e enviadas ao GitHub. Fase 4 validada de ponta a ponta com dados simulados
      (ajuste de quantidade com decimal, mensagem de WhatsApp com preço/tendência,
      ajuste sobrevivendo à troca de filtro, reset em reload, bloqueio de valor
      negativo) — ver `CHANGELOG.md` e `ROADMAP.md` para detalhe completo.
- [x] Arquivos soltos (`0001-fix-mobile-responsavel.patch`, `teste.pdf`) adicionados
      ao `.gitignore` — não poluem mais o `git status`, sem precisar apagá-los agora.
- [x] `CEO_DASHBOARD.md` atualizado (progresso geral: 75%).

## Próximo da fila (ainda não iniciado — sem prioridade definida)

- [ ] Preencher os dados reais de estoque mínimo por item/loja (hoje majoritariamente
      zerados) — sem isso, a tela de Pedidos não tem o que sugerir na prática. A
      importação de CSV recém-implementada cobre a quantidade atual, mas não o
      mínimo — pode valer a pena estender o mesmo fluxo para isso no futuro.
- [ ] Corrigir `labelTipoFornecedor()` em `pedidos.html` para reconhecer fornecedor
      `tipo: 'direto'` (hoje cai no rótulo errado "Sem fornecedor cadastrado").
- [ ] Formalizar o processo de entrega padrão (prompt → execução → validação técnica
      → registro no changelog e no roadmap).
- [ ] Revisar os débitos técnicos remanescentes listados em `PROJECT_CONTEXT.md`.

## Bloqueios ativos

- Nenhum no momento.
