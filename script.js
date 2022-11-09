let btns = document.querySelectorAll('button');
let screenInput = document.querySelector('.screen-input');
let screenResult = document.querySelector('.screen-result');
screenInput.textContent = '';

let num1 = '';
let num2 = '';
let operation = '';

// basic math operators  
const add = (a, b) => (a + b);
const subtract = (a, b) => (a - b);
const multiply = (a, b) => (a * b);
const divide = (a, b) => (a / b);
const percentage = (a, b) => ((a / 100) * b);

// function that take an operator and 2 numbers
function operator (num1, operation, num2) { 
    let result; 
    let n1 = Number(num1);
    let n2 = Number(num2);

    switch(operation) {
        case '+':
            result = add(n1, n2);
            return result; 
        case '-':
            result = subtract(n1, n2);
            return result;
        case 'x' :
        case '*' :
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
    operation = '';
    num2 = '';
}

// event listener to the buttons
btns.forEach(btn => btn.addEventListener('click', calculate));

// function that stores the values and displays them on the screen 
function calculate (e) {
    let selected = e.target.className;
    let val = e.target.value;
    
    if (selected === 'operators') {
        if (screenResult.textContent === num1 && !num2) {
            screenInput.textContent = num1; 
        } 
        if (!num1) { 
            !screenResult.textContent ? num1 = '0' :  num1 = screenResult.textContent;
            screenInput.textContent = num1;
        }
        if (num1 && num2) {
            screenResult.textContent = operator(num1, operation, num2);
            // check the length of the result and if it contains the decimal, round the result
            if (screenResult.textContent.length > 5 && screenResult.textContent.includes('.')) {
                screenResult.textContent = operator(num1, operation, num2).toFixed(2); 
            } 
            // check if operation is clicked and the length of screen is long and change the screen
            if (screenInput.textContent.includes(operation) && screenInput.textContent.length > 7) {
                screenInput.textContent = screenResult.textContent;
            }
            num1 = screenResult.textContent;
            num2 = ''; 
            operation = '';
       }
        if (!operation) {
            operation = val;
            screenInput.textContent += operation; 
        } 
    // when the equal is clicked 
    } else if (selected === 'equal') { 
        if (num1 && num2) {
            screenResult.textContent = operator(num1, operation, num2);
            if(screenResult.textContent.length > 5 && screenResult.textContent.includes('.')) {
                screenResult.textContent = operator(num1, operation, num2).toFixed(2); 
            } 
            num1 = ''; 
            num2 = '';
            operation = ''; 
        } 
    } else if (selected === 'reset') {
        reset();
    } else if (num1 && operation) {
        if (selected === 'decimal' && num2.includes('.')) return; 
        if (selected === 'decimal' && !num2) { 
            num2 = '0';
            screenInput.textContent += num2;
        }
        if (operation.includes('%') && !num2) {
            screenInput.textContent += 'x';
        } 
        if (selected === 'clear') {
            if (!num2 && operation) return;
            num2 = num2.toString().slice(0, -1);
            clear();
        } else {
            num2 += val;
            screenInput.textContent += val;
        }
    } else if (selected === 'clear' && !operation) {
        screenInput.textContent = screenResult.textContent;
        clear();
        num1 = screenInput.textContent;
    } else {
        if (selected === 'decimal' && num1.includes('.')) return; 
        if (selected === 'decimal' && !num1) { 
            num1 = '0';
            screenInput.textContent = num1;
        }
        if (selected === 'clear') {
            clear();
            num1 = screenInput.textContent;
        } else {
            num1 += val; 
            screenInput.textContent = num1;
        }
        if(selected !== 'operators' && screenResult.textContent) {
            screenResult.textContent = '';
        } 
    }
}

// clear all the values 
function reset() {
    screenInput.textContent = '';
    screenResult.textContent = '';
    num1 = '';
    num2 = '';
    operation = '';
}

// delete display value
function clear() { 
    let c = screenInput.textContent.toString().split('');
    c.pop();
    screenInput.textContent = c.join('');
}