#! /usr/bin/env node
const prompt = require("prompt-sync")();
const chalk = require("chalk");
const calculate = require("./commands/Calculate");

(function () {
  console.log(chalk.blueBright("Launching... "));
  let user_input = "";
  let message = "";
  let stack = [];
  // program exits when q is presssed
  while (user_input !== "q") {
    //accepting user input
    user_input = prompt("> ");
    let expression = "";
    if (user_input) {
      for (let i = 0; i <= user_input.length; i++) {
        if (
          parseInt(user_input[i]) ||
          user_input[i] === "0" ||
          user_input[i] === "+" ||
          user_input[i] === "-" ||
          user_input[i] === "*" ||
          user_input[i] === "/"
        ) {
          expression += user_input[i];
        } else if (user_input[i] === " " || i === user_input.length) {
          stack.push(expression);
          expression = "";
          message = "";
        } else {
          if (user_input === "q") {
            break;
          }
          // retrieves history of inputs
          if (user_input === "history") {
            let history = "";
            for (let key in stack) {
              history += stack[key] + ", ";
            }
            console.log(
              history.length > 0
                ? chalk.yellow(history)
                : chalk.yellow("History is empty.")
            );
            break;
            // resets the stack and history
          } else if (user_input === "reset") {
            stack = [];
            console.error(chalk.gray("RPN calculator was reset."));
            break;
          }
          // throws an error when not number was entered
          message = "Please enter a valid input...";
          console.error(chalk.red(message));
          break;
        }
      }
    }
    let result = calculate(stack);
    /* input is valid but cannot get valid result because if empty stack
     message should be empty in order to avoid collapse of messages*/
    if (
      isNaN(result[result.length - 1]) &&
      user_input !== "reset" &&
      user_input !== "q" &&
      user_input !== "history" &&
      message.length === 0
    ) {
      message = "Please enter a number...";
      console.error(chalk.redBright(message));
      message = "";
    }
    //if result is valid, there is no message to user
    else if (!isNaN(result[result.length - 1]) && message.length > 0) {
      message = "";
    } else if (
      !isNaN(result[result.length - 1]) &&
      message.length === 0 &&
      user_input !== "q" &&
      user_input !== "reset" &&
      user_input !== "history"
    ) {
      console.log(chalk.greenBright(result[result.length - 1]));
    }
  }
})();

// calculator();
