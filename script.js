const buttons = document.querySelectorAll('button');
const display = document.querySelector('.display');
const operators = document.querySelectorAll('.operator');

//set default as null
let firstOperator = null;
let secondOperator = null;
let firstNum = null;
let secondNum = null;
let displayValue = '';

function cOperation(vkey){
    //if user click a number
    if (vkey.classList.contains('number')) {
        inputNum(vkey.textContent);
        updateDisplay();
    } else if (vkey.classList.contains('operator')) {
        inputOperator(vkey.textContent);
        setActive(vkey);
    } else if (vkey.classList.contains('decimal')) {
        inputDecimal(vkey.textContent);
        updateDisplay();
    } else if (vkey.classList.contains('delete')) {
        //convert displayValue to string to slice
        displayValue = displayValue.toString().slice(0,-1);
        updateDisplay();
    } else if (vkey.classList.contains('ac')) {
        removeActive();
        removeValues();
        updateDisplay();
    } else if (vkey.classList.contains('calculate')) {
        //if user did not give a second number at all
        if (!firstNum) {
            firstNum = displayValue;
        } else {
            secondNum = displayValue;
            calculate(firstNum,firstOperator,secondNum);
        }
        removeActive();
        updateDisplay();
        checkStat();
    };
}


function keyboardListener() {
    document.addEventListener('keydown', (e) => {
        const key = document.querySelector(`button[data-key='${e.key}']`);
        cOperation(key);
        // const keyContent = key.textContent;
        // //if user click a number
        // if (key.classList.contains('number')) {
        //     inputNum(keyContent);
        //     updateDisplay();
        // } else if (key.classList.contains('operator')) {
        //     inputOperator(keyContent);
        //     setActive(key);
        // } else if (key.classList.contains('decimal')) {
        //     inputDecimal(keyContent);
        //     updateDisplay();
        // } else if (key.classList.contains('delete')) {
        //     //convert displayValue to string to slice
        //     displayValue = displayValue.toString().slice(0,-1);
        //     updateDisplay();
        // } else if (key.classList.contains('ac')) {
        //     removeActive();
        //     removeValues();
        //     updateDisplay();
        // } else if (key.classList.contains('calculate')) {
        //     //if user did not give a second number at all
        //     if (!firstNum) {
        //         firstNum = displayValue;
        //     } else {
        //         secondNum = displayValue;
        //         calculate(firstNum,firstOperator,secondNum);
        //     }
        //     removeActive();
        //     updateDisplay();
        //     checkStat();
        // };
    });
};

function buttonListener() {
    buttons.forEach((button) => {
        button.addEventListener('click', (e) => {
            const btn = e.target;
            cOperation(btn);
            // const btnContent = btn.textContent;
            // //if user click a number
            // if (btn.classList.contains('number')) {
            //     inputNum(btnContent);
            //     updateDisplay();
            // } else if (btn.classList.contains('operator')) {
            //     inputOperator(btnContent);
            //     setActive(btn);
            // } else if (btn.classList.contains('decimal')) {
            //     inputDecimal(btnContent);
            //     updateDisplay();
            // } else if (btn.classList.contains('delete')) {
            //      //convert displayValue to string to slice
            //     displayValue = displayValue.toString().slice(0,-1);
            //     updateDisplay();
            // } else if (btn.classList.contains('ac')) {
            //     removeActive();
            //     removeValues();
            //     updateDisplay();
            // } else if (btn.classList.contains('calculate')) {
            //     //if user did not give a second number at all
            //     if (!firstNum) {
            //         firstNum = displayValue;
            //     } else {
            //         secondNum = displayValue;
            //         calculate(firstNum,firstOperator,secondNum);
            //     }
            //     removeActive();
            //     updateDisplay();
            //     checkStat();
            // };
        })
    });
};

//update the display
function updateDisplay() {
    display.textContent = displayValue;
};

//reset all values
function removeValues() {
    displayValue = '';
    firstNum = null;
    secondNum = null;
    firstOperator = null;
    secondOperator = null;
};

//apply css to the active operator 
function setActive(btn) {
    operators.forEach((operator) => {
        operator.classList.remove('active');
    });
    btn.classList.add('active');
};

//remove active status from operators
function removeActive() {
    //clear operator btn colour
    operators.forEach((operator) => {
        operator.classList.remove('active');
    });
};

//for debugging
function checkStat() {
    //remove previous log lines
    console.clear();
    console.log("Equation = " + firstNum + ' ' + firstOperator + ' ' + secondNum);
    console.log(`
    \t 1st num: ${firstNum}
    \t 2nd num: ${secondNum}
    \t 1st opt: ${firstOperator}
    \t 2nd opt: ${secondOperator}
    `);
};

//when user click number keys
function inputNum(num) {
    //if first operator has not been declared
    if (firstOperator === null) {
        //if display is clear or shows zero, replace with clicked num
        if (displayValue === '' || displayValue === 0) {
            displayValue = num;
        //if total of first operation is displayed, replace with clicked num
        } else if (displayValue === firstNum) {
            displayValue = num;
        //else add number after displayed num
        } else {
            displayValue += num;
        };
    //if first num has been declared
    } else {
        //if first num is displayed, replace with clicked num
        if (displayValue === firstNum) {
            displayValue = num;
        //else add number after displayed num
        } else {
            displayValue += num;
        };
    };
};

//when user click operator keys
function inputOperator(operator) {
    //when an operation has been declared before this
    if (firstOperator != null && secondOperator === null) {
        //the display num is the second num;
        secondNum = displayValue;
        //calculate and display the total of the first operation
        calculate(firstNum,firstOperator,secondNum);
        updateDisplay();
        //make the total as the first num and make remove second num;
        firstNum = displayValue;
        secondNum = null;
        //the current operator will be the second operator
        firstOperator = operator;
        secondOperator = null;
        checkStat();
    //if both operators have been declared
    } else if (firstOperator != null && secondOperator != null) {
        //the display num is the second num;
        secondNum = displayValue;
        //calculate and display the total of the first operation
        calculate(firstNum,secondOperator,secondNum);
        updateDisplay();
        //make the total as the first num;
        firstNum = displayValue;
        firstOperator = operator;
        secondOperator = null;
        secondNum = null;
        checkStat();
    //second number has not been declared
    } else {
        firstOperator = operator;
        firstNum = displayValue;
        checkStat();
    };
};

function inputDecimal() {
    //if displayed num is only a decimal point, or display num is first num
    if (displayValue === '' || displayValue === firstNum) {
        displayValue = '0.';
    //else add number after the decimal point
    } else {
        if (displayValue.split(/[.]/).length != 2) {
            displayValue += '.';
        };
    };
};

//calculate the total
const calculate = (firstNum,operator,secondNum) => {
    let result = '';

    if (operator === '+') {
        result = Number(firstNum) + Number(secondNum);
    } else if (operator === '-') {
        result = Number(firstNum) - Number(secondNum);
    } else if (operator === 'x') {
        result = Number(firstNum) * Number(secondNum);
    } else if (operator === '÷') {
        result = Number(firstNum) / Number(secondNum);
    };

    return displayValue = Math.round(result * 100)/100;
};

buttonListener();
keyboardListener();