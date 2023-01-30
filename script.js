import {add, subtract, multiply, divide, operate} from './modules/operations.js';

// Function to update the number display
function updateNumberDisplay(string) {
  if (string) document.getElementById('number-display').innerText = string;
  else document.getElementById('number-display').innerText = 0;

}

// Function to update operator display
function updateOperatorDisplay(string) {
  document.getElementById('operator-display').innerText = string;
}

// Variables
let first = '';
let currentOperator = null;
let second = '';
let equalPressed = false;

// function to reset state of calculator
function reset() {
  first = '';
  updateNumberDisplay('0');
  second = '';
  currentOperator = null;
  updateOperatorDisplay('');
}

// Event listener for number buttons
let numbers = document.getElementsByClassName('numbers');
for (let i = 0; i < numbers.length; i++) {
  let number = numbers[i];
  number.addEventListener('click', event => {
    // If no operator is set yet, add to first array
    // Otherwise add to second array
    if (currentOperator) {
      // If second is currently only containing zero, set pressed number as the value
      if (second === '0') {
        second = event.target.innerText;
      } 
      // Otherwise append the number to second
      else {
        second += event.target.innerText;
      }
      // Update display
      updateNumberDisplay(second);
    } 
    // If equal sign was just pressed, set the first as that value
    else if (equalPressed) { //
      first = event.target.innerText
      updateNumberDisplay(first);
      equalPressed = false;
    }
    // Otherwise add to the first string
    else {
      first += event.target.innerText;
      updateNumberDisplay(first);
    }
  })
}

// Event listener for operator buttons
let operators = document.getElementsByClassName('operators');
for (let i = 0; i < operators.length; i++) {
  let operator = operators[i];
  operator.addEventListener('click', event => {
    currentOperator = event.target.id;
    updateOperatorDisplay(event.target.innerText);
  })
}

// Event listener for equal button
let equal = document.getElementById('equal');
equal.addEventListener('click', () => {
  // Only do an action if operator and second are set
  if (currentOperator && second) {

    // If dividing by zero, gives error message on display for 5 secs then revert back display
    if (currentOperator === 'divide' && second === '0') {
      updateNumberDisplay('Cannot divide by zero!');
      setTimeout(() => {
        updateNumberDisplay(second);
      }, 5000);
    }

    else {
      // Result of calculation is saved as the new first
      // if first string is null, take it as 0
      if (!first) {
        first = operate(currentOperator, 0, Number(second)).toString()
      } else {
        first = operate(currentOperator, Number(first), Number(second)).toString()
      }

      // Update the display
      updateNumberDisplay(first)

      // reset second and operator
      second = '';
      currentOperator = null
      updateOperatorDisplay('');

      // set indicator of equal sign was just pressed
      equalPressed = true;
    }
  }

})

// Event listener for clear button
let clear = document.getElementById('clear');
clear.addEventListener('click', () => {
  reset();
})

// Event listener for backspace button 
let backspace = document.getElementById('backspace');
backspace.addEventListener('click', () => {
  // If there's a current operator present, pop the second string
  if (currentOperator) {
    second = second.slice(0, -1);
    updateNumberDisplay(second);
  }
  // Otherwise pop the first string
  else {
    first = first.slice(0, -1);
    updateNumberDisplay(first);
  }
})

// Event listener for dot '.' button
let dot = document.getElementById('dot');
dot.addEventListener('click', () => {
  // If an operator exists, add to second
  if (currentOperator) {
    // Only take action if the string doesn't contain any dot
    if (!second.includes('.')) {
      // If second starts as empty, adding a dot means display becomes '0.'
      if (!second) second = '0.';
      // Otherwise append '.' to second
      else second += '.'

      updateNumberDisplay(second);
    }
  } 
  // Otherwise add to first
  else {

    // If fresh starting from equal sign, replace as '0.
    if (equalPressed) {
      equalPressed = false;
      first = '0.';
      updateNumberDisplay(first);
    }
    // Otherwise
    else {
      // Only take action if string doesn't contain any dot
      if (!first.includes('.')) {
        // If first starts as empty, adding a dot means display becomes '0.'
        if (!first) first = '0.';
        // Otherwise append '.' to first
        else first += '.'

        updateNumberDisplay(first)
      }
    }

  }
})