//determine which key is clicked
const buttons = document.querySelectorAll('button');
const display = document.querySelector('.display');
const operators = document.querySelectorAll('.operator');

function buttonListener() {
    buttons.forEach((button => {
        button.addEventListener('click', (e => {
            const key = e.target
            const keyContent = key.textContent;
            const displayedNum = display.textContent;
            if (key.classList.contains('number')) {
                console.log('Number key');
                //if only 0 is on screen then replace it with new num
                if (displayedNum === '0') {
                    display.textContent = keyContent;
                } else { //otherwise add new num after the existing num
                    display.textContent = displayedNum + keyContent;
                };
            } else if (key.classList.contains('operator')) {
                console.log('Operator key');
                selectOperator(key);
                //if only 0 is on screen or last displayed is an operator
                if (displayedNum === '0') {
                    display.textContent = keyContent;
                } else { //otherwise add operator after the displayed num
                    display.textContent = displayedNum + keyContent;
                };
            } else if (key.classList.contains('decimal')) {
                console.log('Decimal key')
                display.textContent = displayedNum + '.';
            } else if (key.classList.contains('ac')) {
                display.textContent = '';
                console.log('Clear key')
            } else if (key.classList.contains('calculate')) {
                console.log('Equal key')
            } else {
                console.log('Error')
            };
        }));
    }));
};

function selectOperator(key) {
    operators.forEach((operator) => {
        operator.classList.remove('active');
    });
    key.classList.add('active');
};

buttonListener();

/*
//add function
const add = (a,b) => a + b;
//subtract function
const subtract = (a,b) => a - b;
//multiply function
const multiply = (a,b) => a * b;
//divide function
const divide = (a,b) => a / b;

//get selected operator
const opButtons = document.querySelectorAll('.operator')

function displayOp() {
    opButtons.forEach((opButton => {
        opButton.addEventListener('click', () => {
            display.textContent += opButton.textContent;
            console.log(opButton.textContent);
        });
    }));
};

//store and display value when number button is clicked
const display = document.querySelector('.display');
const numButtons = document.querySelectorAll('.number');

function displayNum() {
    numButtons.forEach((numButton => {
        numButton.addEventListener('click',() => {
            display.textContent += numButton.textContent;
            console.log(display.textContent);
        });
    }));
};

//set var for each parts of equation
let numbers;
let firstNum;
let secondNum;

let equation;

function calculator() {
    equation = display.textContent.split(/[^0-9.]/);
    const initialValue = equation[0];
    const solution = equation.reduce((operator,currentvalue) => lastValue  )
}

let solution;

//decide which func to use
function chooseFunc() {
    if (operator === '+') {
        solution = add(firstNum,secondNum);
    } else if (operator === '-') {
        solution = subtract(firstNum,secondNum);
    } else if (operator === 'x') {
        solution = multiply(firstNum,secondNum);
    } else if (operator === '÷') {
        solution = divide(firstNum,secondNum);
    }
}

calculate the function to get solution
const calculate = document.querySelector('.calculate');

function operate() {
    calculate.addEventListener('click',() => {
        chooseFunc();
        display.textContent = solution;
    })
};

//clear display
const clearBtn = document.querySelector('.ac');

function clear() {
    clearBtn.addEventListener('click',() => {
        display.textContent = '';
        equation = '';
        numbers = [];
        firstNum = '';
        secondNum = '';
    });
}

//trigger all funcs
displayOp();
displayNum();
operate();
clear();*/