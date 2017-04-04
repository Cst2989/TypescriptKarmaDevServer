let data = [2, 3, 2, 1, 0, 1, 2, 3, 2, 1, 1, 1, 2, 3, 4, 5, 2, 3, 2, 1, 1, 2, 0, 0, 0, 1, 2, 3, 7, 1, 0, 2, 1, 0, 0, 0];

function calculateAvarage(data): number {
    let sum = data.reduce((sum, x) => sum + x  ,0);
    return sum / data.length
}

let avarage = calculateAvarage(data);

let differance = data.map(x=> (x - avarage) * (x-avarage));

let standardDeviation = Math.sqrt(calculateAvarage(differance));

let dataInRange = data.filter(x=> x - avarage - standardDeviation < 0) //Data without outliers
console.log(dataInRange);
