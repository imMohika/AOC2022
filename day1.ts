import { fsync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const inputFile = resolve(__dirname, "input1.txt");
const inputs = readFileSync(inputFile, "utf8").split("\n");
const elves = new Map<number, number[]>();

// Make elf Map
let elfNumber = 1;
let temp: number[] = [];
inputs.forEach((input) => {
  if (input === "") {
    elves.set(elfNumber, temp);
    temp = [];
    elfNumber++;
    return;
  }

  temp.push(Number.parseInt(input));
});

// Find the highest elf
let highest = {
  number: 0,
  amount: 0,
};

for (const [k, v] of elves) {
  const amount = v.reduce((a, b) => a + b, 0);
  if (amount > highest.amount) {
    highest = {
      number: k,
      amount,
    };
  }
}

console.log(highest);

const orderedElves = new Map(
  [...elves].sort((a, b) => {
    const aAmount = a[1].reduce((a, b) => a + b, 0);
    const bAmount = b[1].reduce((a, b) => a + b, 0);
    return aAmount > bAmount ? -1 : 1;
  })
);

console.log("sum of top 3: ");
let total = 0;
const iter = orderedElves.keys();
for (let i = 0; i < 3; i++) {
  const elf = elves.get(iter.next().value);
  if (!elf) continue;
  total += elf.reduce((a, b) => a + b, 0);
}
console.log(total);
