# ROADMAP.md — La Bella Donna ERP (lbd-sistema)

> Plano de fases do projeto, em ordem. Este é o documento oficial e resumido —
> deve ser atualizado a cada fase concluída ou reaberta, com base em validação
> técnica em produção, não em confirmação verbal.
> Última atualização: 13/07/2026.

## Como ler este documento

Cada fase tem um status: `concluída`, `em execução`, `planejada`, ou `dispensada`.
Uma fase só é marcada como `concluída` depois de validação técnica direta em produção
(não apenas por ter sido pedida ou "provavelmente" executada).

---

## Fase 1 — Fornecedores reais e identidade das lojas
**Status: concluída**

Substituição da lista fictícia de fornecedores pelos 21 fornecedores reais da operação,
e renomeação de LBD02 para seu nome real de bairro ("Nonoai").

## Fase 2 — Catálogo real de itens
**Status: concluída**

Substituição do catálogo fictício de itens de teste pelo catálogo real de 152 itens,
extraído das planilhas de estoque e pedidos já usadas na operação, com categorias
específicas por tipo de produto (não as categorias genéricas da planilha original).
Migração de dados preserva o histórico de testes anteriores (itens antigos desativados,
não apagados).

## Fase 2.1 — Correção de categorização e item duplicado
**Status: concluída**

Correções pontuais identificadas após a Fase 2: dois itens enlatados recategorizados
corretamente, e uma bandeja de ovos duplicada removida do catálogo ativo.

## Fase 2.2 — Remoção de risco de segurança (chave de API exposta)
**Status: concluída**

Remoção do recurso de leitura de cupom fiscal por foto (IA), que ainda não estava em
uso e mantinha uma chave de API em texto puro no navegador do usuário.

## Fase 3 — Contagem física e CMV real
**Status: planejada — próxima a iniciar**

Implementar o processo de contagem física já usado por Nicolas (contagem simplificada
semanal, contagem geral mensal), com checklist impresso por loja e um passo de ajuste
de estoque (positivo ou negativo) após cada contagem. O cálculo de CMV real seguirá a
mesma lógica já usada na planilha (estoque inicial + incremento − contagem final =
consumo, multiplicado pelo preço).

## Fase 4 — Ajuste manual de pedidos
**Status: planejada**

Permitir ajuste manual da quantidade sugerida automaticamente pelo sistema, para cobrir
datas sazonais com demanda maior que o normal. Depende da Fase 3 estar concluída.

## Fase 5 — Fluxos especiais (Duplex, Divine, Câmara Fria)
**Status: dispensada**

Fluxos específicos por nota fiscal para os fornecedores de caixas (Duplex) e chocolate
(Divine), e controle compartilhado de estoque de mussarela entre lojas (Câmara Fria).
Dispensados a pedido de Nicolas — são abas da planilha original pouco usadas na prática.

---

## Iniciativa paralela: estrutura profissional do projeto

Fora da sequência de fases numeradas acima, há uma iniciativa em andamento para elevar
o nível de maturidade do projeto como um todo (não só funcionalidades):

1. Segurança — concluída (Fase 2.2 acima).
2. Documentação de governança — em andamento (este conjunto de documentos).
3. Processo de entrega padronizado — planejado.
4. Revisão de arquitetura e débitos técnicos (ver `PROJECT_CONTEXT.md`, seção 12) — planejada, após os itens acima.

Ver `KNOWN_ISSUES.md` para os problemas de comportamento/UX já identificados, e
`CEO_DASHBOARD.md` para um resumo executivo de alto nível sem termos técnicos.
