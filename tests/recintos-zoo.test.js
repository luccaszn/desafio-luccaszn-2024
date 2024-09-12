import { RecintosZoo } from '../src/recintos-zoo';

test('Testar inclusão de macacos', () => {
  const zoo = new RecintosZoo();
  const resultado = zoo.analisaRecintos('MACACO', 2);
  expect(resultado.recintosViaveis).toContain('Recinto 1 (espaço livre: 5 total: 10)');
});

test('Animal inválido', () => {
  const zoo = new RecintosZoo();
  const resultado = zoo.analisaRecintos('UNICORNIO', 1);
  expect(resultado.erro).toBe('Animal inválido');
});
