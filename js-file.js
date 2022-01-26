/*==========================================
        samjwebster's calculator js
==========================================*/


const test2 = document.getElementById('test2');
const test1 = document.getElementById('test1');


// variable to display on screen
var displayValue = '';

// arrays to hold operations and values
var operations = [];
var variables = [];

// identify display element
const displayText = document.getElementById('display-text');

// update function for later readability
function updateDisplay() {
    if(displayValue.length > 13) {
        displayText.textContent = 'overflow';
    } else displayText.textContent = displayValue;
}

// add button pressing to numbers
document.querySelectorAll('.number').forEach(item => {
    item.addEventListener('click', event => {
        displayValue = displayValue + item.textContent;
        updateDisplay();
    })
});

// add button pressing to operators
document.querySelectorAll('.operator').forEach(item => {
    item.addEventListener('click', event => {
        if(item.id == 'clear') {
            // clears all currently stored variables
            displayValue = '';
            variables = [];
            operations = [];
        } else if (item.id == 'backspace-button') {
            // is last value numeric
            if((displayValue[displayValue.length -1] >= '0' && displayValue[displayValue.length -1] <= '9') || displayValue[displayValue.length -1] == '.') {
                variables = variables.splice(-1);
            } else { // otherwise, it's an operation
                console.log(variables);
                console.log(operations);
                operations = operations.splice(0,-1);
                variables = variables.splice(0, -1);
                console.log('removing operation');
                console.log(variables);
                console.log(operations);

            }
            displayValue = displayValue.slice(0,-1);
        } else if (item.id == 'equals') { // equals
            if(getVal(displayValue)) {
                variables.push(getVal(displayValue));

                console.log('before eval');

                console.log(variables);
                console.log(operations);

                displayValue = operate(operations, variables).toString();
                variables = [];
                operations = [];

                console.log('after eval');
                console.log(variables);
                console.log(operations);

            }
        } else { // math operators
            if(getVal(displayValue)) {
                variables.push(getVal(displayValue));
                operations.push(item.id);
                displayValue = displayValue + item.textContent;
            } 
        }
        updateDisplay();
    })
});

function getVal(string) {
    let i = 0;
    let newVal = '';

    // cycle backwards through the current string
    for(i = (string.length - 1); i >= 0; i--) {
        // if non-numeric character is found (operator)
        if (!(string[i] >= '0' && string[i] <= '9' || string[i] == '.')) {
            return newVal;
        } else {
            newVal = string.charAt(i) + newVal;
        }
    }
    if(newVal == '') {
        newVal = 0; // return 0 if getVal fails
    }
    return newVal;
}

// general operation functions
function add(a, b) {
    return (a + b);
}

function subtract(a, b) {
    return (a - b);
}

function multiply(a, b) {
    return (a * b);
}

function divide(a, b) {
    return (a / b);
}

function operate(ops, vars) {
    // init variables
    let a, b, type;
    let result = 0;

    // this loop ensures multiple operations can be completed
    while(operations.length > 0) {

        a = parseFloat(variables[0]);
        b = parseFloat(variables[1]);
        type = operations[0]

        switch (type) {
            case ("add"): {
                result = add(a, b);
                break;
            }
            case ("subtract"): {
                result = subtract(a, b);
                break;
            }
            case ("multiply"): {
                result = multiply(a, b);
                break;
            }
            case ("divide"): {
                result = divide(a, b);
                break;
            }
        }

        // removes the just completed operation from list of operators
        operations = operations.slice(1);
        
        // removes the two used variables and replaces them with the result
        variables = variables.slice(1);
        if(operations.length > 0) {
            variables[0] = result;
        }
    }

    // rounds result to the nearest hundredth
    result = Math.round(result * 100) / 100;

    return result;
}