const calculator = document.querySelector('.calculator');
const buttons = document.querySelectorAll('button');
const display = document.querySelector('.display');
const operators = document.querySelectorAll('.operator');
let previousKeyType; //setting a var for the last key that has been clicked
const getTemp = () => calculate(calculator.firstValue,calculator.operator,calculator.secondValue);

function buttonListener() {
    buttons.forEach((button => {
        button.addEventListener('click', (e => {
            const key = e.target
            const keyContent = key.textContent;
            const displayedNum = display.textContent;
            
            if (key.classList.contains('number')) {
                console.log(keyContent);
                //if this is the first number
                if (!calculator.firstValue) {
                    //if user typing decimal before putting any number, add zero before dot
                    if (previousKeyType === 'decimal') {
                        display.textContent = '0.' + keyContent;
                        calculator.firstValue = display.textContent;
                        console.log('First num is: ' + calculator.firstValue);
                    } else {
                        //display the number clicked on screen
                        display.textContent = keyContent;
                        calculator.firstValue = display.textContent;
                        console.log('First num is: ' + calculator.firstValue);
                    };
                //if a number has been entered before this
                } else if (previousKeyType === 'number') {
                    //if this is for the other digits of first number
                    if (!calculator.secondValue) {
                        //if only 0 is on screen then replace it with new num
                        if (displayedNum === '0') {
                            display.textContent = keyContent;
                            calculator.firstValue = display.textContent;
                            console.log('First num is: ' + calculator.firstValue);
                        } else {
                            //add new num after the existing num on screen
                            display.textContent = displayedNum + keyContent;
                            //set the first value as the number on screen
                            calculator.firstValue = display.textContent;
                            console.log('First num is: ' + calculator.firstValue);
                        };
                    //if this is for the other digits of second number
                    } else {
                        //add new num after the existing num on screen
                        display.textContent = displayedNum + keyContent;
                        //set the second value as the number on screen
                        calculator.secondValue = display.textContent;
                        console.log("Second num is " + calculator.secondValue);
                    };
                } else if (previousKeyType === 'operator') {
                    //if user try to divide by zero
                    if (calculator.operator === '÷' && key.textContent === '0') {
                        display.textContent = 'ERROR';
                        //reset everything
                        removeActive();
                        removeValues();
                    } else {
                        if (!calculator.secondValue) {
                            //display the number clicked on screen
                            display.textContent = keyContent;
                            //set the second value as the number on screen
                            calculator.secondValue = display.textContent;
                            console.log("Second num is " + calculator.secondValue);
                        } else {
                            calculator.firstValue = getTemp();
                            console.log('New first num is: ' + calculator.firstValue);
                            calculator.secondValue = undefined;
                        };
                    };
                //if user click decimal key
                } else if (previousKeyType === 'decimal') {
                    //if second value has not been defined yet, add zero before the clicked number
                    if (!calculator.secondValue) {
                        display.textContent = '0.' + keyContent;
                        calculator.secondValue = display.textContent;
                        console.log('Second num is: ' + calculator.secondValue);
                    //else add number after the decimal point
                    } else {
                        display.textContent = displayedNum + keyContent;
                        calculator.secondValue = display.textContent;
                        console.log('Second num is: ' + calculator.secondValue);
                    };
                };
            previousKeyType = 'number';
                
            } else if (key.classList.contains('operator')) {
                //set the selected operator as active
                setActive(key);
                //taking in the result from last equation as the first value
                if (!calculator.firstValue) {
                    calculator.firstValue = displayedNum;
                    console.log("Cal first value is " + calculator.firstValue);
                } else if (previousKeyType === 'calculate') {
                    calculator.firstValue = displayedNum;
                    console.log("Cal first value is " + calculator.firstValue);
                } else if (!calculator.secondValue || calculator.secondValue === undefined) {
                    //store the current total of the first two num as temp
                    display.textContent = calculator.firstValue;
                } else if (calculator.secondValue) {
                    calculator.firstValue = getTemp();
                    console.log('New first num is: ' + calculator.firstValue);
                    calculator.secondValue = undefined;
                }
                selectOperator(key);
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
                removeValues();
                console.log('Clear key')
                previousKeyType = 'clear';
            } else if (key.classList.contains('delete')) {
                display.textContent = display.textContent.slice(0,-1);
            } else if (key.classList.contains('calculate')) {
                console.log('Equal key')
                //remove the active operator css
                removeActive();
                //if user did not give second number then show the displayed number again
                if (!calculator.secondValue) {
                    display.textContent = displayedNum;
                //otherwise calculate using the two numbers
                } else {
                    //storing the var before they are wiped off
                    const firstValue = calculator.firstValue;
                    const operator = calculator.operator;
                    const secondValue = displayedNum;
                    display.textContent = calculate(firstValue,operator,secondValue);
                }
                //reset the value
                removeValues();
                previousKeyType = 'calculate';
            } else {
                console.log('Error')
            };
        }));
    }));
};

function selectOperator(selectedKey) {
    calculator.operator = selectedKey.textContent;
    console.log(calculator.operator)
};

function setActive(selectedKey) {
    operators.forEach((operator) => {
        operator.classList.remove('active');
    });
    selectedKey.classList.add('active');
};

function removeActive() {
    //clear operator btn colour
    operators.forEach((operator) => {
        operator.classList.remove('active');
    });
};

function removeValues() {
    calculator.firstValue = undefined;
    calculator.secondValue = undefined;
    calculator.operator = undefined;
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