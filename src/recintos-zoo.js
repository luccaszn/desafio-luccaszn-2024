// Dados dos recintos e animais
const recintos = [
  { numero: 1, bioma: "savana", tamanho: 10, animais: [{ especie: "MACACO", quantidade: 3 }] },
  { numero: 2, bioma: "floresta", tamanho: 5, animais: [] },
  { numero: 3, bioma: "savana e rio", tamanho: 7, animais: [{ especie: "GAZELA", quantidade: 1 }] },
  { numero: 4, bioma: "rio", tamanho: 8, animais: [] },
  { numero: 5, bioma: "savana", tamanho: 9, animais: [{ especie: "LEAO", quantidade: 1 }] }
];

const especies = {
  "LEAO": { tamanho: 3, biomas: ["savana"], carnivoro: true },
  "LEOPARDO": { tamanho: 2, biomas: ["savana"], carnivoro: true },
  "CROCODILO": { tamanho: 3, biomas: ["rio"], carnivoro: true },
  "MACACO": { tamanho: 1, biomas: ["savana", "floresta"], carnivoro: false },
  "GAZELA": { tamanho: 2, biomas: ["savana"], carnivoro: false },
  "HIPOPOTAMO": { tamanho: 4, biomas: ["savana", "rio"], carnivoro: false }
};

class RecintosZoo {
  analisaRecintos(especie, quantidade) {
    // Verificar se a espécie é válida
    if (!especies[especie]) {
      return { erro: "Animal inválido" };
    }

    // Verificar se a quantidade é válida
    if (quantidade <= 0 || !Number.isInteger(quantidade)) {
      return { erro: "Quantidade inválida" };
    }

    const animal = especies[especie];
    const recintosViaveis = [];

    recintos.forEach(recinto => {
      // Verificar se o bioma é compatível
      if (!animal.biomas.includes(recinto.bioma) && !(animal.biomas.includes("savana") && recinto.bioma === "savana e rio")) {
        return;
      }

      // Verificar se há carnívoros diferentes no recinto
      const carnivoroNoRecinto = recinto.animais.some(a => especies[a.especie].carnivoro);
      if (animal.carnivoro && carnivoroNoRecinto && recinto.animais.some(a => a.especie !== especie)) {
        // Leões e outros carnívoros não podem dividir o recinto com outras espécies
        return;
      }

      // Verificar regra dos macacos
      if (especie === "MACACO" && recinto.animais.length === 0) {
        // Macacos não se sentem confortáveis em recintos vazios
        return;
      }

      // Verificar regra dos hipopótamos
      if (especie === "HIPOPOTAMO" && recinto.bioma !== "savana e rio" && recinto.animais.length > 0) {
        // Hipopótamos só toleram outras espécies se estiverem em recintos com savana e rio
        return;
      }

      // Calcular espaço ocupado
      const espacoOcupado = recinto.animais.reduce((total, a) => {
        const tamanhoEspecie = especies[a.especie].tamanho;
        return total + (tamanhoEspecie * a.quantidade);
      }, 0);

      // Calcular espaço necessário para os novos animais
      let espacoNecessario = animal.tamanho * quantidade;

      // Se houver mais de uma espécie no recinto, adicionar espaço extra
      const diferentesEspecies = recinto.animais.some(a => a.especie !== especie);
      if (diferentesEspecies) {
        espacoNecessario += 1; // 1 espaço adicional
      }

      const espacoRestante = recinto.tamanho - espacoOcupado;

      if (espacoNecessario <= espacoRestante) {
        recintosViaveis.push({
          numero: recinto.numero,
          espacoLivre: espacoRestante - espacoNecessario,
          total: recinto.tamanho
        });
      }
    });

    // Se nenhum recinto for viável, retornar o erro
    if (recintosViaveis.length === 0) {
      return { erro: "Não há recinto viável" };
    }

    return {
      recintosViaveis: recintosViaveis.map(r => `Recinto ${r.numero} (espaço livre: ${r.espacoLivre} total: ${r.total})`)
    };
  }
}

// Exportar a classe usando CommonJS (ou pode manter como ES6 se preferir)
module.exports = { RecintosZoo };
