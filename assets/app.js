/* ==========================================================================
   La Bella Donna Pizzaria — App Core
   ========================================================================== */

/* ==========================================================================
   1. Constantes
   ========================================================================== */

const APP_VERSION = '1.0.0';

const LOJAS = [
  { id: 'LBD01', nome: 'Cristóvão', label: 'LBD01 – Cristóvão' },
  { id: 'LBD02', nome: 'Zona Sul', label: 'LBD02 – Zona Sul' },
  { id: 'LBD03', nome: 'Nova Loja', label: 'LBD03 – Nova Loja' },
];

const CATEGORIAS = [
  'Carnes, Frios e Embutidos',
  'Queijos e Laticínios',
  'Hortifruti',
  'Molhos e Conservas',
  'Temperos e Condimentos',
  'Óleos e Gorduras',
  'Farinhas e Massas',
  'Doces e Sobremesas',
  'Salgadinhos e Snacks',
  'Congelados',
  'Bebidas',
  'Embalagens',
  'Descartáveis e EPI',
  'Limpeza',
];

const FORNECEDORES = [
  { id: 'f1', nome: 'Laticínios Vale Verde', tipo: 'fornecedor' },
  { id: 'f2', nome: 'Frios & Cia Distribuidora', tipo: 'fornecedor' },
  { id: 'f3', nome: 'Hortifruti Bom Preço', tipo: 'fornecedor' },
  { id: 'f4', nome: 'Distribuidora Bebidas Sul', tipo: 'fornecedor' },
  { id: 'f5', nome: 'Assaí Atacadista', tipo: 'atacado' },
  { id: 'f6', nome: 'Makro Atacado', tipo: 'atacado' },
  { id: 'f7', nome: 'Doce Sabor Insumos', tipo: 'fornecedor' },
  { id: 'f8', nome: 'Padaria Trigo Dourado', tipo: 'fornecedor' },
];

const MOTIVOS_SAIDA = [
  'Consumo em produção',
  'Perda / Vencimento',
  'Quebra / Avaria',
  'Ajuste de inventário',
  'Uso interno / funcionários',
  'Amostra / Degustação',
  'Devolução ao fornecedor',
  'Outro',
];

const USUARIOS = [
  { id: 'u1', nome: 'Nicolas', iniciais: 'NI', perfil: 'admin', loja: null },
  { id: 'u2', nome: 'Carlos', iniciais: 'CA', perfil: 'gerente', loja: 'LBD01' },
  { id: 'u3', nome: 'Maria', iniciais: 'MA', perfil: 'gerente', loja: 'LBD02' },
  { id: 'u4', nome: 'Pedro', iniciais: 'PE', perfil: 'operador', loja: 'LBD01' },
];

/* ==========================================================================
   2. Dados Iniciais
   ========================================================================== */

