// JANKEN
// A,X = rock
// B,Y = paper
// C,Z = scissors

import { readFileSync } from "fs";
import { resolve } from "path";

// Scores
// 6: WIN
// 3: DRAW
// 3: scissors
// 2: paper
// 1: rock
// 0: lost

const inputFile = resolve(__dirname, "input2.txt");
const inputs = readFileSync(inputFile, "utf8").split("\n");

type Hand = "ROCK" | "PAPER" | "SCISSORS";

const parse = (str): Hand => {
  if (str === "A" || str === "X") return "ROCK";
  if (str === "B" || str === "Y") return "PAPER";
  if (str === "C" || str === "Z") return "SCISSORS";

  throw new Error("Unexpected input");
};

const calculateScore = (a: Hand, b: Hand) => {
  let score = 0;

  switch (b) {
    case "ROCK":
      score += 1;
      break;
    case "PAPER":
      score += 2;
      break;
    case "SCISSORS":
      score += 3;
      break;
    default:
      break;
  }

  // Draw case
  if (a === b) return score + 3;

  switch (a) {
    case "ROCK":
      if (b === "PAPER") score += 6;
      break;
    case "PAPER":
      if (b === "SCISSORS") score += 6;
      break;
    case "SCISSORS":
      if (b === "ROCK") score += 6;
      break;
    default:
      break;
  }

  return score;
};

// Calculate full score
let score = 0;
inputs.forEach((input) => {
  const [a, b] = input.split(" ").map((i) => parse(i));
  score += calculateScore(a, b);
});

console.log(score);
