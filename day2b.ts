// JANKEN
// A = rock
// B = paper
// C = scissors
// X = Lose
// Y = draw
// Z = win
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

const parseHand = (str): Hand => {
  if (str === "A") return "ROCK";
  if (str === "B") return "PAPER";
  if (str === "C") return "SCISSORS";

  throw new Error("Unexpected input");
};

type Outcome = "WIN" | "LOSE" | "DRAW";

const parseOutcome = (str): Outcome => {
  if (str === "X") return "LOSE";
  if (str === "Y") return "DRAW";
  if (str === "Z") return "WIN";

  throw new Error("Unexpected input");
};

const calculateScore = (a: Hand, b: Outcome) => {
  let score = 0;

  switch (b) {
    case "WIN":
      if (a === "ROCK") {
        // Select Paper
        score += 2;
      }

      if (a === "PAPER") {
        // Select SCISSORS
        score += 3;
      }

      if (a === "SCISSORS") {
        // Select ROCK
        score += 1;
      }

      score += 6;
      break;
    case "LOSE":
      if (a === "ROCK") {
        // Select SCISSORS
        score += 3;
      }

      if (a === "PAPER") {
        // Select ROCK
        score += 1;
      }

      if (a === "SCISSORS") {
        // Select PAPER
        score += 2;
      }

      break;
    case "DRAW":
      if (a === "ROCK") {
        score += 1;
      }

      if (a === "PAPER") {
        score += 2;
      }

      if (a === "SCISSORS") {
        score += 3;
      }

      score += 3;
      break;
    default:
      break;
  }

  return score;
};

// Calculate full score
let score = 0;
inputs.forEach((input) => {
  const [a, b] = input.split(" ");
  score += calculateScore(parseHand(a), parseOutcome(b));
});

console.log(score);