const DADOS_INICIAIS = {
  itens: [
    { id: 'i001', nome: 'Abacaxi 400g', cat: 'Hortifruti', un: 'un', precoUnit: 15.26, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'msx' },
    { id: 'i002', nome: 'Açúcar 1kg', cat: 'Doces e Sobremesas', un: 'un', precoUnit: 3.59, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'atacado' },
    { id: 'i003', nome: 'Água com gás', cat: 'Bebidas', un: 'un', precoUnit: 1.35, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'fensa' },
    { id: 'i004', nome: 'Água Sanitária 5l', cat: 'Limpeza', un: 'un', precoUnit: 9.9, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'atacado' },
    { id: 'i005', nome: 'Água sem gás', cat: 'Bebidas', un: 'un', precoUnit: 1.35, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'fensa' },
    { id: 'i006', nome: 'Álcool 1l', cat: 'Limpeza', un: 'un', precoUnit: 4.49, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'atacado' },
    { id: 'i007', nome: 'Alho picado congelado 1kg', cat: 'Temperos e Condimentos', un: 'un', precoUnit: 34.99, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'senar' },
    { id: 'i008', nome: 'Anel de cebola 1kg', cat: 'Salgadinhos e Snacks', un: 'un', precoUnit: 22.49, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'kem' },
    { id: 'i009', nome: 'Atum Ralado', cat: 'Molhos e Conservas', un: 'un', precoUnit: 6.84, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'dellys' },
    { id: 'i010', nome: 'Azeitona 1,8kg', cat: 'Molhos e Conservas', un: 'un', precoUnit: 48.45, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'atacado' },
    { id: 'i011', nome: 'Bacon', cat: 'Carnes, Frios e Embutidos', un: 'kg', precoUnit: 42.85, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'msx' },
    { id: 'i012', nome: 'Batata palha 1kg', cat: 'Salgadinhos e Snacks', un: 'un', precoUnit: 32.99, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'senar' },
    { id: 'i013', nome: 'Batata Palito 2,5kg', cat: 'Salgadinhos e Snacks', un: 'un', precoUnit: 30.52, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'kem' },
    { id: 'i014', nome: 'Batata Rústica 2,5kg', cat: 'Salgadinhos e Snacks', un: 'un', precoUnit: 36.99, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'kem' },
    { id: 'i015', nome: 'Bisnaga branca 1,01kg', cat: 'Doces e Sobremesas', un: 'un', precoUnit: 21.55, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'divine' },
    { id: 'i016', nome: 'Bisnaga Kinder Bueno 1,01kg', cat: 'Doces e Sobremesas', un: 'un', precoUnit: 35.1, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'divine' },
    { id: 'i017', nome: 'Bisnaga Pistache', cat: 'Doces e Sobremesas', un: 'un', precoUnit: 35.78, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'novomix' },
    { id: 'i018', nome: 'Bisnaga preta 1,01kg', cat: 'Doces e Sobremesas', un: 'un', precoUnit: 23.57, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'divine' },
    { id: 'i019', nome: 'Bombom ouro branco 1kg', cat: 'Doces e Sobremesas', un: 'un', precoUnit: 56.99, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'atacado' },
    { id: 'i020', nome: 'Brocolis congelado grano 1kg', cat: 'Congelados', un: 'un', precoUnit: 12.45, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'atacado' },
    { id: 'i021', nome: 'Caixa 25 cm', cat: 'Embalagens', un: 'un', precoUnit: 2, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'duplex' },
    { id: 'i022', nome: 'Caixa 30 cm', cat: 'Embalagens', un: 'un', precoUnit: 1.04, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'duplex' },
    { id: 'i023', nome: 'Caixa 35 cm', cat: 'Embalagens', un: 'un', precoUnit: 2.9, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'duplex' },
    { id: 'i024', nome: 'Caixa Mini', cat: 'Embalagens', un: 'un', precoUnit: 1.35, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'duplex' },
    { id: 'i025', nome: 'Calabresa', cat: 'Carnes, Frios e Embutidos', un: 'kg', precoUnit: 20.39, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'msx' },
    { id: 'i026', nome: 'Canela em pó 200g', cat: 'Temperos e Condimentos', un: 'un', precoUnit: 7.49, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'queijoecia' },
    { id: 'i027', nome: 'Catupiry Original 1,5kg', cat: 'Queijos e Laticínios', un: 'un', precoUnit: 55.89, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'senar' },
    { id: 'i028', nome: 'Cebola 20kg', cat: 'Hortifruti', un: 'un', precoUnit: 80, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'ceasa' },
    { id: 'i029', nome: 'Cebola crispy 500G', cat: 'Temperos e Condimentos', un: 'kg', precoUnit: 26.34, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'dellys' },
    { id: 'i030', nome: 'Cebola Roxa', cat: 'Hortifruti', un: 'kg', precoUnit: 7, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'ceasa' },
    { id: 'i031', nome: 'Cebolette', cat: 'Hortifruti', un: 'un', precoUnit: 2, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'ceasa' },
    { id: 'i032', nome: 'Cheddar bisnaga 1,6KG', cat: 'Queijos e Laticínios', un: 'un', precoUnit: 45, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'msx' },
    { id: 'i033', nome: 'Chocolate Granulado Macio 1,01KG', cat: 'Doces e Sobremesas', un: 'un', precoUnit: 19.89, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'novomix' },
    { id: 'i034', nome: 'Chocolate ralado branco', cat: 'Doces e Sobremesas', un: 'un', precoUnit: 226.76, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'msx' },
    { id: 'i035', nome: 'Chocolate ralado preto', cat: 'Doces e Sobremesas', un: 'un', precoUnit: 189.32, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'msx' },
    { id: 'i036', nome: 'Coca cola 2 lts', cat: 'Bebidas', un: 'un', precoUnit: 8.37, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'fensa' },
    { id: 'i037', nome: 'Coca cola 2 lts zero', cat: 'Bebidas', un: 'un', precoUnit: 8.4, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'fensa' },
    { id: 'i038', nome: 'coca cola 350', cat: 'Bebidas', un: 'un', precoUnit: 2.58, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'fensa' },
    { id: 'i039', nome: 'coca cola 350 zero', cat: 'Bebidas', un: 'un', precoUnit: 2.57, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'fensa' },
    { id: 'i040', nome: 'Coca cola 600', cat: 'Bebidas', un: 'un', precoUnit: 3.18, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'fensa' },
    { id: 'i041', nome: 'Coca cola 600 zero', cat: 'Bebidas', un: 'un', precoUnit: 3.19, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'fensa' },
    { id: 'i042', nome: 'Coco ralado (flocos) 1kg', cat: 'Doces e Sobremesas', un: 'un', precoUnit: 32.9, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'atacado' },
    { id: 'i043', nome: 'copa', cat: 'Carnes, Frios e Embutidos', un: 'un', precoUnit: 72.2, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'pamplona' },
    { id: 'i044', nome: 'Cream Cheese 1,5kg', cat: 'Queijos e Laticínios', un: 'un', precoUnit: 56.99, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'senar' },
    { id: 'i045', nome: 'Creme de leite 200g', cat: 'Queijos e Laticínios', un: 'un', precoUnit: 1.59, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'atacado' },
    { id: 'i046', nome: 'Desengordurante Grill', cat: 'Limpeza', un: 'un', precoUnit: 89.9, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'gcn' },
    { id: 'i047', nome: 'Desengraxante Clor Gel', cat: 'Limpeza', un: 'un', precoUnit: 60, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'gcn' },
    { id: 'i048', nome: 'Desinfetante 5l', cat: 'Limpeza', un: 'un', precoUnit: 15.9, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'atacado' },
    { id: 'i049', nome: 'Desodorizador de ambiente(bom ar)', cat: 'Limpeza', un: 'un', precoUnit: 8.89, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'atacado' },
    { id: 'i050', nome: 'Detergente 5l', cat: 'Limpeza', un: 'un', precoUnit: 30, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'gcn' },
    { id: 'i051', nome: 'Divisórias', cat: 'Embalagens', un: 'un', precoUnit: 110, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'duplex' },
    { id: 'i052', nome: 'Doce de leite Mumu', cat: 'Doces e Sobremesas', un: 'un', precoUnit: 116.9, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'atacado' },
    { id: 'i053', nome: 'Doritos 257g', cat: 'Salgadinhos e Snacks', un: 'un', precoUnit: 15.99, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'atacado' },
    { id: 'i054', nome: 'Esfregão de aço', cat: 'Descartáveis e EPI', un: 'un', precoUnit: 1.99, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'atacado' },
    { id: 'i055', nome: 'ESPONJA BOMBRIL', cat: 'Descartáveis e EPI', un: 'un', precoUnit: 2.19, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'atacado' },
    { id: 'i056', nome: 'Esponja com 4', cat: 'Descartáveis e EPI', un: 'un', precoUnit: 3.49, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'atacado' },
    { id: 'i057', nome: 'Etiquetas Validade', cat: 'Descartáveis e EPI', un: 'un', precoUnit: 10.9, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'ceasa' },
    { id: 'i058', nome: 'Farinha de milho 1kg', cat: 'Farinhas e Massas', un: 'un', precoUnit: 3.36, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'dellys' },
    { id: 'i059', nome: 'Farinha de trigo 5kg', cat: 'Farinhas e Massas', un: 'un', precoUnit: 13.18, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'atacado' },
    { id: 'i060', nome: 'Fermento Salgado 500g', cat: 'Farinhas e Massas', un: 'un', precoUnit: 12.99, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'atacado' },
    { id: 'i061', nome: 'Fibra de limpeza geral verde', cat: 'Limpeza', un: 'un', precoUnit: 2.6, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'atacado' },
    { id: 'i062', nome: 'Figo 450g', cat: 'Hortifruti', un: 'un', precoUnit: 15.98, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'atacado' },
    { id: 'i063', nome: 'Fruki 2 lts', cat: 'Bebidas', un: 'un', precoUnit: 5.24, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'fruki' },
    { id: 'i064', nome: 'Fruki 2 lts zero', cat: 'Bebidas', un: 'un', precoUnit: 5.24, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'fruki' },
    { id: 'i065', nome: 'Fruki 350', cat: 'Bebidas', un: 'un', precoUnit: 2.05, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'fruki' },
    { id: 'i066', nome: 'Fruki 350 zero', cat: 'Bebidas', un: 'un', precoUnit: 2.05, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'fruki' },
    { id: 'i067', nome: 'Fruki 600', cat: 'Bebidas', un: 'un', precoUnit: 2.54, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'fruki' },
    { id: 'i068', nome: 'fruki 600 zero', cat: 'Bebidas', un: 'un', precoUnit: 2.54, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'fruki' },
    { id: 'i069', nome: 'Frutas vermelhas 1,01kg', cat: 'Doces e Sobremesas', un: 'un', precoUnit: 27.8, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'novomix' },
    { id: 'i070', nome: 'Frutas vermelhas 1kg', cat: 'Doces e Sobremesas', un: 'un', precoUnit: 25.1, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'novomix' },
    { id: 'i071', nome: 'Geleia de pimenta MrPink', cat: 'Molhos e Conservas', un: 'un', precoUnit: 31.9, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'msx' },
    { id: 'i072', nome: 'Gorgonzola kg', cat: 'Queijos e Laticínios', un: 'kg', precoUnit: 64, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'msx' },
    { id: 'i073', nome: 'Heineken', cat: 'Bebidas', un: 'un', precoUnit: 5.99, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'atacado' },
    { id: 'i074', nome: 'Kinder Bueno', cat: 'Doces e Sobremesas', un: 'un', precoUnit: 7.84, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'atacado' },
    { id: 'i075', nome: 'KitKat branco 45g', cat: 'Doces e Sobremesas', un: 'un', precoUnit: 2.99, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'americanas' },
    { id: 'i076', nome: 'Kitkat preto 45g', cat: 'Doces e Sobremesas', un: 'un', precoUnit: 2.99, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'americanas' },
    { id: 'i077', nome: 'Lacre', cat: 'Embalagens', un: 'un', precoUnit: 0.01, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'duplex' },
    { id: 'i078', nome: 'Leite condensado 200ml', cat: 'Doces e Sobremesas', un: 'un', precoUnit: 4.79, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'triangulo' },
    { id: 'i079', nome: 'Leite ninho refil kg', cat: 'Doces e Sobremesas', un: 'un', precoUnit: 36.57, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'novomix' },
    { id: 'i080', nome: 'Limpa vidros', cat: 'Limpeza', un: 'un', precoUnit: 4.19, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'atacado' },
    { id: 'i081', nome: 'Limpador Multiuso (Guardian)', cat: 'Limpeza', un: 'un', precoUnit: 199, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'gcn' },
    { id: 'i082', nome: 'Lombo', cat: 'Carnes, Frios e Embutidos', un: 'un', precoUnit: 23.99, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'pamplona' },
    { id: 'i083', nome: 'Luva G', cat: 'Descartáveis e EPI', un: 'un', precoUnit: 28.99, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'msx' },
    { id: 'i084', nome: 'Luva GG', cat: 'Descartáveis e EPI', un: 'un', precoUnit: 28.6, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'msx' },
    { id: 'i085', nome: 'Luva P', cat: 'Descartáveis e EPI', un: 'un', precoUnit: 28.6, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'msx' },
    { id: 'i086', nome: 'Luvas M', cat: 'Descartáveis e EPI', un: 'un', precoUnit: 28.99, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'msx' },
    { id: 'i087', nome: 'Luvas XG', cat: 'Descartáveis e EPI', un: 'un', precoUnit: 28.99, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'msx' },
    { id: 'i088', nome: 'Maionese 3KG', cat: 'Molhos e Conservas', un: 'kg', precoUnit: 27.9, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'atacado' },
    { id: 'i089', nome: 'Manjericão', cat: 'Hortifruti', un: 'un', precoUnit: 2, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'ceasa' },
    { id: 'i090', nome: 'Mel kg', cat: 'Doces e Sobremesas', un: 'un', precoUnit: 25, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'teresa' },
    { id: 'i091', nome: 'Mesinhas pacote', cat: 'Embalagens', un: 'un', precoUnit: 22, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'duplex' },
    { id: 'i092', nome: 'Milho Verde 1,7kg', cat: 'Molhos e Conservas', un: 'un', precoUnit: 23.99, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'senar' },
    { id: 'i093', nome: 'Mms 850g', cat: 'Doces e Sobremesas', un: 'un', precoUnit: 60.99, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'novomix' },
    { id: 'i094', nome: 'Molho Barbecue 1,01kg', cat: 'Molhos e Conservas', un: 'un', precoUnit: 34.9, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'msx' },
    { id: 'i095', nome: 'Molho Barbecue 3,5Kg', cat: 'Molhos e Conservas', un: 'un', precoUnit: 29.9, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'msx' },
    { id: 'i096', nome: 'Molho de pimenta 150ml', cat: 'Molhos e Conservas', un: 'un', precoUnit: 3.67, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'kem' },
    { id: 'i097', nome: 'Molho de Tomate Ajinomoto 1,8kg', cat: 'Molhos e Conservas', un: 'un', precoUnit: 24.36, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'kem' },
    { id: 'i098', nome: 'Morango', cat: 'Hortifruti', un: 'un', precoUnit: 38, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'ceasa' },
    { id: 'i099', nome: 'Mostarda 3KG', cat: 'Molhos e Conservas', un: 'un', precoUnit: 31.9, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'atacado' },
    { id: 'i100', nome: 'Noz Pecã kg', cat: 'Doces e Sobremesas', un: 'kg', precoUnit: 72, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'msx' },
    { id: 'i101', nome: 'Nutella balde 3kg', cat: 'Doces e Sobremesas', un: 'un', precoUnit: 196, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'dellys' },
    { id: 'i102', nome: 'Óleo de Algodão 13,8kg', cat: 'Óleos e Gorduras', un: 'un', precoUnit: 181.25, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'senar' },
    { id: 'i103', nome: 'Óleo de soja 900ml', cat: 'Óleos e Gorduras', un: 'un', precoUnit: 5.79, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'atacado' },
    { id: 'i104', nome: 'Orégano', cat: 'Temperos e Condimentos', un: 'kg', precoUnit: 31.9, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'queijoecia' },
    { id: 'i105', nome: 'Oreo Mini (com 10)', cat: 'Doces e Sobremesas', un: 'un', precoUnit: 2.59, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'atacado' },
    { id: 'i106', nome: 'Ovos bandeja 20un', cat: 'Hortifruti', un: 'un', precoUnit: 15.5, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'ceasa' },
    { id: 'i107', nome: 'Ovos bandeja 30un', cat: 'Hortifruti', un: 'un', precoUnit: 15.5, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'ceasa' },
    { id: 'i108', nome: 'Paçoca 1,3KG', cat: 'Doces e Sobremesas', un: 'un', precoUnit: 28.9, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'atacado' },
    { id: 'i109', nome: 'Palmito 1,08kg', cat: 'Molhos e Conservas', un: 'un', precoUnit: 44, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'msx' },
    { id: 'i110', nome: 'Papel higiênico (fardo)', cat: 'Descartáveis e EPI', un: 'un', precoUnit: 2.26, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'atacado' },
    { id: 'i111', nome: 'PAPEL INTERFOLHA 5UN/Fardos', cat: 'Descartáveis e EPI', un: 'un', precoUnit: 16.9, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'atacado' },
    { id: 'i112', nome: 'Papel toalha 120 folhas', cat: 'Descartáveis e EPI', un: 'un', precoUnit: 3.49, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'atacado' },
    { id: 'i113', nome: 'Papel toalha 400 folhas', cat: 'Descartáveis e EPI', un: 'un', precoUnit: 10.49, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'atacado' },
    { id: 'i114', nome: 'Parmesão 500g', cat: 'Queijos e Laticínios', un: 'un', precoUnit: 43, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'msx' },
    { id: 'i115', nome: 'Pasta de alho Santa Massa 1,01kg', cat: 'Temperos e Condimentos', un: 'un', precoUnit: 23.9, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'kem' },
    { id: 'i116', nome: 'Peito de peru', cat: 'Carnes, Frios e Embutidos', un: 'un', precoUnit: 47.5, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'msx' },
    { id: 'i117', nome: 'Pepperoni', cat: 'Carnes, Frios e Embutidos', un: 'kg', precoUnit: 47.3, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'pamplona' },
    { id: 'i118', nome: 'Perfex Rolo 600', cat: 'Limpeza', un: 'un', precoUnit: 68, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'msx' },
    { id: 'i119', nome: 'Pêssego', cat: 'Hortifruti', un: 'un', precoUnit: 15.38, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'atacado' },
    { id: 'i120', nome: 'Picanha', cat: 'Carnes, Frios e Embutidos', un: 'kg', precoUnit: 57.9, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'pamplona' },
    { id: 'i121', nome: 'Picanha cx +/-15kg', cat: 'Carnes, Frios e Embutidos', un: 'kg', precoUnit: 59.9, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'pamplona' },
    { id: 'i122', nome: 'Pimentão verde', cat: 'Hortifruti', un: 'kg', precoUnit: 90, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'ceasa' },
    { id: 'i123', nome: 'Porção de Camarão', cat: 'Carnes, Frios e Embutidos', un: 'un', precoUnit: 15, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'msx' },
    { id: 'i124', nome: 'Porção de Coração', cat: 'Carnes, Frios e Embutidos', un: 'un', precoUnit: 8.63, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'msx' },
    { id: 'i125', nome: 'Porção de Filé', cat: 'Carnes, Frios e Embutidos', un: 'un', precoUnit: 7.99, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'msx' },
    { id: 'i126', nome: 'Porção de Frango', cat: 'Carnes, Frios e Embutidos', un: 'kg', precoUnit: 4.2, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'msx' },
    { id: 'i127', nome: 'Porção de Strogonoff', cat: 'Carnes, Frios e Embutidos', un: 'un', precoUnit: 7.97, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'msx' },
    { id: 'i128', nome: 'Presunto', cat: 'Carnes, Frios e Embutidos', un: 'un', precoUnit: 18.5, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'pamplona' },
    { id: 'i129', nome: 'Provolone', cat: 'Queijos e Laticínios', un: 'un', precoUnit: 48, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'msx' },
    { id: 'i130', nome: 'Queijo Mussarela', cat: 'Queijos e Laticínios', un: 'kg', precoUnit: 34.7, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'msx' },
    { id: 'i131', nome: 'Rafaello T9', cat: 'Doces e Sobremesas', un: 'un', precoUnit: 16.9, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'atacado' },
    { id: 'i132', nome: 'Raffaello T15', cat: 'Doces e Sobremesas', un: 'un', precoUnit: 23.99, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'atacado' },
    { id: 'i133', nome: 'Requeijão Cremoso 1,6kg', cat: 'Queijos e Laticínios', un: 'un', precoUnit: 42.9, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'msx' },
    { id: 'i134', nome: 'Rolo de saquinhos', cat: 'Embalagens', un: 'kg', precoUnit: 38.9, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'embnascimento' },
    { id: 'i135', nome: 'RÚCULA', cat: 'Hortifruti', un: 'un', precoUnit: 2, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'ceasa' },
    { id: 'i136', nome: 'RUFFLES', cat: 'Salgadinhos e Snacks', un: 'un', precoUnit: 16.99, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'atacado' },
    { id: 'i137', nome: 'Sabonete líquido 5L', cat: 'Limpeza', un: 'kg', precoUnit: 34.9, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'embnascimento' },
    { id: 'i138', nome: 'Saco de lixo cozinha 130L', cat: 'Limpeza', un: 'un', precoUnit: 54.9, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'embnascimento' },
    { id: 'i139', nome: 'Saco de lixo reforçado 40L', cat: 'Limpeza', un: 'un', precoUnit: 36.5, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'embnascimento' },
    { id: 'i140', nome: 'Sal grosso', cat: 'Temperos e Condimentos', un: 'kg', precoUnit: 2.29, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'atacado' },
    { id: 'i141', nome: 'Sal Parrilla', cat: 'Temperos e Condimentos', un: 'kg', precoUnit: 5.5, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'atacado' },
    { id: 'i142', nome: 'Sal refinado 1kg', cat: 'Temperos e Condimentos', un: 'un', precoUnit: 2.49, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'atacado' },
    { id: 'i143', nome: 'Salame Italiano', cat: 'Carnes, Frios e Embutidos', un: 'kg', precoUnit: 55, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'msx' },
    { id: 'i144', nome: 'Salmão', cat: 'Carnes, Frios e Embutidos', un: 'un', precoUnit: 83.9, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'frumar' },
    { id: 'i145', nome: 'Sanitizante B-QUARTER', cat: 'Limpeza', un: 'un', precoUnit: 12.99, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'gcn' },
    { id: 'i146', nome: 'Sazon Limão', cat: 'Temperos e Condimentos', un: 'un', precoUnit: 5.99, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'atacado' },
    { id: 'i147', nome: 'Stikadinho', cat: 'Salgadinhos e Snacks', un: 'un', precoUnit: 4.19, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'msx' },
    { id: 'i148', nome: 'Toca descartável', cat: 'Descartáveis e EPI', un: 'un', precoUnit: 12.99, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'msx' },
    { id: 'i149', nome: 'Tomate Cereja', cat: 'Hortifruti', un: 'un', precoUnit: 5.5, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'ceasa' },
    { id: 'i150', nome: 'Tomate longa vida', cat: 'Hortifruti', un: 'un', precoUnit: 115, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'ceasa' },
    { id: 'i151', nome: 'Tomate seco', cat: 'Molhos e Conservas', un: 'un', precoUnit: 87, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'msx' },
    { id: 'i152', nome: 'Uva', cat: 'Hortifruti', un: 'un', precoUnit: 11.5, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'ceasa' },
    { id: 'i153', nome: 'Veja 5L', cat: 'Limpeza', un: 'un', precoUnit: 54.9, min: { LBD01: 0, LBD02: 0, LBD03: 0 }, qty: { LBD01: 0, LBD02: 0, LBD03: 0 }, ativo: true, fornecedorId: 'atacado' },
  ],
  historico: [
    { id: 'h1', ts: Date.now() - 1000 * 60 * 60 * 26, tipo: 'entrada', lojaId: 'LBD01', itemId: 'i01', qty: 20, motivo: null, userId: 'u2', userNome: 'Carlos' },
    { id: 'h2', ts: Date.now() - 1000 * 60 * 60 * 20, tipo: 'saida', lojaId: 'LBD01', itemId: 'i08', qty: 6, motivo: 'Consumo em produção', userId: 'u4', userNome: 'Pedro' },
    { id: 'h3', ts: Date.now() - 1000 * 60 * 60 * 15, tipo: 'transferencia', origemId: 'LBD01', destinoId: 'LBD02', itemId: 'i05', qty: 4, userId: 'u2', userNome: 'Carlos' },
    { id: 'h4', ts: Date.now() - 1000 * 60 * 60 * 10, tipo: 'saida', lojaId: 'LBD02', itemId: 'i23', qty: 10, motivo: 'Perda / Vencimento', userId: 'u3', userNome: 'Maria' },
    { id: 'h5', ts: Date.now() - 1000 * 60 * 60 * 4, tipo: 'entrada', lojaId: 'LBD03', itemId: 'i11', qty: 20, motivo: null, userId: 'u1', userNome: 'Nicolas' },
    { id: 'h6', ts: Date.now() - 1000 * 60 * 30, tipo: 'saida', lojaId: 'LBD01', itemId: 'i22', qty: 24, motivo: 'Consumo em produção', userId: 'u4', userNome: 'Pedro' },
  ],
};

