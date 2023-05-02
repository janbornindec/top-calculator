//add buttons onto calculator

const controlPanel = document.querySelector('.controlPanel')

function createButtons() {
    for (let i=0; i<4; i++) {
        const rows = document.createElement('div');
        rows.setAttribute('class','rows');
        controlPanel.appendChild(rows);
        for (let x=0; x<4; x++) {
            const buttons = document.createElement('div');
            buttons.setAttribute('class','buttons');
            rows.appendChild(buttons);
        }
    };
};

createButtons();

//add function
const add = (a,b) => a + b;
//subtract function
const subtract = (a,b) => a - b;
//multiply function
const multiply = (a,b) => a * b;
//divide function
const divide = (a,b) => a / b;

/*const operator;
const firstNum;
const secondNum;

const operate(firstNum,secondNum,operator) {
    if (operator === 'plus') {
        return add();
    } else if (operator === 'minus') {
        return subtract();
    } else if (operator === 'star') {
        return multiply();
    } else if (operator === 'backslash') {
        return divide();
    } else {
        alert('Something went wrong. Please choose +, -, * or /')
    };
};*/

