const { calculate, parse } = require("../parsingCalculator.js");
const calcString = require("../iteratorCalculator.js");

let testStrings = [
  { str: "1 + 1", ans: 2 },
  { str: "2 * 8", ans: 16 },
  { str: "6 - 0", ans: 6 },
  { str: "4 / 2", ans: 2 },
  { str: "5 + 7 * 2 - 4", ans: 15 },
  { str: "15 - 10 * -2", ans: 35 },
  { str: "1050 + 7 - 56 * 2", ans: 945 },
  { str: "50 / 2 / 5 * 3 - -10", ans: 25 },
  { str: "0 + 1 - -2 * -3", ans: -5 },
  { str: "14 / 2 + 15 / 3", ans: 12 },
  { str: "5 / 2 + 6 / 2", ans: 5.5 },
];

let shouldFailStrings = [
  "2+2",
  "b + a",
  "--5 + 2",
  "66 // 2",
  "+2 - 5",
  "001 + 2",
  "6 * 7 ",
  " 6 + 99",
  "55  - 7",
  "(5 + 2) - 1",
];

for (let i = 0; i < testStrings.length; i++) {
  test("For parse", () => {
    expect(calculate(parse(testStrings[i].str))).toBe(testStrings[i].ans);
  });
}

for (let i = 0; i < testStrings.length; i++) {
  test("For iterator", () => {
    expect(calcString(testStrings[i].str)).toBe(testStrings[i].ans);
  });
}

for (let i = 0; i < shouldFailStrings.length; i++) {
  test("For iterator", () => {
    expect(() => calcString(shouldFailStrings[i])).toThrow("Invalid Format");
  });
}

for (let i = 0; i < shouldFailStrings.length; i++) {
  test("For parser", () => {
    expect(() => calculate(parse(shouldFailStrings[i]))).toThrow(
      "Invalid Format"
    );
  });
}