/* ==========================================================================
   2b. Histórico de preços pagos (mock)
   ========================================================================== */

function _seedFromId(id) {
  let h = 0;
  for (let i = 0; i < id.length; i++) {
    h = (h * 31 + id.charCodeAt(i)) % 997;
  }
  return h;
}

function gerarHistoricoPrecos(itens) {
  const hoje = Date.now();
  const DIA = 1000 * 60 * 60 * 24;
  const arredonda = (v) => Math.round(v * 100) / 100;
  const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

  const resultado = {};

  itens.forEach((item) => {
    const seed = _seedFromId(item.id);
    const preco = item.precoUnit;

    const offset1 = clamp((((seed % 11) - 5) / 5) * 0.15, -0.15, 0.15);
    const offset2 = clamp(((((seed >> 2) % 9) - 4) / 4) * 0.15, -0.15, 0.15);
    const mediaAnteriores = (offset1 + offset2) / 2;

    const padrao = seed % 3;
    let offset3;
    if (padrao === 0) offset3 = mediaAnteriores + 0.09; // mais recente mais caro
    else if (padrao === 1) offset3 = mediaAnteriores - 0.09; // mais recente mais barato
    else offset3 = mediaAnteriores + (seed % 2 === 0 ? 0.01 : -0.01); // mais recente ~igual
    offset3 = clamp(offset3, -0.15, 0.15);

    resultado[item.id] = [
      { data: hoje - DIA * 60, precoPago: arredonda(preco * (1 + offset1)) },
      { data: hoje - DIA * 30, precoPago: arredonda(preco * (1 + offset2)) },
      { data: hoje - DIA * 7, precoPago: arredonda(preco * (1 + offset3)) },
    ];
  });

  return resultado;
}

