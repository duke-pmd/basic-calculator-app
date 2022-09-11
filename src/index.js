import "./styles.css";

let num1 = "";
let num2 = "";
let operator = null;

// Select buttons and assign variables
let buttons = document.querySelectorAll(".button");
let display = document.querySelector("#display");

// Add event listener for every button
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    executeButtonFunction(button);
  });
});

// Execute button function based on button ID
function executeButtonFunction(button) {
  if (button.id.includes("number")) {
    // Check if there is an error. If yes, soft reset the calculator
    if (checkError(display.innerHTML)) {
      clear();
    }

    let numberClicked = Number(button.textContent);
    addNumber(numberClicked);
  } else if (button.classList.contains("operator")) {
    if (num1 && num2 && operator) {
      num1 = equal();
      display.innerHTML = num1;
      num2 = "";
    }
    setOperator(button.id);
  } else if (button.classList.contains("special")) {
    switch (button.id) {
      case "clear":
        clear();
        break;
      case "delete":
        deleteNumber();
        break;
      case "dot":
        if (display.innerHTML !== "" && !display.innerHTML.includes(".")) {
          addNumber(".");
        }
        break;
      default:
        break;
    }
  }

  // Code to help debug
  // console.log(`button ${button.id}`);
  // console.log(`num1 ${num1}`);
  // console.log(`num2 ${num2}`);
  // console.log(`operator ${operator}`);
  // console.log("\n");
}

// Calculator core logic

const addNumber = (num) => {
  display.innerHTML = !operator ? (num1 += num) : (num2 += num);
};

const deleteNumber = () => {
  if (display.innerHTML.length > 1) {
    let remainedNumbers = display.innerHTML.slice(0, -1);
    display.innerHTML =
      !operator || !num2 ? (num1 = remainedNumbers) : (num2 = remainedNumbers);
  } else display.innerHTML = !operator ? (num1 = 0) : (num2 = 0);
};

const setOperator = (op) => {
  operator = op;
};

const equal = () => {
  let result;
  switch (operator) {
    case "add":
      result = Number(num1) + Number(num2);
      break;
    case "minus":
      result = Number(num1) - Number(num2);
      break;
    case "times":
      result = Number(num1) * Number(num2);
      break;
    case "divide":
      result = Number(num1) / Number(num2);
      break;
    default:
      break;
  }
  return result;
};

const clear = () => {
  num1 = "";
  num2 = "";
  setOperator(null);
  display.innerHTML = 0;
};

const checkError = (string) => {
  let number = parseFloat(string);
  return isNaN(number) || number === Infinity ? true : false;
};
