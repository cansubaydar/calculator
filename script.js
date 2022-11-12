let btns = document.querySelectorAll('button');
let screenInput = document.querySelector('.screen-input');
let screenResult = document.querySelector('.screen-result');
screenInput.textContent = '';

let num1 = '';
let num2 = '';
let operator = '';

// basic math operators  
const add = (a, b) => (a + b);
const subtract = (a, b) => (a - b);
const multiply = (a, b) => (a * b);
const divide = (a, b) => (a / b);
const percentage = (a, b) => ((a / 100) * b);

// function that take an operator and 2 numbers
function operate (num1, operator, num2){ 
    let result; 
    let n1 = Number(num1);
    let n2 = Number(num2);

    switch(operator) {
        case '+':
            result = add(n1, n2);
            return result; 
        case '-':
            result = subtract(n1, n2);
            return result;
        case 'x' :
            result = multiply(n1, n2);
            return result;
        case '/':
            result = divide(n1, n2);
            return n2 !== 0 ? result : 'error';
        case '%': 
            result = percentage(n1, n2);
            return result;
        default:
            result = null;
    }
    screenInput.textContent = result;
    num1 = result;
    operator = '';
    num2 = '';
}

// event listener to the buttons
btns.forEach(btn => btn.addEventListener('click', calcKey));

// event listener for keyboard
window.addEventListener('keydown', (e) => {
    let keyVal = e.key;
    if (keyVal.match(/^[0-9c=+\-*.%\/]*$/g) || keyVal === 'Enter' || keyVal === 'Backspace') {
        calculate(keyVal); 
    }
});

function calcKey(e) {
    let val = e.target.value;
    calculate(val);
} 

// function that stores the values and displays them on the screen 
function calculate(e) {
    if (e.match(/[+\-x*%\/]/g)) { 
        if (screenResult.textContent === num1 && !num2) {
            screenInput.textContent = num1; 
        } 
        if(!num1) { 
           !screenResult.textContent ? num1 = '0' : num1 = screenResult.textContent;
           screenInput.textContent = num1;
        }
        if (num1 && num2) {
            screenResult.textContent = operate(num1, operator, num2);
            // check the length of the result and if it contains the decimal, round the result
            if(screenResult.textContent.length > 5 && screenResult.textContent.includes('.')) {
                screenResult.textContent = operate(num1, operator, num2).toFixed(2); 
            } 
            // check if operation is clicked and the length of screen is long and change the screen
            if (screenInput.textContent.includes(operator) && screenInput.textContent.length > 7) {
                screenInput.textContent = screenResult.textContent;
            }
            num1 = screenResult.textContent;
            num2 = ''; 
            operator = '';
        }
        if (!operator) {
            if (e === '*') e = 'x';
            operator = e;
            screenInput.textContent += operator; 
        }
    } else if (e === '=' || e === 'Enter') { 
        if (num1 && num2) {
            screenResult.textContent = operate(num1, operator, num2);
            if(screenResult.textContent.length > 5 && screenResult.textContent.includes('.')) {
                screenResult.textContent = operate(num1, operator, num2).toFixed(2); 
            } 
            num1 = ''; 
            num2 = '';
            operator = ''; 
        }
    } else if (e === 'AC' || e === 'Backspace') {
        reset();
    } else if (e === 'C' || e === 'c') {
        if(num1) {
            if(!operator) {
                clear();
                num1 = screenInput.textContent;
            } else if (operator && !num2) {
                operator = operator.toString().slice(0, -1);
                clear(); 
            } else if (num2) {
                num2 = num2.toString().slice(0, -1);
                clear();
            }
        } 
    } else if (num1 && operator) {
        if(operator.includes('%') && !num2) { 
            screenInput.textContent += 'x';
        } 
        decimal(e, num2); 
        num2 += e;
        screenInput.textContent += e;
    } else {
        decimal(e, num1);
        num1 += e; 
        screenInput.textContent = num1;
        if(!e.match(/[+\-x*%\/]/g) && screenResult.textContent) {
            screenResult.textContent = '';
        }
    }
}

// add decimal point
function decimal(d, n) {
    if (d === '.' && n.includes('.')) return; 
    if (d === '.' && !n) {
        if (n === num1) {
            num1 = '0';
            screenInput.textContent = num1;
        } else if (n === num2) {
            num2 = '0';
            screenInput.textContent += num2;
        }
    }
}

// clear all the values 
function reset() {
    screenInput.textContent = '';
    screenResult.textContent = '';
    num1 = '';
    num2 = '';
    operator = '';
}

// delete display value
function clear() { 
    let c = screenInput.textContent.toString().split('');
    c.pop();
    screenInput.textContent = c.join('');
}