const HISTORICO_PRECOS = gerarHistoricoPrecos(DADOS_INICIAIS.itens);

/* ==========================================================================
   3. Storage
   ========================================================================== */

const STORAGE_KEY_DATA = 'lbd_data_v1';
const STORAGE_KEY_SESSION = 'lbd_session_v1';
const STORAGE_KEY_LOJA = 'lbd_loja_ativa_v1';

function getData() {
  const raw = localStorage.getItem(STORAGE_KEY_DATA);
  if (!raw) {
    const inicial = JSON.parse(JSON.stringify(DADOS_INICIAIS));
    inicial.fornecedores = JSON.parse(JSON.stringify(FORNECEDORES));
    localStorage.setItem(STORAGE_KEY_DATA, JSON.stringify(inicial));
    return inicial;
  }

  const data = JSON.parse(raw);
  let migrado = false;

  if (!data.fornecedores || data.fornecedores.length === 0) {
    data.fornecedores = JSON.parse(JSON.stringify(FORNECEDORES));
    migrado = true;
  }

  data.itens.forEach((item) => {
    if (!item.fornecedorId) {
      const original = DADOS_INICIAIS.itens.find((i) => i.id === item.id);
      if (original && original.fornecedorId) {
        item.fornecedorId = original.fornecedorId;
        migrado = true;
      }
    }
  });

  if (migrado) saveData(data);

  if (!data.catalogoVersion || data.catalogoVersion < 2) {
    const idsNovoCatalogo = new Set(DADOS_INICIAIS.itens.map((i) => i.id));

    data.itens.forEach((item) => {
      if (!idsNovoCatalogo.has(item.id)) {
        item.ativo = false;
      }
    });

    const idsExistentes = new Set(data.itens.map((i) => i.id));
    DADOS_INICIAIS.itens.forEach((item) => {
      if (!idsExistentes.has(item.id)) {
        data.itens.push(JSON.parse(JSON.stringify(item)));
      }
    });

    data.catalogoVersion = 2;
    saveData(data);
  }

  return data;
}

