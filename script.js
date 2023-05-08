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
                if (displayedNum === '0' || previousKeyType === 'clear'|| previousKeyType === 'calculate' || display.textContent === 'ERROR') {
                    display.textContent = keyContent;
                    calculator.firstValue = display.textContent;
                    console.log("First num is " + calculator.firstValue);
                } else if (calculator.operator === '÷' && key.textContent === '0') {
                    display.textContent = 'ERROR';
                    removeActive();
                } else if (previousKeyType === 'operator') {
                    display.textContent = keyContent;
                    calculator.secondValue = display.textContent;
                    console.log("Cal second value is " + calculator.secondValue);
                    //store the current total of the first two num as temp
                    temp = calculate(calculator.firstValue,calculator.operator,calculator.secondValue);
                    console.log(temp);
                } else { //otherwise add new num after the existing num
                    display.textContent = displayedNum + keyContent;
                };
                previousKeyType = 'number';
            } else if (key.classList.contains('operator')) {
                selectOperator(key);
                //taking in the result from last equation as the first value
                if (!calculator.firstValue) {
                    calculator.firstValue = displayedNum;
                    console.log("Cal first value is " + calculator.firstValue);
                } else if (previousKeyType === 'clear' || previousKeyType === 'calculate') {
                    calculator.firstValue = displayedNum;
                    console.log("Cal first value is " + calculator.firstValue);
                } else if (calculator.secondValue || calculator.secondValue !== undefined) {
                    calculator.firstValue = temp; //use the current total as the first value
                    console.log(calculator.firstValue);
                    console.log(calculator.secondValue);
                }
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
                //clear display and results
                result = '';
                display.textContent = '';
                removeActive();
                calculator.secondValue = undefined; //reset secondValue
                previousKeyType = 'clear';
                console.log('Clear key')
            } else if (key.classList.contains('calculate')) {
                console.log('Equal key')
                removeActive();
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

function removeActive() {
    //clear operator btn colour
    operators.forEach((operator) => {
        operator.classList.remove('active');
    });
};

const calculate = (num1,operator,num2) => {
    let result = '';

    if (operator === '+') {
        result = Number(num1) + Number(num2);
    } else if (operator === '-') {
        result = Number(num1) - Number(num2);
    } else if (operator === 'x') {
        result = Number(num1) * Number(num2);
    } else if (operator === '÷') {
        result = Number(num1) / Number(num2);
    };

    return result = Math.round(result * 100)/100;
};

buttonListener();