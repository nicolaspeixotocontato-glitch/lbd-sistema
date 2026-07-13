# CEO_DASHBOARD.md — Resumo Executivo

> Uma página, sem termos técnicos. Pra quem quer saber "como está o projeto" sem
> precisar ler código ou documentação técnica. Atualize sempre que o progresso mudar
> de forma relevante — o valor deste documento está em ele estar sempre atual.
> Última atualização: 13/07/2026 — Progresso geral: **60%**

## Onde estamos

O sistema já está rodando com dados reais da operação: os 152 itens de verdade (não
mais itens de teste), os 21 fornecedores reais, e os nomes corretos das lojas
(incluindo "LBD02 – Nonoai"). Um problema de segurança que existia (uma chave de acesso
guardada de forma exposta no navegador) já foi eliminado.

## O que mudou recentemente

- Catálogo de itens trocado de fictício para real, com categorias específicas por tipo
  de produto (carnes, queijos, hortifruti, limpeza, etc.), ao invés de categorias
  genéricas.
- Correção de dois itens que estavam classificados errado (itens enlatados marcados
  como hortifruti fresco) e remoção de um item duplicado.
- Lista de fornecedores e nome da segunda loja corrigidos — essa mudança tinha sido
  pedida antes, mas não tinha sido executada de fato; foi corrigida agora depois de uma
  checagem técnica.
- Removido um recurso que ainda não era usado (leitura de cupom fiscal por foto) e que
  representava um risco de segurança desnecessário.
- Criado um painel de acompanhamento ao vivo, acessível por link direto, mostrando o
  progresso de cada etapa do projeto sem precisar desta conversa.

## Riscos e pendências mais importantes agora

1. **Dados de estoque ainda não preenchidos.** O catálogo real está no sistema, mas os
   números de estoque mínimo e quantidade atual de cada item ainda estão zerados —
   precisam ser preenchidos na tela de Estoque para os pedidos automáticos funcionarem.
2. **Documentação e processo em construção.** Estamos formalizando como o projeto é
   documentado e como cada mudança é validada, para reduzir dependência de memória de
   conversa e evitar que algo pedido "fique perdido" sem ninguém notar (como aconteceu
   com a correção de fornecedores).
3. **Débitos técnicos catalogados, ainda não resolvidos.** O sistema roda inteiramente
   no navegador (sem servidor próprio), o que significa: sem backup automático, sem
   sincronização entre aparelhos, e senhas simples. Isso é aceitável para o estágio
   atual do projeto, mas deve ser revisto conforme a operação cresce (ex: terceira loja
   abrindo).

## O que vem a seguir

Começar a Fase 3: o processo de contagem física de estoque (a mesma rotina que já é
feita hoje, de forma manual) e o cálculo automático de custo real, integrado ao
sistema.