function saveData(data) {
  localStorage.setItem(STORAGE_KEY_DATA, JSON.stringify(data));
}

function getSession() {
  const raw = localStorage.getItem(STORAGE_KEY_SESSION);
  return raw ? JSON.parse(raw) : null;
}

function saveSession(session) {
  localStorage.setItem(STORAGE_KEY_SESSION, JSON.stringify(session));
}

function clearSession() {
  localStorage.removeItem(STORAGE_KEY_SESSION);
}

/* ==========================================================================
   4. Auth
   ========================================================================== */

function login(userId, senha) {
  const usuario = USUARIOS.find((u) => u.id === userId);
  if (!usuario) return { ok: false, erro: 'Usuário não encontrado.' };
  if ((senha || '').trim().toLowerCase() !== usuario.nome.toLowerCase()) {
    return { ok: false, erro: 'Senha incorreta.' };
  }
  const lojaInicial = usuario.loja || LOJAS[0].id;
  saveSession({ userId: usuario.id, ts: Date.now(), lojaAtiva: lojaInicial });
  localStorage.setItem(STORAGE_KEY_LOJA, lojaInicial);
  return { ok: true, usuario };
}

function requireAuth() {
  const session = getSession();
  if (!session || !USUARIOS.some((u) => u.id === session.userId)) {
    window.location.href = 'index.html';
    return null;
  }
  return session;
}

function getUsuarioAtivo() {
  const session = getSession();
  if (!session) return null;
  return USUARIOS.find((u) => u.id === session.userId) || null;
}

function logout() {
  clearSession();
  window.location.href = 'index.html';
}

/* ==========================================================================
   4b. Permissões
   ========================================================================== */

const PERMISSOES_POR_PERFIL = {
  gerente: ['ver_painel', 'ver_estoque', 'ver_entradas', 'ver_saidas', 'ver_transferencias', 'ver_historico', 'ver_pedidos'],
  operador: ['ver_saidas'],
};

const PAGINA_PERMISSAO = {
  painel: 'ver_painel',
  estoque: 'ver_estoque',
  entradas: 'ver_entradas',
  saidas: 'ver_saidas',
  transferencias: 'ver_transferencias',
  historico: 'ver_historico',
  pedidos: 'ver_pedidos',
  etiquetas: 'editar_estoque',
};

function checkPermissao(acao) {
  const usuario = getUsuarioAtivo();
  if (!usuario) return false;
  if (usuario.perfil === 'admin') return true;
  const permitidas = PERMISSOES_POR_PERFIL[usuario.perfil] || [];
  return permitidas.includes(acao);
}

function lojasPermitidas() {
  const usuario = getUsuarioAtivo();
  if (!usuario || checkPermissao('ver_outras_lojas')) return LOJAS;
  return LOJAS.filter((l) => l.id === usuario.loja);
}

function getFiltroLojaPadrao() {
  if (checkPermissao('ver_outras_lojas')) return 'todas';
  const usuario = getUsuarioAtivo();
  return usuario ? usuario.loja : 'todas';
}

function verificarAcessoPagina(pagina) {
  const acao = PAGINA_PERMISSAO[pagina];
  if (!acao || checkPermissao(acao)) return true;

  const usuario = getUsuarioAtivo();
  const destino = usuario && usuario.perfil === 'operador' ? 'saidas.html' : 'painel.html';
  const atual = window.location.pathname.split('/').pop();
  if (atual !== destino) window.location.href = destino;
  return false;
}

