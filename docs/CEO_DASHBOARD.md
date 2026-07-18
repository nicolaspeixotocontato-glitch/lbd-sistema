# CEO_DASHBOARD.md — Resumo Executivo

> Uma página, sem termos técnicos. Pra quem quer saber "como está o projeto" sem
> precisar ler código ou documentação técnica. Atualize sempre que o progresso mudar
> de forma relevante — o valor deste documento está em ele estar sempre atual.
> Última atualização: 18/07/2026 — Progresso geral: **75%**

## Onde estamos

O sistema roda com dados reais da operação (152 itens, 21 fornecedores, nomes corretos
das lojas) e agora cobre o ciclo completo de compra: contagem física de estoque,
cálculo automático de consumo/custo, e montagem de pedido por fornecedor com ajuste
manual de quantidade — as duas frentes que faltavam desde a última atualização deste
resumo já estão prontas e publicadas.

## O que mudou recentemente

- **Contagem física de estoque** (Fase 3): nova tela onde qualquer gerente ou chefe de
  cozinha registra a contagem semanal ou mensal de cada loja. O sistema calcula
  sozinho o consumo de cada item e ajusta o estoque automaticamente — substitui a
  conta feita hoje na planilha. Na contagem mensal, itens com diferença (sobrou ou
  faltou mais do que devia) ficam destacados e exigem uma anotação do motivo antes de
  fechar, virando um registro de investigação ao longo do tempo, não só um número.
- **Ajuste manual de pedidos** (Fase 4): na tela de Pedidos, a quantidade sugerida
  automaticamente pelo sistema agora pode ser ajustada na hora de montar o pedido
  (útil pra datas de demanda maior, como feriados). A mensagem enviada pro fornecedor
  via WhatsApp também passou a mostrar o último preço pago e se está caro, médio ou
  bom — informação que antes só aparecia dentro do sistema.
- Melhorias de uso no celular/tablet (tabelas, botões e campos de busca que ficavam
  ruins de usar em telas pequenas).

## Riscos e pendências mais importantes agora

1. **Dados de estoque mínimo ainda não preenchidos na maioria dos itens.** Boa parte
   do catálogo real ainda está com "estoque mínimo" zerado — sem esse número
   preenchido por item e por loja, a tela de Pedidos não consegue sugerir o que
   comprar (ela calcula com base nesse mínimo). Esse é o principal motivo pelo qual a
   tela de Pedidos pode parecer "vazia" hoje, mesmo estando pronta e testada.
2. **Um fornecedor pode aparecer com etiqueta errada em Pedidos.** Fornecedores
   cadastrados como "venda direta" (a maioria dos 21 reais) aparecem com o aviso
   "Sem fornecedor cadastrado", mesmo estando cadastrados normalmente — é só um erro
   de rótulo visual, não afeta o pedido em si. Já identificado, correção simples ainda
   não feita.
3. **Débitos técnicos catalogados, ainda não resolvidos.** O sistema roda inteiramente
   no navegador (sem servidor próprio): sem backup automático, sem sincronização entre
   aparelhos, senhas simples. Aceitável para o estágio atual, mas deve ser revisto
   conforme a operação cresce (ex: terceira loja abrindo).

## O que vem a seguir

Não há uma próxima fase numerada definida ainda — as 5 fases originais do plano estão
concluídas ou dispensadas. Os próximos passos possíveis: preencher os dados reais de
estoque mínimo (destrava a tela de Pedidos de verdade), corrigir a etiqueta de
fornecedor incorreta, e revisar os débitos técnicos catalogados (ver
`PROJECT_CONTEXT.md`). Prioridade a definir com Nicolas.
