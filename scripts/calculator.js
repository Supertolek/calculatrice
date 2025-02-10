import { Parser } from "../modules/expr-eval-master/index.js";

const NUMBERS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const FUNCTIONS = ["sin", "asin", "cos", "acos", "tan", "atan", "log", "ln", "fact"];
const CONSTANTS = ["pi", "e", "x"];
const OPERATORS = ["+", "-", "*", "/", "^"];
const UNARY_OPERATORS = ["!", "^2", "^3"]
const PARENTHESIS = ["(", ")"]
const NEW_VALUE = NUMBERS + FUNCTIONS + CONSTANTS;
const calcul_display = document.getElementById("calcul-display");
const calcul_display_base = document.getElementById("calcul-display-base");
const calcul_display_current = document.getElementById("calcul-display-current");
const calcul_display_autocomplete = document.getElementById("calcul-display-autocomplete");
const calcul_output = document.getElementById("calcul-output");
const variable_x = document.getElementById("x-value");

const parser = new Parser();

var result = ""
var calcul = "";
var current_token = ""
var current_token_type = ""
var opened_parenthesis = ""

function calculate() {
    let x = parseFloat(variable_x.value);
    console.log(x);
    console.log("calcul = ", calcul + current_token + opened_parenthesis)
    try {
        result = Parser.evaluate(calcul + current_token + opened_parenthesis, { pi: Math.PI, e: Math.E, x: x });
        console.log("result = ", result);
        return true
    } catch ({ name, message }) {
        console.log(name, message)
        result = name
        return false;
    }
}

