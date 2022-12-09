import { readFileSync } from "fs";
import { resolve } from "path";

const rangeToString = (range: string) => {
  const [start, end] = range.split("-").map((a) => Number(a));
  let strs: string[] = [];
  for (let i = start; i <= end; i++) {
    strs.push(i.toString());
  }

  return strs;
};

const day4 = (inputs: string[]) => {
  let veryLazys = 0;
  let lazys = 0;
  inputs.forEach((input) => {
    const [a, b] = input.split(",").map((a) => rangeToString(a));

    const set1 = new Set(a);
    const set2 = new Set(b);
    const combinedSet = new Set([...set1, ...set2]);
    const temp = [...set2].filter((val) => set1.has(val));
    if (temp.length) lazys++;
    else return;

    if (combinedSet.size === set1.size || combinedSet.size === set2.size)
      veryLazys++;
  });

  return { lazys, veryLazys };
};

const testCase = `
2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8
`
  .trim()
  .split("\n");

console.log(day4(testCase));

const inputFile = resolve(__dirname, "input4.txt");
const inputs = readFileSync(inputFile, "utf8").trim().split("\n");

console.log(day4(inputs));
