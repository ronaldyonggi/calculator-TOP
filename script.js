import {add, subtract, multiply, divide, operate} from './modules/operations.js';

function updateNumberDisplay(string) {
  document.getElementById('number-display').innerText = string;
}

function updateOperatorDisplay(string) {
  document.getElementById('operator-display').innerText = string;
}

let first = '';
let currentOperator = null;
let second = '';
let equalPressed = false;

function reset() {
  first = '';
  updateNumberDisplay('0');
  second = '';
  currentOperator = null;
  updateOperatorDisplay('');
}

// Iterate though each number button and add event listener to each
let numbers = document.getElementsByClassName('numbers');
for (let i = 0; i < numbers.length; i++) {
  let number = numbers[i];
  number.addEventListener('click', event => {
    // If the equal button was pressed, then refresh
    if (equalPressed) {
      reset()
      // After reset, set equal pressed to false
      equalPressed = false; 
    } 

    // If no operator is set yet, add to first array
    // Otherwise add to second array
    if (currentOperator) {
      second += event.target.innerText;
      updateNumberDisplay(second);
    } else {
      first += event.target.innerText;
      updateNumberDisplay(first);
    }

  })
}

// Iterate through each operator button and add event listener to each
let operators = document.getElementsByClassName('operators');
for (let i = 0; i < operators.length; i++) {
  let operator = operators[i];
  operator.addEventListener('click', event => {
    if (equalPressed) equalPressed = false;
    // Retrieve the id of the operator button
    currentOperator = event.target.id;
    updateOperatorDisplay(event.target.innerText);
  })
}

// Event listener for equal
let equal = document.getElementById('equal');
equal.addEventListener('click', () => {
  // Only do an action if operator and second are set
  if (currentOperator && second) {
    let result

    // if first string is null, take it as 0
    if (!first) {
      result = operate(currentOperator, 0, Number(second))
    } else {
      result = operate(currentOperator, Number(first), Number(second))
    }

    // The result becomes the new first value, in case a new operator
    // is pressed
    first = result.toString()

    // Update the display
    updateNumberDisplay(first)

    // set equal pressed to true, in case a new number is pressed
    equalPressed = true;

    // reset second
    second = '';

    // reset operator
    currentOperator = null
    updateOperatorDisplay('');
  }
})

// Event listener for clear button
let clear = document.getElementById('clear');
clear.addEventListener('click', () => {
  reset();
})

