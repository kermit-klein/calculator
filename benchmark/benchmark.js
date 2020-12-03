const { calculate, parse } = require("../parsingCalculator.js");
const exprGen = require("./expressionGenerator.js");
const calcString = require("../basicCalculator.js");
const Benchmark = require("benchmark");
const fs = require("fs");

let logMe = [];
for (let index = 2; index < 1000; index++) {
  const gen = [];
  for (let i = 0; i < 1; i++) {
    gen.push(exprGen(index));
  }

  const suite = new Benchmark.Suite();

  suite.add("Parser", function () {
    for (const i of gen) {
      calculate(parse(i));
    }
  });

  suite.add("Iterator", function () {
    for (const i of gen) {
      calcString(i);
    }
  });

  suite.on("cycle", function (event) {
    logMe.push(String(event.target), index * 2);
    console.log(String(event.target));
  });

  suite.on("complete", function () {
    console.log("Fastest is " + this.filter("fastest").map("name"));
  });
  suite.run();
}
fs.writeFile("./logme.txt", JSON.stringify(logMe), (err) => console.log(err));
