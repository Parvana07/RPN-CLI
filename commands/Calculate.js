const calculate = (tokens) => {
  let stack = [];
  for (let token of tokens) {
    if (token === "+") {
      stack.push(stack.pop() + stack.pop());
    } else if (token === "-") {
      stack.push(-stack.pop() + stack.pop());
    } else if (token === "*") {
      stack.push(stack.pop() * stack.pop());
    } else if (token === "/") {
      stack.push((1 / stack.pop()) * stack.pop());
    } else {
      stack.push(parseInt(token));
    }
  }
  return stack;
};

module.exports = calculate;
