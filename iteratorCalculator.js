const calcString = (str) => {
  let seperatedStr = str.split(" ");
  if (
    !seperatedStr.every((e) => /^-?([1-9][0-9]*|([0]))$|^[\+\*\/\-]$/.test(e)) // Wanted to check input validity, can be removed
  ) {
    throw SyntaxError("Invalid Format");
  }

  let definedOps = [
    { "*": (x, y) => x * y, "/": (x, y) => x / y },
    { "+": (x, y) => parseFloat(x) + parseFloat(y), "-": (x, y) => x - y },
  ];

  let nyCalc = [];
  let opType;
  for (let i = 0; i < definedOps.length; i++) {
    for (let j = 0; j < seperatedStr.length; j++) {
      if (definedOps[i][seperatedStr[j]]) {
        opType = definedOps[i][seperatedStr[j]];
      } else if (opType) {
        nyCalc[nyCalc.length - 1] = opType(
          nyCalc[nyCalc.length - 1],
          seperatedStr[j]
        );
        opType = null;
      } else {
        nyCalc.push(seperatedStr[j]);
      }
    }
    seperatedStr = nyCalc;
    nyCalc = [];
  }
  return seperatedStr[0];
};

module.exports = calcString;
