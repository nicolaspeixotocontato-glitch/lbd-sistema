# KNOWN_ISSUES.md — La Bella Donna ERP (lbd-sistema)

> Catálogo de problemas de comportamento e experiência de uso já identificados e ainda
> não corrigidos. Diferente dos débitos técnicos de `PROJECT_CONTEXT.md` (que são sobre
> arquitetura de código), este documento é sobre o que o usuário sente ao usar o sistema.
> Atualize sempre que um item daqui for corrigido (mova para o CHANGELOG.md) ou um novo
> for encontrado.
> Última atualização: 13/07/2026.

## Como usar este documento

Cada item tem uma gravidade:
- **Alta** — atrapalha o uso diário ou gera dado incorreto.
- **Média** — atrito perceptível, mas com contorno possível.
- **Baixa** — cosmético ou raramente notado.

---

## Alta

### LBD03 polui as estatísticas globais do Painel
A loja LBD03 (ainda não aberta ao público) está incluída nos cálculos gerais do Painel,
inflando artificialmente números como "itens abaixo do mínimo" e "itens zerados" —
tornando o panorama do Painel enganoso enquanto essa loja não está em operação.

### Campo de fornecedor em Entradas é texto livre
Na tela de Entradas, o campo de fornecedor é digitado livremente, sem conexão com a
lista fixa de `FORNECEDORES` usada em Pedidos. Isso permite inconsistência de nomes
(o mesmo fornecedor grafado de formas diferentes) e impede qualquer agregação
automática por fornecedor a partir de dados de Entradas.

---

## Média

### Filtro de categorias do Estoque pode ficar denso no mobile
Com 14 categorias específicas (desde a Fase 2), a linha de filtro por categoria na tela
de Estoque pode ficar visualmente carregada em telas pequenas. Ainda não confirmado
diretamente em um celular real — hipótese levantada durante teste de UX em navegador
desktop.

### Modal "Novo item" não tem campo de fornecedor
Ao cadastrar um item novo manualmente pela interface, não há campo para associar um
fornecedor. Isso significa que qualquer item cadastrado assim nunca aparece agrupado
corretamente na tela de Pedidos "Por fornecedor".

### Dropdown de login expõe todos os usernames válidos
A tela de login tem um seletor de usuário que lista todos os nomes de usuário
cadastrados, visível para qualquer pessoa que abra a tela — facilita adivinhação de
credenciais (a senha, hoje, é o próprio nome em minúsculas — ver débito técnico
relacionado em `PROJECT_CONTEXT.md`).

---

## Baixa

### Gap de altura no sidebar em páginas com muito conteúdo
Em páginas com rolagem longa, existe um espaço vazio no fim do menu lateral. Padrão
visual já existente em várias telas — não é uma regressão nova, só ainda não foi
corrigido.
