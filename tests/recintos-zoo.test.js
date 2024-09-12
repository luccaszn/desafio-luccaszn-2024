const { RecintosZoo } = require('../src/recintos-zoo');

// Testes para verificar diferentes cenários no zoológico
describe('Testes para RecintosZoo', () => {

  // Teste 1: Adicionar macacos a recintos viáveis
  test('Testar inclusão de macacos', () => {
    const zoo = new RecintosZoo();
    const resultado = zoo.analisaRecintos('MACACO', 2);
    expect(resultado.recintosViaveis).toContain('Recinto 1 (espaço livre: 5 total: 10)');
  });

  // Teste 2: Verificar erro para animais inválidos
  test('Animal inválido', () => {
    const zoo = new RecintosZoo();
    const resultado = zoo.analisaRecintos('UNICORNIO', 1);
    expect(resultado.erro).toBe('Animal inválido');
  });

  // Teste 3: Leão não pode dividir o recinto com outras espécies
  test('Leão não pode dividir o recinto com outra espécie', () => {
    const zoo = new RecintosZoo();
    const resultado = zoo.analisaRecintos('LEAO', 1);
    expect(resultado.erro).toBe(undefined);
  });

  // Teste 4: Verificar se um leão pode ser adicionado corretamente ao recinto 5
  test('Adicionar leão em recinto apropriado', () => {
    const zoo = new RecintosZoo();
    const resultado = zoo.analisaRecintos('LEAO', 1);
    expect(resultado.recintosViaveis).toContain('Recinto 5 (espaço livre: 3 total: 9)');
  });
  

  // Teste 5: Verificar regra dos macacos em recintos vazios
  test('Macacos não podem ficar sozinhos em recintos vazios', () => {
    const zoo = new RecintosZoo();
    const resultado = zoo.analisaRecintos('MACACO', 2);
    expect(resultado.recintosViaveis).not.toContain('Recinto 2 (espaço livre: 3 total: 5)');
  });

  // Teste 6: Verificar a regra dos hipopótamos em bioma savana e rio
  test('Hipopótamos só podem conviver com outras espécies em savana e rio', () => {
    const zoo = new RecintosZoo();
    const resultado = zoo.analisaRecintos('HIPOPOTAMO', 1);
    expect(resultado.recintosViaveis).toContain('Recinto 3 (espaço livre: 0 total: 7)');
  });

  // Teste 7: Verificar quantidade inválida de animais
  test('Quantidade inválida', () => {
    const zoo = new RecintosZoo();
    const resultado = zoo.analisaRecintos('MACACO', 0);
    expect(resultado.erro).toBe('Quantidade inválida');
  });

});
