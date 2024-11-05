const _ = require('lodash');

const numeros = [4, 2, 8, 4, 6, 2, 7, 5, 8, 3];

console.log('Ordenado:', _.sortBy(numeros));
console.log('Sem duplicados:', _.uniq(numeros));
console.log('Pares:', _.filter(numeros, (n) => n % 2 === 0));
console.log('Dobro:', _.map(numeros, (n) => n * 2));
console.log('Soma:', _.sum(numeros));