/* ==========================================================================
   5. Estoque
   ========================================================================== */

function getStatusEstoque(item, lojaId) {
  const qty = item.qty[lojaId] ?? 0;
  const min = item.min[lojaId] ?? 0;
  const pct = min > 0 ? Math.min(100, Math.round((qty / min) * 100)) : 100;
  if (qty <= 0) return { status: 'out', label: 'Zerado', pct: 0 };
  if (qty < min) return { status: 'low', label: 'Estoque baixo', pct };
  return { status: 'ok', label: 'Em estoque', pct };
}

const CRITICIDADE_ORDEM = { critico: 3, alto: 2, medio: 1, baixo: 0 };

function getCriticidade(pct, status) {
  if (status === 'out') return { nivel: 'critico', label: 'Crítico' };
  if (pct < 50) return { nivel: 'alto', label: 'Alto' };
  if (pct < 80) return { nivel: 'medio', label: 'Médio' };
  return { nivel: 'baixo', label: 'Baixo' };
}

function getItensAbaixoMinimo(lojaId) {
  const data = getData();
  return data.itens.filter((item) => {
    if (!item.ativo) return false;
    const status = getStatusEstoque(item, lojaId).status;
    return status === 'low' || status === 'out';
  });
}

function getItensZerados(lojaId) {
  const data = getData();
  return data.itens.filter((item) => item.ativo && getStatusEstoque(item, lojaId).status === 'out');
}

