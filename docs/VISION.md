# VISION.md — La Bella Donna ERP (lbd-sistema)

> Documento de contexto permanente sobre o propósito do sistema. Muda raramente —
> só quando o propósito ou o público do projeto mudar de verdade, não a cada feature nova.
> Última atualização: 13/07/2026.

## 1. Para que este sistema existe

O LBD Sistema existe para dar controle real sobre compra de insumos e estoque para a
franquia de pizzarias La Bella Donna — hoje com 2 lojas (Cristóvão e Nonoai) e uma
terceira em abertura (menos de 2 meses). Antes dele, esse controle era feito em
planilhas manuais, sujeitas a erro de digitação, sem visão consolidada entre lojas, e
sem histórico confiável de preço pago por fornecedor.

O sistema não existe para ser um ERP genérico ou um projeto de portfólio técnico — ele
existe para resolver um problema operacional específico: saber o que comprar, de quem,
quando, e por quanto, em mais de uma loja ao mesmo tempo.

## 2. Para quem é

- **Nicolas** (responsável pela compra de insumos): usuário principal, papel de
  administrador. É quem toma as decisões de produto — o sistema deve se adaptar ao
  processo real dele, não o contrário.
- **Gerentes de loja**: registram entradas, saídas, transferências e consultam pedidos.
- **Operadores**: registram saídas do dia a dia (consumo, perda, ajuste), acesso mais restrito.

## 3. Como sabemos que está funcionando

O sistema está cumprindo seu propósito quando:

- Nicolas consegue, em poucos minutos, saber o que precisa comprar por fornecedor, sem
  abrir planilha nenhuma.
- O estoque do sistema bate com o estoque físico contado (ou a diferença é visível e
  vira um ajuste explícito, não um mistério).
- Uma nova loja pode ser adicionada sem reescrever a lógica do sistema.
- Ninguém mais precisa manter a planilha em paralelo "por garantia".

## 4. O que este sistema explicitamente não tenta ser

- **Não é um sistema de PDV ou de vendas** — isso já é resolvido por outra ferramenta
  (Saipos) usada na operação; o LBD Sistema não tenta substituí-la.
- **Não é um sistema financeiro/contábil completo** — não emite nota fiscal, não fecha
  caixa, não calcula impostos.
- **Não depende de conexão constante com um backend** — hoje é uma aplicação
  inteiramente client-side (ver `PROJECT_CONTEXT.md` para detalhes técnicos e débitos
  associados a essa escolha).
- **Não é sobre automatizar 100% das decisões de compra** — quantidades sugeridas
  automaticamente sempre poderão ser ajustadas manualmente (ver ROADMAP.md, Fase 4),
  porque quem entende a sazonalidade da demanda é Nicolas, não uma fórmula.

## 5. Princípio orientador

A base do projeto é usar exatamente o que já funciona na operação real (o processo de
contagem, os fornecedores reais, a forma como os pedidos já são feitos), otimizando a
maneira como isso é feito — não impondo um processo novo e teórico por cima de um
processo que já funciona na prática.
