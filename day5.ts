import { readFileSync } from "fs";
import { resolve } from "path";

const parseStacks = (input: string) => {
  const stacks: string[][] = [];
  const stacksStr = input
    .split("\n")
    .map((v) => v.replace(/    /g, "@").replace(/\[|\]| /g, ""));
  const amount = stacksStr.pop()!.replace(/ |\./g, "").length;
  console.log(amount);

  for (let i = 0; i < amount; i++) {
    stacks.push([]);
  }
  console.log(stacksStr);

  stacksStr.forEach((item) => {
    if (!item) return;
    item.split("").forEach((v, i) => {
      if (v === "@") return;
      stacks[i].push(v);
    });
  });

  return stacks.map((v) => v.reverse());
};

const parseMoves = (input: string) => {
  const moves: number[][] = [];

  input.split("\n").forEach((v) => {
    const matched = v.match(/\d+/g);
    if (matched) moves.push(matched.map((v) => Number(v)));
  });

  return moves;
};

const day5 = (input: string) => {
  const [stack, movesStr] = input.split("\n\n");
  const stacks = parseStacks(stack);
  console.log({ stacks });
  const moves = parseMoves(movesStr);
  moves.forEach((move) => {
    const [amount, from, to] = move;
    for (let i = 0; i < amount; i++) {
      const temp = stacks[from - 1].pop();
      if (temp) {
        stacks[to - 1].push(temp);
      }
    }
  });

  const lastOnes: string[] = [];
  for (let i = 0; i < stacks.length; i++) {
    const t = stacks[i].pop();
    if (!t) return;
    lastOnes.push(t);
  }
  return lastOnes.join("");
};

const testCase = `
    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2
`;

console.log(day5(testCase));

const inputFile = resolve(__dirname, "input5.txt");
const inputs = readFileSync(inputFile, "utf8");

console.log(day5(inputs));