function gerarIdHistorico() {
  return 'h' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

function registrarMovimentacao(tipo, lojaId, itemId, qty, motivo, user) {
  const data = getData();
  const item = data.itens.find((i) => i.id === itemId);
  if (!item) return { ok: false, erro: 'Item não encontrado.' };

  const atual = item.qty[lojaId] ?? 0;
  if (tipo === 'saida' && qty > atual) {
    return { ok: false, erro: 'Quantidade insuficiente em estoque.' };
  }

  item.qty[lojaId] = tipo === 'entrada' ? atual + qty : atual - qty;

  data.historico.unshift({
    id: gerarIdHistorico(),
    ts: Date.now(),
    tipo,
    lojaId,
    itemId,
    qty,
    motivo: motivo || null,
    userId: user?.id || null,
    userNome: user?.nome || null,
  });

  saveData(data);
  return { ok: true };
}

function registrarTransferencia(origemId, destinoId, itemId, qty, user) {
  if (origemId === destinoId) return { ok: false, erro: 'Loja de origem e destino devem ser diferentes.' };

  const data = getData();
  const item = data.itens.find((i) => i.id === itemId);
  if (!item) return { ok: false, erro: 'Item não encontrado.' };

  const atual = item.qty[origemId] ?? 0;
  if (qty > atual) return { ok: false, erro: 'Quantidade insuficiente na loja de origem.' };

  item.qty[origemId] = atual - qty;
  item.qty[destinoId] = (item.qty[destinoId] ?? 0) + qty;

  data.historico.unshift({
    id: gerarIdHistorico(),
    ts: Date.now(),
    tipo: 'transferencia',
    origemId,
    destinoId,
    itemId,
    qty,
    userId: user?.id || null,
    userNome: user?.nome || null,
  });

  saveData(data);
  return { ok: true };
}

function adicionarItem(itemData) {
  const data = getData();
  const id = 'i' + Date.now().toString(36) + Math.random().toString(36).slice(2, 5);
  const item = {
    id,
    nome: itemData.nome,
    cat: itemData.cat,
    un: itemData.un,
    precoUnit: Number(itemData.precoUnit) || 0,
    min: {
      LBD01: Number(itemData.min?.LBD01) || 0,
      LBD02: Number(itemData.min?.LBD02) || 0,
      LBD03: Number(itemData.min?.LBD03) || 0,
    },
    qty: {
      LBD01: Number(itemData.qty?.LBD01) || 0,
      LBD02: Number(itemData.qty?.LBD02) || 0,
      LBD03: Number(itemData.qty?.LBD03) || 0,
    },
    ativo: itemData.ativo !== undefined ? !!itemData.ativo : true,
  };
  data.itens.push(item);
  saveData(data);
  return item;
}

function editarItem(itemId, campos) {
  const data = getData();
  const item = data.itens.find((i) => i.id === itemId);
  if (!item) return { ok: false, erro: 'Item não encontrado.' };
  Object.assign(item, campos);
  saveData(data);
  return { ok: true, item };
}

function excluirItem(itemId) {
  const data = getData();
  const item = data.itens.find((i) => i.id === itemId);
  if (!item) return { ok: false, erro: 'Item não encontrado.' };
  item.ativo = false;
  saveData(data);
  return { ok: true, item };
}

function getHistoricoPrecos(itemId) {
  return HISTORICO_PRECOS[itemId] || [];
}

function getUltimoPrecoPago(itemId) {
  const hist = getHistoricoPrecos(itemId);
  return hist.length ? hist[hist.length - 1] : null;
}

function getIndicadorPreco(itemId) {
  const hist = getHistoricoPrecos(itemId);
  if (hist.length < 2) return { status: 'medio', variacaoPct: 0 };

  const recente = hist[hist.length - 1];
  const anteriores = hist.slice(0, -1);
  const media = anteriores.reduce((acc, r) => acc + r.precoPago, 0) / anteriores.length;
  const variacaoPct = media > 0 ? ((recente.precoPago - media) / media) * 100 : 0;

  let status = 'medio';
  if (variacaoPct > 5) status = 'caro';
  else if (variacaoPct < -5) status = 'bom';

  return { status, variacaoPct, media };
}

/* ==========================================================================
   6. Formatação
   ========================================================================== */

function fmt(n) {
  const num = Number(n) || 0;
  return num.toLocaleString('pt-BR', { maximumFractionDigits: 2 });
}

function fmtR(v) {
  const num = Number(v) || 0;
  return num.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function fmtDate(ts) {
  const d = new Date(ts);
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const hh = String(d.getHours()).padStart(2, '0');
  const min = String(d.getMinutes()).padStart(2, '0');
  return `${dd}/${mm} ${hh}:${min}`;
}

const MESES_EXTENSO = [
  'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
  'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro',
];

function fmtDateFull(ts) {
  const d = new Date(ts);
  return `${d.getDate()} de ${MESES_EXTENSO[d.getMonth()]} de ${d.getFullYear()}`;
}

/* ==========================================================================
   7. UI Helpers
   ========================================================================== */

function toast(msg, tipo = 'default', duracao = 3000) {
  let stack = document.getElementById('toast-stack');
  if (!stack) {
    stack = document.createElement('div');
    stack.id = 'toast-stack';
    stack.className = 'toast-stack';
    document.body.appendChild(stack);
  }

  const el = document.createElement('div');
  el.className = `toast toast--${tipo}`;
  el.innerHTML = `
    <span class="toast-icon">${ICONS[tipo === 'error' ? 'alert' : tipo === 'success' ? 'check' : tipo === 'warning' ? 'alert' : 'check']}</span>
    <span class="toast-message">${msg}</span>
  `;
  stack.appendChild(el);

  setTimeout(() => {
    el.style.transition = 'opacity 180ms ease';
    el.style.opacity = '0';
    setTimeout(() => el.remove(), 180);
  }, duracao);
}

function destacarCampoPendente(el) {
  if (!el) return;
  el.focus();
  if (el.scrollIntoView) el.scrollIntoView({ block: 'center', behavior: 'smooth' });
  el.classList.add('field-pendente');
  setTimeout(() => el.classList.remove('field-pendente'), 1500);
}

function initClearButton(inputId, btnId) {
  const input = document.getElementById(inputId);
  const btn = document.getElementById(btnId);
  if (!input || !btn) return;

  const atualizar = () => btn.classList.toggle('is-visible', input.value.length > 0);
  input.addEventListener('input', atualizar);
  btn.addEventListener('click', () => {
    input.value = '';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.focus();
  });
  atualizar();
}

function initAutocompleteTeclado(inputEl, listaEl, onSelecionar) {
  let indiceAtivo = -1;

  const getItens = () => Array.from(listaEl.querySelectorAll('.autocomplete-item[data-id]'));

  const destacar = (idx) => {
    const itens = getItens();
    itens.forEach((it, i) => it.classList.toggle('is-active', i === idx));
    if (idx >= 0 && itens[idx]) itens[idx].scrollIntoView({ block: 'nearest' });
  };

  inputEl.addEventListener('input', () => { indiceAtivo = -1; });

  inputEl.addEventListener('keydown', (e) => {
    if (listaEl.style.display === 'none') return;

    if (e.key === 'Escape') {
      e.preventDefault();
      listaEl.style.display = 'none';
      indiceAtivo = -1;
      return;
    }

    const itens = getItens();
    if (itens.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      indiceAtivo = (indiceAtivo + 1) % itens.length;
      destacar(indiceAtivo);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      indiceAtivo = indiceAtivo <= 0 ? itens.length - 1 : indiceAtivo - 1;
      destacar(indiceAtivo);
    } else if (e.key === 'Enter') {
      const alvo = indiceAtivo >= 0 ? indiceAtivo : 0;
      if (itens[alvo]) {
        e.preventDefault();
        indiceAtivo = -1;
        onSelecionar(itens[alvo].dataset.id);
      }
    }
  });
}

function openModal(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeModal(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.style.display = 'none';
  document.body.style.overflow = '';
}

function initSidebarMobile() {
  const sidebar = document.querySelector('.sidebar');
  const overlay = document.querySelector('.sidebar-overlay');
  const menuBtn = document.querySelector('.topbar-menu-btn');
  if (!sidebar || !overlay || !menuBtn) return;

  const abrir = () => {
    sidebar.classList.add('is-open');
    overlay.classList.add('is-visible');
  };
  const fechar = () => {
    sidebar.classList.remove('is-open');
    overlay.classList.remove('is-visible');
  };

  menuBtn.addEventListener('click', abrir);
  overlay.addEventListener('click', fechar);
}

const NAV_ITEMS = [
  { id: 'painel', label: 'Painel', href: 'painel.html', icon: 'dashboard', acao: 'ver_painel' },
  { id: 'estoque', label: 'Estoque', href: 'estoque.html', icon: 'estoque', acao: 'ver_estoque' },
  { id: 'entradas', label: 'Entradas', href: 'entradas.html', icon: 'entradas', acao: 'ver_entradas' },
  { id: 'saidas', label: 'Saídas', href: 'saidas.html', icon: 'saidas', acao: 'ver_saidas' },
  { id: 'transferencias', label: 'Transferências', href: 'transferencias.html', icon: 'transfer', acao: 'ver_transferencias' },
  { id: 'historico', label: 'Histórico', href: 'historico.html', icon: 'historico', acao: 'ver_historico' },
  { id: 'pedidos', label: 'Pedidos', href: 'pedidos.html', icon: 'pedidos', acao: 'ver_pedidos' },
  { id: 'etiquetas', label: 'Etiquetas', href: 'etiquetas.html', icon: 'etiquetas', acao: 'editar_estoque' },
];

function buildSidebar(paginaAtiva) {
  const lojaId = getLojaAtiva();
  const alertas = getItensAbaixoMinimo(lojaId).length;

  const navHtml = NAV_ITEMS.filter((n) => checkPermissao(n.acao)).map((n) => {
    const ativo = n.id === paginaAtiva ? ' is-active' : '';
    const badge = n.id === 'estoque' && alertas > 0
      ? `<span class="nav-badge">${alertas}</span>`
      : '';
    return `
      <a class="nav-item${ativo}" href="${n.href}">
        <span class="nav-item-icon">${ICONS[n.icon]}</span>
        <span class="nav-item-label">${n.label}</span>
        ${badge}
      </a>
    `;
  }).join('');

  return `
    <nav class="nav-section">
      <div class="nav-section-title">Operação</div>
      ${navHtml}
    </nav>
    <nav class="nav-section">
      <div class="nav-section-title">Conta</div>
      <a class="nav-item" href="#" onclick="logout(); return false;" aria-label="Sair do sistema">
        <span class="nav-item-icon">${ICONS.logout}</span>
        <span class="nav-item-label">Sair</span>
      </a>
    </nav>
  `;
}

function buildTopbar() {
  const usuario = getUsuarioAtivo();
  const loja = LOJAS.find((l) => l.id === getLojaAtiva()) || LOJAS[0];

  return `
    <div class="topbar-left">
      <button class="topbar-menu-btn" aria-label="Abrir menu" type="button">${ICONS.dashboard}</button>
      <div class="logo">
        <span class="logo-mark"></span>
        <span class="logo-text">La Bella <span>Donna</span></span>
      </div>
      <button class="store-selector" id="store-selector-btn" type="button" aria-label="Selecionar loja">
        ${loja.label}
      </button>
    </div>
    <div class="topbar-right">
      <span class="text-muted" style="font-size:var(--fs-11)">v${APP_VERSION}</span>
      <div class="user-avatar" title="${usuario ? usuario.nome : ''}">${usuario ? usuario.iniciais : '--'}</div>
    </div>
  `;
}

function initTopbar(paginaAtiva) {
  const session = requireAuth();
  if (!session) return;
  if (!verificarAcessoPagina(paginaAtiva)) return;

  const sidebarMount = document.getElementById('sidebar-mount');
  const topbarMount = document.getElementById('topbar-mount');

  if (sidebarMount) sidebarMount.innerHTML = buildSidebar(paginaAtiva);
  if (topbarMount) topbarMount.innerHTML = buildTopbar();

  initSidebarMobile();

  const seletor = document.getElementById('store-selector-btn');
  if (seletor) seletor.addEventListener('click', abrirSeletorLoja);
}

function getLojaAtiva() {
  const session = getSession();
  if (session?.lojaAtiva) return session.lojaAtiva;
  return localStorage.getItem(STORAGE_KEY_LOJA) || LOJAS[0].id;
}

function setLojaAtiva(id) {
  const session = getSession();
  if (session) {
    session.lojaAtiva = id;
    saveSession(session);
  }
  localStorage.setItem(STORAGE_KEY_LOJA, id);
}

function trocarLoja(lojaId) {
  const usuario = getUsuarioAtivo();
  if (usuario && usuario.perfil !== 'admin' && usuario.loja && usuario.loja !== lojaId) {
    toast('Você só tem acesso à sua loja.', 'error');
    return;
  }
  setLojaAtiva(lojaId);
  closeModal('modal-loja');
  window.location.reload();
}

function abrirSeletorLoja() {
  let modal = document.getElementById('modal-loja');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'modal-loja';
    modal.className = 'modal-backdrop';
    modal.style.display = 'none';
    modal.innerHTML = `
      <div class="modal" style="max-width:380px">
        <div class="modal-header">
          <span class="modal-title">Selecionar loja</span>
          <button class="modal-close" type="button" aria-label="Fechar" onclick="closeModal('modal-loja')">${ICONS.close}</button>
        </div>
        <div class="modal-body flex flex-col gap-8">
          ${LOJAS.map((l) => `
            <button class="btn btn-secondary btn-md btn-full" style="justify-content:flex-start" onclick="trocarLoja('${l.id}')">
              ${l.label}
            </button>
          `).join('')}
        </div>
      </div>
    `;
    document.body.appendChild(modal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal('modal-loja');
    });
  }
  openModal('modal-loja');
}

/* ==========================================================================
   7b. Scanner de QR Code (câmera)
   ========================================================================== */

let _scannerQRStream = null;
let _scannerQRLoopId = null;
let _scannerQRCallback = null;
let _scannerQRCanvas = null;

function fecharScannerQR() {
  if (_scannerQRLoopId) cancelAnimationFrame(_scannerQRLoopId);
  _scannerQRLoopId = null;
  if (_scannerQRStream) {
    _scannerQRStream.getTracks().forEach((t) => t.stop());
    _scannerQRStream = null;
  }
  closeModal('modal-scanner-qr');
}

async function iniciarCameraScanner() {
  const video = document.getElementById('scanner-qr-video');
  const status = document.getElementById('scanner-qr-status');
  status.textContent = 'Aponte a câmera para o QR Code do item.';

  try {
    _scannerQRStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
    video.srcObject = _scannerQRStream;
    await video.play();

    if (!_scannerQRCanvas) _scannerQRCanvas = document.createElement('canvas');
    const canvas = _scannerQRCanvas;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });

    const loop = () => {
      if (!_scannerQRStream) return;
      if (video.readyState === video.HAVE_ENOUGH_DATA) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const codigo = jsQR(imageData.data, imageData.width, imageData.height);
        if (codigo) {
          const texto = codigo.data;
          const callback = _scannerQRCallback;
          fecharScannerQR();
          if (callback) callback(texto);
          return;
        }
      }
      _scannerQRLoopId = requestAnimationFrame(loop);
    };
    loop();
  } catch (e) {
    status.textContent = 'Não foi possível acessar a câmera. Verifique as permissões do navegador ou use a busca por nome abaixo.';
  }
}

