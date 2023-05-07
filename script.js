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
let operator; 

function displayOp() {
    opButtons.forEach((opButton => {
        opButton.addEventListener('click', () => {
            operator = opButton.textContent;
            console.log(operator);
            display.textContent += operator;
            equation += opButton.textContent;
        });
    }));
};

//store and display value when number button is clicked
const display = document.querySelector('.display');
const numButtons = document.querySelectorAll('.number');
let equation = '';

function displayNum() {
    numButtons.forEach((numButton => {
        numButton.addEventListener('click',() => {
            equation += numButton.textContent;
            display.textContent += numButton.textContent;
            console.log(equation);
        });
    }));
};

//set var for each parts of equation
let numbers;
let firstNum;
let secondNum;

//split equation to get two numbers
function getNums() {
    numbers = equation.split(/[^0-9.]/);
    firstNum = Number(numbers[0]);
    secondNum = Number(numbers[1]);
};

let solution;

//decide which func to use
function chooseFunc() {
    getNums();

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

//calculate the function to get solution
const calculate = document.querySelector('.calculate');

function operate() {
    calculate.addEventListener('click',() => {
        chooseFunc();
        display.textContent = solution;
        equation = '';
    })
};

//clear display
const clearBtn = document.querySelector('.ac');

function clear() {
    clearBtn.addEventListener('click',() => {
        display.textContent = '';
        equation = '';
    });
}

//trigger all funcs
displayOp();
displayNum();
operate();
clear();