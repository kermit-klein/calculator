function splitString(str) {
  let seperatedString = str.split(" ");
  if (
    !seperatedString.every(
      (e) => /^-?([1-9][0-9]*|([0]))$|^[\+\*\/\-]$/.test(e) // Wanted to check input validity, can be removed
    )
  ) {
    throw SyntaxError("Invalid Format");
  }

  return seperatedString;
}

function parse(fullString) {
  let strArray = splitString(fullString);
  let pos = 0;

  function checkPos() {
    return strArray[pos];
  }

  function jumpNext() {
    pos++;
  }

  function parseNumber() {
    let k = checkPos();
    jumpNext();
    return { type: "number", value: k };
  }

  function parseMulDiv() {
    let expr = parseNumber();
    let k = checkPos();
    while (k === "*" || k === "/") {
      jumpNext();
      let rhs = parseNumber();
      expr = { type: k, left: expr, right: rhs };
      k = checkPos();
    }
    return expr;
  }

  function parseAddSub() {
    let expr = parseMulDiv();
    let k = checkPos();
    while (k === "-" || k === "+") {
      jumpNext();
      let rhs = parseMulDiv();
      expr = { type: k, left: expr, right: rhs };
      k = checkPos();
    }
    return expr;
  }

  let output = parseAddSub();
  return output;
}

function calculate(obj) {
  switch (obj.type) {
    case "number":
      return parseInt(obj.value);
    case "+":
      return calculate(obj.left) + calculate(obj.right);
    case "-":
      return calculate(obj.left) - calculate(obj.right);
    case "*":
      return calculate(obj.left) * calculate(obj.right);
    case "/":
      return calculate(obj.left) / calculate(obj.right);
  }
}

module.exports = {
  parse: parse,
  calculate: calculate,
};
