const exprGen = function (n) {
  let defOps = ["-", "+", "/", "*"];
  let expression = [];
  for (let i = 0; i < n; i++) {
    if (expression[expression.length - 1] === "/") {
      expression.push(2, defOps[randomNumber(0, 3)]);
    } else {
      expression.push(randomNumber(-9, 9), defOps[randomNumber(0, 3)]);
    }
  }
  expression.pop();
  expression = expression.join(" ");
  return expression;
};

function randomNumber(min, max) {
  if (min > max) {
    let temp = max;
    max = min;
    min = temp;
  }

  if (min <= 0) {
    return Math.floor(Math.random() * (max + Math.abs(min) + 1)) + min;
  } else {
    return Math.floor(Math.random() * max) + min;
  }
}
module.exports = exprGen;
