function calculate(input_value) {
    /**
     * Below regural expression(regex) is for matching our operators (+, -, * and /).
     * In JavaScript we wrap regexes with a slash in the beginning and end of the expression.
     * This regex was generated here: https://regex101.com/
    */
    const expression = /\+|\-|\*|\//;

    // Here we split the string from the input into an array
    const numbers = input_value.split(expression);

    /**
     * Get the first and second number in the arithmetic operation.
     * Because they are strings we use parseInt() to convert them to numbers.
    */
    const first = parseInt(numbers[0]);
    const second = parseInt(numbers[1]);

    /**
     * The match helper is a string prototype that retrieves the result of matching a string against a
     * regex. The result of it is returned as an array. In this case it will match the operator and return it.
     * 
     * More info: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match
    */
    const operator_match = input_value.match(expression);
    let operator;

    if(Number.isNaN(first) || Number.isNaN(second) || operator_match === null) {
        return updateResult('Operation not recognized');
    } else {
        // get the operator from the match result array
        operator = operator_match[0];
    }

    const calculator = new Calculator();
    calculator.add(first);

    let result;

    switch (operator) {
        case '+':
            result = calculator.add(second);
            break;
        case '-':
            result = calculator.subtract(second);
            break;
        case '*':
            result = calculator.multiply(second);
            break;
        case '/':
            result = calculator.divide(second);
            break;
    }

    return updateResult(result);
};

function updateResult(calculator_result) {
    const calculator_result_element = document.getElementById('calculator-result-span');

    if (calculator_result_element) {
        calculator_result_element.innerText = `Result: ${calculator_result}`;
    }
};

function showVersion() {
    const calculator =  new Calculator()

    const element = document.getElementById('calculator-version')

    // version is a getter in the Calculator class
    calculator.version.then(version => {
        element.innerText = version
    })
}

/**
 * How to check an element exists in the DOM:
 * 
 * https://stackoverflow.com/questions/5629684/how-can-i-check-if-an-element-exists-in-the-visible-dom#answer-5629761
*/
if (typeof(document.getElementById('calculator-input')) !== 'undefined' && document.getElementById('calculator-input') !== null) {
    document.getElementById('calculator-input').addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            return calculate(event.target.value);
        }
    })
}