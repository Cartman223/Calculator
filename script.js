function add(operand1, operand2) {
    return operand1 + operand2
};

function sub(operand1, operand2) {
    return operand1 - operand2
};

function times(operand1, operand2) {
    return operand1 * operand2
};

function divide(operand1, operand2) {
    return operand1 / operand2
};

function operate(operator, operand1, operand2) {
    return operator(operand1, operand2)
};

function roundLongDecimals(number) {
    const isLongDecimal = number.toString().split(".")[1];

    if (isLongDecimal) {
        if (isLongDecimal.length > 14) {
            return number.toFixed(14)
        } else return number
    } else return number
};

let operator, operand1, operand2, result; // will get an assigned value when the user clicks a button

// function that populate the display when you
// click the number buttons
const numbers = document.querySelectorAll(".number");
let display = document.querySelector(".display");


numbers.forEach((number) => {
    number.addEventListener('click', () => {

        if (display.textContent.length >= 16) {
            display.textContent = "";
        };

        if (result) {
            display.textContent = "";
            result = undefined;
        };

        if (operand1 && operator) {

          if(!operand2) {
            display.textContent = "";
            display.textContent = number.textContent;
            operand2 = +display.textContent;
          } else if (operand2) {
            display.textContent += number.textContent;
            operand2 = +display.textContent;
          };

        } else {

            if (display.textContent === "0" && number.textContent === "0") {
                display.textContent = "";
                display.textContent = number.textContent;
            } else {
                if (display.textContent === "0") {
                    display.textContent = "";
                };
                display.textContent += number.textContent;
            };
        };
    });
});

// getting operands from the display

const operators = document.querySelectorAll(".operator");
operators.forEach((op) => {
    op.addEventListener('click', () => {
        // if operand1 and operator are defined
        // the number currently on display will be assigned to operand2
        // then, since we have all the elements needed
        // we evaluate the expression and print to display
        if (operand1 && operator) {
            operand2 = +display.textContent;
            console.log(operand1);
            console.log(operand2);
            console.log(operator);
            result = operate(operator, operand1, operand2);
            display.textContent = roundLongDecimals(result);
            operand1 = result;
            operand2 = undefined;
        } else {
            operand1 = +display.textContent; 
        };
    });
});

// sets the operator that's going to be used for the evaluation
document.querySelector(".add").addEventListener('click', () => {
    operator = add;
});
document.querySelector(".sub").addEventListener('click', () => {
    operator = sub;
});
document.querySelector(".times").addEventListener('click', () => {
    operator = times;
});
document.querySelector(".divide").addEventListener('click', () => {
    operator = divide;
});

// handling the equals sign
const equals = document.querySelector(".equal");
equals.addEventListener('click', () => {
    if (!operand2) {
        operand2 = +display.textContent;
        display.textContent = "";
    };
    console.log(operand1);
    console.log(operand2);
    console.log(operator);

    // checks for divide by 0 operation and print a snarky response to the display
    if (operand2 === 0 && operator === divide) {
        display.textContent = "don't be silly";
    } else if (result === +display.textContent && operator && operand1 && operand2) {
        operand1 = result;
        result = operate(operator, operand1, operand2);
        display.textContent = roundLongDecimals(result);
        result = +display.textContent;
    } else if (operator && operand1 && operand2) { // makes sure all the required variables are defined before evaluating the expression
        // here we are evaluating the expression input by the user and then printing the result to the display
        result = operate(operator, operand1, operand2);
        display.textContent = roundLongDecimals(result);
        operand1 = undefined;
        operand2 = undefined;
    };


    // rounding up the display
});

// the clear function
// we are making sure the user is really starting from scratch after pressing "C"
document.querySelector(".clear").addEventListener('click', () => {
    display.textContent = "";
    operand1 = undefined;
    operand2 = undefined;
    operator = undefined;
    result = undefined;
});



