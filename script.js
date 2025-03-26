document.addEventListener("DOMContentLoaded", function () {
    const display = document.getElementById("display");
    let currentInput = "";
    let previousInput = "";
    let operator = "";
    let isSquareRootMode = false;

    function updateDisplay() {
        display.textContent = (previousInput + (operator ? " " + operator + " " : "") + currentInput).trim() || "0";
    }

    function handleButtonClick(value) {
        if (value === "√") {
            isSquareRootMode = true; // Indicate that square root is active
            previousInput = "√"; // Show √ in the display
            currentInput = "";
        } else if (!isNaN(value) || value === ".") {
            if (isSquareRootMode) {
                currentInput += value; // Allow input after √
            } else {
                if (value === "." && currentInput.includes(".")) return;
                if (currentInput === "0" && value !== ".") {
                    currentInput = value;
                } else {
                    currentInput += value;
                }
            }
        } else {
            handleOperator(value);
        }
        updateDisplay();
    }

    function handleOperator(op) {
        if (op === "=") {
            if (isSquareRootMode && currentInput !== "") {
                // Calculate the square root of the entered number
                let num = parseFloat(currentInput);
                currentInput = num >= 0 ? Math.sqrt(num).toString() : "Error";
                previousInput = "";
                isSquareRootMode = false;
            } else if (previousInput && operator) {
                currentInput = calculate(previousInput, currentInput, operator);
                previousInput = "";
                operator = "";
            }
        } else if (op === "AC") {
            currentInput = "";
            previousInput = "";
            operator = "";
            isSquareRootMode = false;
        } else {
            if (currentInput === "" && previousInput !== "") {
                operator = op;
            } else {
                if (previousInput) {
                    currentInput = calculate(previousInput, currentInput, operator);
                }
                previousInput = currentInput;
                operator = op;
                currentInput = "";
            }
        }
        updateDisplay();
    }

    function calculate(num1, num2, op) {
        const n1 = parseFloat(num1);
        const n2 = parseFloat(num2);

        if (isNaN(n1) || isNaN(n2)) return num1;

        switch (op) {
            case "+": return (n1 + n2).toString();
            case "-": return (n1 - n2).toString();
            case "*": return (n1 * n2).toString();
            case "/": return n2 !== 0 ? (n1 / n2).toString() : "Error";
            case "%": return (n1 % n2).toString();
            case "^": return Math.pow(n1, n2).toString();
            default: return num1;
        }
    }

    document.querySelectorAll(".button, .button1, .button2").forEach(button => {
        button.addEventListener("click", function () {
            handleButtonClick(this.getAttribute("data-value"));
        });
    });

    updateDisplay();
});
