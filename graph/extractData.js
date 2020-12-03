const data = require("./dataWithSanitizer.js");
const fs = require("fs");
let iterator = [];
let parser = [];
let stringPwr = [];
for (let k = 0; k < data.length / 4 - 1; k++) {
  parser.push(
    parseInt(data[k * 4].match(/(?<=x )(.*)(?=.ops)/)[0].replace(/,/g, ""))
  );
  iterator.push(
    parseInt(data[k * 4 + 2].match(/(?<=x )(.*)(?=.ops)/)[0].replace(/,/g, ""))
  );
  stringPwr.push(data[k * 4 + 1]);
}

fs.writeFile("./logmeiterator.txt", JSON.stringify(iterator), (err) =>
  console.log(err)
);
fs.writeFile("./logmeparser.txt", JSON.stringify(parser), (err) =>
  console.log(err)
);
fs.writeFile("./logmestringpwr.txt", JSON.stringify(stringPwr), (err) =>
  console.log(err)
);
