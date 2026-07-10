/* ==========================================================================
   La Bella Donna — Gerador de QR Code (offline, sem dependências)
   Implementação própria do algoritmo padrão (ISO/IEC 18004), modo byte.
   Não faz nenhuma chamada de rede — roda 100% no navegador.
   ========================================================================== */

(function () {
  /* ---------- Tabelas padrão do QR Code (versões 1 a 10) ---------- */

  const RS_BLOCK_TABLE = {
    1: { L: [[1, 26, 19]], M: [[1, 26, 16]], Q: [[1, 26, 13]], H: [[1, 26, 9]] },
    2: { L: [[1, 44, 34]], M: [[1, 44, 28]], Q: [[1, 44, 22]], H: [[1, 44, 16]] },
    3: { L: [[1, 70, 55]], M: [[1, 70, 44]], Q: [[2, 35, 17]], H: [[2, 35, 13]] },
    4: { L: [[1, 100, 80]], M: [[2, 50, 32]], Q: [[2, 50, 24]], H: [[4, 25, 9]] },
    5: { L: [[1, 134, 108]], M: [[2, 67, 43]], Q: [[2, 33, 15], [2, 34, 16]], H: [[2, 33, 11], [2, 34, 12]] },
    6: { L: [[2, 86, 68]], M: [[4, 43, 27]], Q: [[4, 43, 19]], H: [[4, 43, 15]] },
    7: { L: [[2, 98, 78]], M: [[4, 49, 31]], Q: [[2, 32, 14], [4, 33, 15]], H: [[4, 39, 13], [1, 40, 14]] },
    8: { L: [[2, 121, 97]], M: [[2, 60, 38], [2, 61, 39]], Q: [[4, 40, 18], [2, 41, 19]], H: [[4, 40, 14], [2, 41, 15]] },
    9: { L: [[2, 146, 116]], M: [[3, 58, 36], [2, 59, 37]], Q: [[4, 36, 16], [4, 37, 17]], H: [[4, 36, 12], [4, 37, 13]] },
    10: { L: [[2, 86, 68], [2, 87, 69]], M: [[4, 69, 43], [1, 70, 44]], Q: [[6, 43, 19], [2, 44, 20]], H: [[6, 43, 15], [2, 44, 16]] },
  };

  const ALIGNMENT_POSITIONS = {
    2: [6, 18], 3: [6, 22], 4: [6, 26], 5: [6, 30], 6: [6, 34],
    7: [6, 22, 38], 8: [6, 24, 42], 9: [6, 26, 46], 10: [6, 28, 50],
  };

  const EC_INDICADOR = { L: 1, M: 0, Q: 3, H: 2 };

  /* ---------- Aritmética em GF(256) para o código Reed-Solomon ---------- */

  const GF_EXP = new Array(512);
  const GF_LOG = new Array(256);
  (function initGF() {
    let x = 1;
    for (let i = 0; i < 255; i++) {
      GF_EXP[i] = x;
      GF_LOG[x] = i;
      x <<= 1;
      if (x & 0x100) x ^= 0x11d;
    }
    for (let i = 255; i < 512; i++) GF_EXP[i] = GF_EXP[i - 255];
  })();

  function gfMul(a, b) {
    if (a === 0 || b === 0) return 0;
    return GF_EXP[GF_LOG[a] + GF_LOG[b]];
  }

  function polyMultiply(p1, p2) {
    const resultado = new Array(p1.length + p2.length - 1).fill(0);
    for (let i = 0; i < p1.length; i++) {
      for (let j = 0; j < p2.length; j++) {
        resultado[i + j] ^= gfMul(p1[i], p2[j]);
      }
    }
    return resultado;
  }

  function rsGeneratorPoly(ecCount) {
    let poly = [1];
    for (let i = 0; i < ecCount; i++) {
      poly = polyMultiply(poly, [1, GF_EXP[i]]);
    }
    return poly;
  }

  function rsEncode(dadosBloco, ecCount) {
    const gerador = rsGeneratorPoly(ecCount);
    const msg = dadosBloco.concat(new Array(ecCount).fill(0));
    for (let i = 0; i < dadosBloco.length; i++) {
      const coef = msg[i];
      if (coef !== 0) {
        for (let j = 0; j < gerador.length; j++) {
          msg[i + j] ^= gfMul(gerador[j], coef);
        }
      }
    }
    return msg.slice(dadosBloco.length);
  }

  /* ---------- Divisão em GF(2) — usada nos bits de formato ---------- */

  function bitLength(v) {
    let len = 0;
    while (v > 0) { len++; v = v >>> 1; }
    return len;
  }

  function divisaoGF2(dividendo, divisor) {
    let resto = dividendo;
    const grauDivisor = bitLength(divisor) - 1;
    while (resto !== 0 && bitLength(resto) - 1 >= grauDivisor) {
      resto ^= divisor << (bitLength(resto) - 1 - grauDivisor);
    }
    return resto;
  }

  function bchFormatInfo(dados5bits) {
    const dividendo = dados5bits << 10;
    const resto = divisaoGF2(dividendo, 0x537);
    return (dividendo | resto) ^ 0x5412;
  }

  function bchVersionInfo(versao) {
    const dividendo = versao << 12;
    const resto = divisaoGF2(dividendo, 0x1f25);
    return dividendo | resto;
  }

  /* ---------- Construção do fluxo de dados (modo byte) ---------- */

  function stringParaBytes(texto) {
    const bytes = [];
    for (let i = 0; i < texto.length; i++) {
      bytes.push(texto.charCodeAt(i) & 0xff);
    }
    return bytes;
  }

  function capacidadeDados(versao, nivelEC) {
    return RS_BLOCK_TABLE[versao][nivelEC].reduce((acc, [n, , dados]) => acc + n * dados, 0);
  }

  function escolherVersao(numBytes, nivelEC) {
    for (let versao = 1; versao <= 10; versao++) {
      const countBits = versao <= 9 ? 8 : 16;
      const bitsNecessarios = 4 + countBits + numBytes * 8;
      if (bitsNecessarios <= capacidadeDados(versao, nivelEC) * 8) return versao;
    }
    throw new Error('Texto longo demais para gerar o QR Code.');
  }

  function pushBits(arr, valor, numBits) {
    for (let i = numBits - 1; i >= 0; i--) arr.push((valor >> i) & 1);
  }

  function construirFluxoDados(bytes, versao, nivelEC) {
    const bits = [];
    pushBits(bits, 4, 4); // modo: byte
    const countBits = versao <= 9 ? 8 : 16;
    pushBits(bits, bytes.length, countBits);
    bytes.forEach((b) => pushBits(bits, b, 8));

    const capacidadeBits = capacidadeDados(versao, nivelEC) * 8;
    const terminador = Math.min(4, Math.max(0, capacidadeBits - bits.length));
    for (let i = 0; i < terminador; i++) bits.push(0);
    while (bits.length % 8 !== 0) bits.push(0);

    const padBytes = [0xec, 0x11];
    let padIdx = 0;
    while (bits.length < capacidadeBits) {
      pushBits(bits, padBytes[padIdx % 2], 8);
      padIdx++;
    }
    return bits;
  }

  function bitsParaCodewords(bits) {
    const bytes = [];
    for (let i = 0; i < bits.length; i += 8) {
      let byte = 0;
      for (let j = 0; j < 8; j++) byte = (byte << 1) | (bits[i + j] || 0);
      bytes.push(byte);
    }
    return bytes;
  }

  function dividirEmBlocos(codewords, versao, nivelEC) {
    const grupos = RS_BLOCK_TABLE[versao][nivelEC];
    const blocos = [];
    let offset = 0;
    grupos.forEach(([numBlocos, total, dados]) => {
      const ecCount = total - dados;
      for (let i = 0; i < numBlocos; i++) {
        const dadosBloco = codewords.slice(offset, offset + dados);
        offset += dados;
        blocos.push({ dados: dadosBloco, ec: rsEncode(dadosBloco, ecCount) });
      }
    });
    return blocos;
  }

  function intercalarComEC(blocos) {
    const resultado = [];
    const maxDados = Math.max(...blocos.map((b) => b.dados.length));
    for (let i = 0; i < maxDados; i++) {
      blocos.forEach((b) => { if (i < b.dados.length) resultado.push(b.dados[i]); });
    }
    const maxEC = Math.max(...blocos.map((b) => b.ec.length));
    for (let i = 0; i < maxEC; i++) {
      blocos.forEach((b) => { if (i < b.ec.length) resultado.push(b.ec[i]); });
    }
    return resultado;
  }

  /* ---------- Montagem da matriz ---------- */

  function colocarDados(matriz, reservado, n, codewords) {
    const bits = [];
    codewords.forEach((byte) => pushBits(bits, byte, 8));

    let bitIndex = 0;
    let subindo = true;
    for (let colDir = n - 1; colDir > 0; colDir -= 2) {
      if (colDir === 6) colDir--;
      for (let i = 0; i < n; i++) {
        const row = subindo ? n - 1 - i : i;
        for (let j = 0; j < 2; j++) {
          const col = colDir - j;
          if (reservado[row][col]) continue;
          const bit = bitIndex < bits.length ? bits[bitIndex] : 0;
          matriz[row][col] = bit === 1;
          bitIndex++;
        }
      }
      subindo = !subindo;
    }
  }

  const MASK_FUNCS = [
    (r, c) => (r + c) % 2 === 0,
    (r, c) => r % 2 === 0,
    (r, c) => c % 3 === 0,
    (r, c) => (r + c) % 3 === 0,
    (r, c) => (Math.floor(r / 2) + Math.floor(c / 3)) % 2 === 0,
    (r, c) => ((r * c) % 2) + ((r * c) % 3) === 0,
    (r, c) => (((r * c) % 2) + ((r * c) % 3)) % 2 === 0,
    (r, c) => (((r + c) % 2) + ((r * c) % 3)) % 2 === 0,
  ];

  function aplicarMascara(base, reservado, n, maskIndex) {
    const copia = base.map((linha) => linha.slice());
    for (let r = 0; r < n; r++) {
      for (let c = 0; c < n; c++) {
        if (reservado[r][c]) continue;
        if (MASK_FUNCS[maskIndex](r, c)) copia[r][c] = !copia[r][c];
      }
    }
    return copia;
  }

  function contarSequencias(linha) {
    let penalidade = 0;
    let atual = linha[0];
    let count = 1;
    for (let i = 1; i < linha.length; i++) {
      if (linha[i] === atual) {
        count++;
      } else {
        if (count >= 5) penalidade += count - 5 + 3;
        atual = linha[i];
        count = 1;
      }
    }
    if (count >= 5) penalidade += count - 5 + 3;
    return penalidade;
  }

  function bateComPadrao(linha, offset) {
    const padrao = [true, false, true, true, true, false, true];
    for (let i = 0; i < padrao.length; i++) {
      if (linha[offset + i] !== padrao[i]) return false;
    }
    return true;
  }

  function calcularPenalidade(m, n) {
    let penalidade = 0;

    for (let r = 0; r < n; r++) penalidade += contarSequencias(m[r]);
    for (let c = 0; c < n; c++) {
      const coluna = [];
      for (let r = 0; r < n; r++) coluna.push(m[r][c]);
      penalidade += contarSequencias(coluna);
    }

    for (let r = 0; r < n - 1; r++) {
      for (let c = 0; c < n - 1; c++) {
        const v = m[r][c];
        if (v === m[r][c + 1] && v === m[r + 1][c] && v === m[r + 1][c + 1]) penalidade += 3;
      }
    }

    for (let r = 0; r < n; r++) {
      for (let c = 0; c <= n - 7; c++) {
        if (bateComPadrao(m[r], c)) penalidade += 40;
      }
    }
    for (let c = 0; c < n; c++) {
      const coluna = [];
      for (let r = 0; r < n; r++) coluna.push(m[r][c]);
      for (let r = 0; r <= n - 7; r++) {
        if (bateComPadrao(coluna, r)) penalidade += 40;
      }
    }

    let escuros = 0;
    for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) if (m[r][c]) escuros++;
    const percentual = (escuros / (n * n)) * 100;
    penalidade += Math.floor(Math.abs(percentual - 50) / 5) * 10;

    return penalidade;
  }

  function escreverFormatInfo(m, n, nivelEC, maskIndex) {
    const dados = (EC_INDICADOR[nivelEC] << 3) | maskIndex;
    const valor = bchFormatInfo(dados);
    const bit = (i) => ((valor >> (14 - i)) & 1) === 1;

    for (let i = 0; i <= 5; i++) m[8][i] = bit(i);
    m[8][7] = bit(6);
    m[8][8] = bit(7);
    m[7][8] = bit(8);
    for (let i = 9; i <= 14; i++) m[14 - i][8] = bit(i);

    for (let i = 0; i <= 7; i++) m[n - 1 - i][8] = bit(i);
    for (let i = 8; i <= 14; i++) m[8][n - 15 + i] = bit(i);
  }

  function escreverVersionInfo(m, n, versao) {
    const valor = bchVersionInfo(versao);
    const bit = (i) => ((valor >> i) & 1) === 1;
    let idx = 0;
    for (let c = 0; c < 3; c++) {
      for (let r = 0; r < 6; r++) {
        m[r][n - 11 + c] = bit(idx);
        m[n - 11 + c][r] = bit(idx);
        idx++;
      }
    }
  }

  function finalizarComMascara(matrizBase, reservado, n, versao, nivelEC) {
    let melhorPenalidade = Infinity;
    let melhorMatriz = null;

    for (let mask = 0; mask < 8; mask++) {
      const candidata = aplicarMascara(matrizBase, reservado, n, mask);
      escreverFormatInfo(candidata, n, nivelEC, mask);
      if (versao >= 7) escreverVersionInfo(candidata, n, versao);
      const penalidade = calcularPenalidade(candidata, n);
      if (penalidade < melhorPenalidade) {
        melhorPenalidade = penalidade;
        melhorMatriz = candidata;
      }
    }
    return melhorMatriz;
  }

  function montarMatriz(codewords, versao, nivelEC) {
    const n = versao * 4 + 17;
    const matriz = Array.from({ length: n }, () => new Array(n).fill(false));
    const reservado = Array.from({ length: n }, () => new Array(n).fill(false));

    [[0, 0], [0, n - 7], [n - 7, 0]].forEach(([or_, oc]) => {
      for (let dr = -1; dr <= 7; dr++) {
        for (let dc = -1; dc <= 7; dc++) {
          const r = or_ + dr;
          const c = oc + dc;
          if (r < 0 || r >= n || c < 0 || c >= n) continue;
          reservado[r][c] = true;
          if (dr >= 0 && dr <= 6 && dc >= 0 && dc <= 6) {
            const borda = dr === 0 || dr === 6 || dc === 0 || dc === 6;
            const centro = dr >= 2 && dr <= 4 && dc >= 2 && dc <= 4;
            matriz[r][c] = borda || centro;
          } else {
            matriz[r][c] = false;
          }
        }
      }
    });

    for (let i = 8; i < n - 8; i++) {
      if (!reservado[6][i]) { matriz[6][i] = i % 2 === 0; reservado[6][i] = true; }
      if (!reservado[i][6]) { matriz[i][6] = i % 2 === 0; reservado[i][6] = true; }
    }

    (ALIGNMENT_POSITIONS[versao] || []).forEach((r) => {
      (ALIGNMENT_POSITIONS[versao] || []).forEach((c) => {
        if (reservado[r][c]) return;
        for (let dr = -2; dr <= 2; dr++) {
          for (let dc = -2; dc <= 2; dc++) {
            const anel = Math.max(Math.abs(dr), Math.abs(dc));
            matriz[r + dr][c + dc] = anel !== 1;
            reservado[r + dr][c + dc] = true;
          }
        }
      });
    });

    matriz[4 * versao + 9][8] = true;
    reservado[4 * versao + 9][8] = true;

    for (let i = 0; i <= 8; i++) {
      reservado[8][i] = true;
      reservado[i][8] = true;
    }
    for (let i = 0; i < 8; i++) {
      reservado[8][n - 1 - i] = true;
      reservado[n - 1 - i][8] = true;
    }

    if (versao >= 7) {
      for (let r = 0; r < 6; r++) {
        for (let c = 0; c < 3; c++) {
          reservado[r][n - 11 + c] = true;
          reservado[n - 11 + c][r] = true;
        }
      }
    }

    colocarDados(matriz, reservado, n, codewords);

    return finalizarComMascara(matriz, reservado, n, versao, nivelEC);
  }

  /* ---------- API pública ---------- */

  function gerarMatriz(texto, nivelEC) {
    nivelEC = nivelEC && RS_BLOCK_TABLE[1][nivelEC] ? nivelEC : 'Q';
    const bytes = stringParaBytes(String(texto));
    const versao = escolherVersao(bytes.length, nivelEC);
    const bits = construirFluxoDados(bytes, versao, nivelEC);
    const codewords = bitsParaCodewords(bits);
    const blocos = dividirEmBlocos(codewords, versao, nivelEC);
    const codewordsFinais = intercalarComEC(blocos);
    return montarMatriz(codewordsFinais, versao, nivelEC);
  }

  function gerarSVG(texto, opcoes) {
    const nivelEC = (opcoes && opcoes.nivelEC) || 'Q';
    const quietZone = opcoes && opcoes.quietZone != null ? opcoes.quietZone : 4;
    const matriz = gerarMatriz(texto, nivelEC);
    const n = matriz.length;
    const tamanho = n + quietZone * 2;

    let rects = '';
    for (let r = 0; r < n; r++) {
      for (let c = 0; c < n; c++) {
        if (matriz[r][c]) rects += `<rect x="${c + quietZone}" y="${r + quietZone}" width="1" height="1"/>`;
      }
    }

    return `<svg viewBox="0 0 ${tamanho} ${tamanho}" xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges">` +
      `<rect x="0" y="0" width="${tamanho}" height="${tamanho}" fill="#fff"/>` +
      `<g fill="#000">${rects}</g></svg>`;
  }

  window.QR = { gerarMatriz, gerarSVG };
})();
