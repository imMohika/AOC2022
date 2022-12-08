import { readFileSync } from "fs";
import { resolve } from "path";

const inputFile = resolve(__dirname, "input3.txt");
const inputs = readFileSync(inputFile, "utf8").split("\n");

const sharedLetter = (a: string, b: string): string => {
  for (let l of b.split("")) {
    if (a.includes(l)) return l;
  }
  throw new Error("No shared char found");
};

const charToPriority = (char: string) => {
  const charVal = char.charCodeAt(0);
  if (charVal <= 90) return charVal - 38;

  return charVal - 96;
};

let priority = 0;

inputs.forEach((input) => {
  const shared = sharedLetter(
    input.slice(0, input.length / 2),
    input.slice(input.length / 2)
  );
  if (!shared) return;
  priority += charToPriority(shared);
});

console.log(priority);

const findBadge = (a: string, b: string, c: string): string => {
  const letters = new Set(`${a + b + c}`.split(""));
  for (let l of letters) {
    if (a.includes(l) && b.includes(l) && c.includes(l)) return l;
  }
  throw new Error("No badge found");
};

let badgePriority = 0;
for (let i = 0; i < inputs.length - 2; i += 3) {
  const badge = findBadge(inputs[i], inputs[i + 1], inputs[i + 2]);
  badgePriority += charToPriority(badge);
}

console.log(badgePriority);
