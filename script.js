const calculator = document.querySelector('.calculator');
const buttons = document.querySelectorAll('button');
const display = document.querySelector('.display');
const operators = document.querySelectorAll('.operator');
let previousKeyType; //setting a var for the last key that has been clicked

function buttonListener() {
    buttons.forEach((button => {
        button.addEventListener('click', (e => {
            const key = e.target
            const keyContent = key.textContent;
            const displayedNum = display.textContent;
            if (key.classList.contains('number')) {
                console.log(keyContent);
                //if only 0 is on screen or last key clicked was operator then replace it with new num
                if (displayedNum === '0' || previousKeyType === 'operator' ) {
                    display.textContent = keyContent;
                } else { //otherwise add new num after the existing num
                    display.textContent = displayedNum + keyContent;
                };
                previousKeyType = 'number';
            } else if (key.classList.contains('operator')) {
                selectOperator(key);
                calculator.firstValue = displayedNum;
                previousKeyType = 'operator';
            } else if (key.classList.contains('decimal')) {
                console.log('Decimal key')
                //only allows one decimal point
                if (displayedNum.split(/[.]/).length === 2) {
                    display.textContent = displayedNum;
                } else {
                    display.textContent = displayedNum + '.';
                }
                previousKeyType = 'decimal';
            } else if (key.classList.contains('ac')) {
                //clear display
                display.textContent = '';
                //clear operator btn colour
                operators.forEach((operator) => {
                    operator.classList.remove('active');
                });
                console.log('Clear key')
                previousKeyType = 'clear';
            } else if (key.classList.contains('calculate')) {
                console.log('Equal key')
                //storing the var before they are wiped off
                const firstValue = calculator.firstValue;
                const operator = calculator.operator;
                const secondValue = displayedNum;
                display.textContent = calculate(firstValue,operator,secondValue);
                previousKeyType = 'calculate';
            } else {
                console.log('Error')
            };
        }));
    }));
};

function selectOperator(selectedKey) {
    operators.forEach((operator) => {
        operator.classList.remove('active');
    });
    selectedKey.classList.add('active');
    calculator.operator = selectedKey.textContent;
    console.log(calculator.operator)
};

const calculate = (num1,operator,num2) => {
    let result = '';
    
    if (operator === '+') {
        result = num1 + num2;
    } else if (operator === '-') {
        result = num1 - num2;
    } else if (operator === 'x') {
        result = num1 * num2;
    } else if (operator === '÷') {
        result = num1 / num2;
    };

    return result;
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