function abrirScannerQR(onDetectado) {
  let modal = document.getElementById('modal-scanner-qr');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'modal-scanner-qr';
    modal.className = 'modal-backdrop';
    modal.style.display = 'none';
    modal.innerHTML = `
      <div class="modal" style="max-width:420px">
        <div class="modal-header">
          <span class="modal-title">Escanear item</span>
          <button class="modal-close" type="button" aria-label="Fechar" onclick="fecharScannerQR()">${ICONS.close}</button>
        </div>
        <div class="modal-body flex flex-col gap-16">
          <video id="scanner-qr-video" style="width:100%; border-radius:var(--radius); background:#000;" playsinline muted></video>
          <div class="text-secondary" id="scanner-qr-status" style="font-size:var(--fs-12)"></div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) fecharScannerQR();
    });
  }

  _scannerQRCallback = onDetectado;
  openModal('modal-scanner-qr');
  iniciarCameraScanner();
}

/* ==========================================================================
   8. Icons
   ========================================================================== */

const ICONS = {
  dashboard: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><rect x="3" y="3" width="7" height="9" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="12" width="7" height="9" rx="1.5"/><rect x="3" y="16" width="7" height="5" rx="1.5"/></svg>',
  estoque: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><path d="M21 8 12 3 3 8v8l9 5 9-5V8Z"/><path d="M3 8l9 5 9-5"/><path d="M12 13v8"/></svg>',
  entradas: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><path d="M12 3v12"/><path d="M7 10l5 5 5-5"/><path d="M4 21h16"/></svg>',
  saidas: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><path d="M12 21V9"/><path d="M7 14l5-5 5 5"/><path d="M4 3h16"/></svg>',
  transfer: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><path d="M4 7h13"/><path d="M13 3l4 4-4 4"/><path d="M20 17H7"/><path d="M11 21l-4-4 4-4"/></svg>',
  historico: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/></svg>',
  config: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1.04 1.56V21a2 2 0 1 1-4 0v-.09A1.7 1.7 0 0 0 8.96 19.3a1.7 1.7 0 0 0-1.87.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-1.56-1.04H3a2 2 0 1 1 0-4h.09A1.7 1.7 0 0 0 4.7 8.96a1.7 1.7 0 0 0-.34-1.87l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.7 1.7 0 0 0 9.06 4.7 1.7 1.7 0 0 0 10.1 3.14V3a2 2 0 1 1 4 0v.09c0 .69.4 1.32 1.04 1.56.62.26 1.36.14 1.87-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.7 1.7 0 0 0-.34 1.87c.24.64.87 1.05 1.56 1.05H21a2 2 0 1 1 0 4h-.09c-.69 0-1.32.4-1.56 1.04Z"/></svg>',
  logout: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="M16 17l5-5-5-5"/><path d="M21 12H9"/></svg>',
  plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><path d="M12 5v14"/><path d="M5 12h14"/></svg>',
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>',
  close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><path d="M18 6 6 18"/><path d="M6 6l12 12"/></svg>',
  alert: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><path d="M12 2 1 21h22L12 2Z"/><path d="M12 9v5"/><path d="M12 17h.01"/></svg>',
  edit: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>',
  trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><path d="M20 6 9 17l-5-5"/></svg>',
  'arrow-up': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><path d="M12 19V5"/><path d="M5 12l7-7 7 7"/></svg>',
  'arrow-down': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><path d="M12 5v14"/><path d="M19 12l-7 7-7-7"/></svg>',
  'arrow-right': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><path d="M5 12h14"/><path d="M13 6l6 6-6 6"/></svg>',
  swap: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><path d="M17 3l4 4-4 4"/><path d="M3 7h18"/><path d="M7 21l-4-4 4-4"/><path d="M21 17H3"/></svg>',
  pedidos: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/><path d="M2 3h2l2.4 12.4a2 2 0 0 0 2 1.6h8.7a2 2 0 0 0 2-1.6L21 7H6"/></svg>',
  etiquetas: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 14h3v3"/><path d="M14 21h.01"/><path d="M21 14v.01"/><path d="M21 21h-3"/></svg>',
  camera: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2Z"/><circle cx="12" cy="13" r="4"/></svg>',
};
