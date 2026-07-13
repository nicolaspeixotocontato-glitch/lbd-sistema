# SPRINT_BOARD.md — La Bella Donna ERP (lbd-sistema)

> Quadro de tarefas do momento — o que está sendo feito agora, nada além disso.
> Ao contrário do ROADMAP.md (plano de longo prazo), este documento é descartável:
> reescreva o conteúdo inteiro a cada novo ciclo de trabalho, sem manter histórico aqui
> (histórico vive no CHANGELOG.md).
> Última atualização: 13/07/2026.

## Em andamento agora

- [ ] Escrever e revisar os 5 documentos de governança que faltavam (`VISION.md`,
      `ROADMAP.md`, `SPRINT_BOARD.md` — este arquivo —, `KNOWN_ISSUES.md`,
      `CEO_DASHBOARD.md`).

## Concluído recentemente

- [x] Corrigir Fase 1 de fato (fornecedores reais + LBD02 → Nonoai) — validado em produção.
- [x] Corrigir categorização de itens enlatados e remover item duplicado — validado.
- [x] Remover recurso de IA / chave de API exposta em Entradas — validado.
- [x] Publicar dashboard de acompanhamento ao vivo em `dashboard/index.html`.
- [x] Micro Sprint Mobile First (`assets/style.css` + 8 páginas operacionais) —
      implementada e validada visualmente em portrait/landscape/tablet/desktop
      (ver `CHANGELOG.md`, 13/07/2026). **Ainda não commitada nem enviada ao
      GitHub** — ver bloqueio abaixo.

## Próximo da fila (ainda não iniciado)

- [ ] Commitar e enviar ao GitHub a Micro Sprint Mobile First.
- [ ] Formalizar o processo de entrega padrão (prompt → execução → validação técnica
      em produção com hard refresh → registro no changelog e no roadmap).
- [ ] Iniciar Fase 3 — contagem física de estoque e cálculo de CMV real.
- [ ] Revisar os débitos técnicos remanescentes listados em `PROJECT_CONTEXT.md`.

## Bloqueios ativos

- Micro Sprint Mobile First está concluída e validada, mas existe **só como
  mudança local não commitada** no computador (decisão explícita da rodada
  anterior). Enquanto não for commitada, o trabalho não tem backup nem
  histórico no Git — risco de perda se os arquivos locais forem alterados ou
  perdidos antes do commit.