function handle_button_press(char_id) {
    /* This function is called when a button of the calculator is clicked.
    It checks if the action is possible and adds it to the calcul. */
    if (char_id == "eq") {
        return calculate();
    }
    if (char_id == "clear") {
        calcul = "";
        current_token = "";
        current_token_type = "";
        opened_parenthesis = "";
        return true;
    }

    if (current_token_type == "num") {
        // The last token is a number, consider inputs with this
        if (NUMBERS.includes(char_id)) {
            // Still writing in a number
            current_token += char_id;
            console.log("0 -> 0");
        } else if (CONSTANTS.includes(char_id)) {
            // It is a constant
            calcul += current_token + "*";
            current_token = char_id;
            current_token_type = "const";
        } else if (OPERATORS.includes(char_id)) {
            // Making calcul with the last number
            calcul += current_token;
            current_token = char_id;
            current_token_type = "op";
        } else if (FUNCTIONS.includes(char_id)) {
            // Using a function, puts the input number inside of the function
            calcul += char_id + "(";
            opened_parenthesis += ")";
        } else if (char_id == "p-open") {
            // Parenthesis handling, open and close
            calcul += "(";
            opened_parenthesis += ")";
        } else if (char_id == "p-close") {
            // Parenthesis handling, open and close
            calcul += current_token + ")";
            current_token = ""
            current_token_type = "p-close"
            opened_parenthesis = opened_parenthesis.substring(0, opened_parenthesis.length - 1);
        } else if (UNARY_OPERATORS.includes(char_id)) {
            current_token += char_id;
            current_token_type = "const";
        } else {
            // Alert that the input has failed
            return false;
        }
        // Return success
        return true;
    }
    if (current_token_type == "const") {
        // The last token is a number, consider inputs with this
        if (NUMBERS.includes(char_id)) {
            // Still writing in a number
            calcul += current_token + "*";
            current_token = char_id;
            current_token_type = "num";
        } else if (CONSTANTS.includes(char_id)) {
            // It is a constant
            calcul += current_token + "*";
            current_token = char_id;
            current_token_type = "const";
        } else if (OPERATORS.includes(char_id)) {
            // Making calcul with the last number
            calcul += current_token;
            current_token = char_id;
            current_token_type = "op";
        } else if (FUNCTIONS.includes(char_id)) {
            // Using a function, puts the input number inside of the function
            calcul += char_id + "(";
            opened_parenthesis += ")";
        } else if (char_id == "p-open") {
            // Parenthesis handling, open and close
            calcul += "(";
            opened_parenthesis += ")";
        } else if (char_id == "p-close") {
            // Parenthesis handling, open and close
            calcul += current_token + ")";
            current_token = ""
            current_token_type = "p-close"
            opened_parenthesis = opened_parenthesis.substring(0, opened_parenthesis.length - 1);
        } else if (UNARY_OPERATORS.includes(char_id)) {
            current_token += char_id;
            current_token_type = "const";
        } else {
            // Alert that the input has failed
            return false;
        }
        // Return success
        return true;
    }
    if (current_token_type == "op") {
        // The last token is an operator
        if (NUMBERS.includes(char_id)) {
            // The new token is a number. Do so
            calcul += current_token;
            current_token = char_id;
            current_token_type = "num";
        } else if (CONSTANTS.includes(char_id)) {
            // It is a constant
            calcul += current_token;
            current_token = char_id;
            current_token_type = "const";
        } else if (FUNCTIONS.includes(char_id)) {
            // The new token is a function
            calcul += current_token;
            calcul += char_id + "(";
            opened_parenthesis += ")";
            current_token_type = "p-open";
        } else if (char_id == "-") {
            calcul += current_token + "(-";
            current_token = "";
            current_token_type = "p-open";
            opened_parenthesis += ")";
        } else if (char_id == "p-open") {
            // A parenthesis is added.
            calcul += current_token + "(";
            current_token == "";
            current_token_type = "p-open";
            opened_parenthesis += ")";
        } else {
            return false;
        }
        return true;
    }
    if (current_token_type == "p-open" || current_token_type == "") {
        // The last token is a parenthesis
        if (NUMBERS.includes(char_id)) {
            // The new token is a number. Do so
            current_token = char_id;
            current_token_type = "num";
            console.log("... ( -> 0");
        } else if (CONSTANTS.includes(char_id)) {
            // It is a constant
            current_token = char_id;
            current_token_type = "const";
        } else if (FUNCTIONS.includes(char_id)) {
            // The new token is a function
            calcul += char_id + "(";
            opened_parenthesis += ")";
            current_token_type = "p-open";
        } else if (char_id == "p-open") {
            // Parenthesis handling, open and close
            calcul += "(";
            opened_parenthesis += ")";
        } else if (char_id == "p-close") {
            // Parenthesis handling, open and close
            calcul += current_token + ")";
            current_token = "";
            current_token_type = "p-close";
            opened_parenthesis = opened_parenthesis.substring(0, opened_parenthesis.length - 1);
        } else if (char_id == "-") {
            current_token = "-";
            current_token_type = "op";
        } else {
            return false;
        }
        return true;
    }
    if (current_token_type == "p-close") {
        if (NUMBERS.includes(char_id)) {
            // A number!
            calcul += "*";
            current_token = char_id;
            current_token_type = "num";
        } else if (OPERATORS.includes(char_id)) {
            current_token = char_id;
            current_token_type = "op";
        } else if (FUNCTIONS.includes(char_id)) {
            calcul += "*" + char_id + "(";
            current_token = "";
            current_token_type = "p-open";
            opened_parenthesis += ")";
        } else {
            return false;
        }
    }
}

function setup_calculator() {
    var calculator_buttons = document.getElementsByClassName("calculator-button");
    console.log(calculator_buttons);
    // Add an eventListener for each button.
    for (let button_index = 0; button_index < calculator_buttons.length; button_index++) {
        const button = calculator_buttons[button_index];

        button.addEventListener("click", function () {
            console.log("____________________")
            handle_button_press(this.id);
            console.log("this.id = ", this.id);
            console.log("current_token = ", current_token)
            console.log("calcul = ", calcul);
            calcul_display_base.innerText = calcul;
            calcul_display_current.innerText = current_token;
            calcul_display_autocomplete.innerText = opened_parenthesis;
            calcul_output.innerText = result;
        });
    }

    variable_x.addEventListener("input", (e) => {
        console.log("____________________")
        if (calculate()) {
            calcul_output.innerText = result;
        }
    })
}

setup_calculator();