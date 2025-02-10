import { Parser } from "../modules/expr-eval-master/index.js";

var calcul_output = document.getElementById("calcul-output");

var calcul_output_items = []

var button_mapping_numbers = {
    0: "0",
    1: "1",
    2: "2",
    3: "3",
    4: "4",
    5: "5",
    6: "6",
    7: "7",
    8: "8",
    9: "9",
}

var button_mapping_operators = {
    add: "+",
    sub: "-",
    mult: "×",
    div: "÷",
}

var button_mapping_functions = {
    sin: "sin",
    cos: "cos",
    tan: "tan",
    pwr2: "^2",
    pwr3: "^3",
    pwr: "^",
    fact: "!",
    log: "log",
    ln: "ln",
    pi: "π",
    e: "e",
}

// function parse_math_exp(calcul) {
//     let output = [];
//     let item = "";
//     for (let index = 0; index < calcul.length; index++) {
//         const letter = calcul[index];
//         if (item == "") {
//             item = letter;
//         } else if (letter in button_mapping_numbers) {
//             if (isNaN(item)) {
//                 output.push(item);
//                 item = letter;
//             } else {
//                 item += letter;
//             }
//         }
//     }
//     console.log(output);
// }

function handle_button_press(button_id) {
    // let output = "";
    // if (button_id in button_mapping_numbers) {
    //     output = button_mapping_numbers[button_id];
    // } else if (button_id in button_mapping_operators) {
    //     if (calcul_output.innerText.substring(calcul_output.innerText.length - 1) in button_mapping_numbers) {
    //         output = button_mapping_operators[button_id];
    //     }
    // } else if (button_id == "clear") {
    //     calcul_output.innerText = "";
    // } else if (button_id == "eq") {
    //     console.log(Parser.evaluate(calcul_output.innerText));
    // }
    // calcul_output.innerText += output;
    
}

function load_buttons() {
    var button_elements = document.getElementsByClassName("calculator-button");
    console.log(button_elements)

    for (let button_index = 0; button_index < button_elements.length; button_index++) {
        const button = button_elements[button_index];

        button.addEventListener("click", function () {
            handle_button_press(this.id);
        })
    }
}

load_buttons();