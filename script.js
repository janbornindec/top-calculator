//add function
const add = (a,b) => a + b;
//subtract function
const subtract = (a,b) => a - b;
//multiply function
const multiply = (a,b) => a * b;
//divide function
const divide = (a,b) => a / b;

const displayValue = document.querySelector('.display');
const numButtons = document.querySelectorAll('.number');

//store and display value when number button is clicked
function displayNum() {
    numButtons.forEach((numButton => {
        numButton.addEventListener('click',() => {
            displayValue.textContent += numButton.textContent;
        });
    }));
};

displayNum();

/*const operator;
const firstNum;
const secondNum;

const operate(firstNum,secondNum,operator) {
    if (operator === 'plus') {
        return add();
    } else if (operator === 'minus') {
        return subtract();
    } else if (operator === 'multiply') {
        return multiply();
    } else if (operator === 'divide') {
        return divide();
    } else {
        alert('Something went wrong. Please choose +, -, x or ÷')
    };
};*/

