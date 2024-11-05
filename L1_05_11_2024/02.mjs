export const media = (vetor) => vetor.reduce((acc, val) => acc + val, 0) / vetor.length;
export const menor = (vetor) => Math.min(...vetor);
export const maior = (vetor) => Math.max(...vetor);

const notas = [10, 7, 8, 6, 9];
console.log(`Média: ${media(notas)}`);
console.log(`Menor nota: ${menor(notas)}`);
console.log(`Maior nota: ${maior(notas)}`);