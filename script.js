class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.currentOperandTextElement = currentOperandTextElement;
    this.previousOperandTextElement = previousOperandTextElement;
    this.allClearButton();
  }

  allClearButton() {
    this.currentOperand = '';
    this.previousOperand = '';
    this.operation = undefined;
  }

  delete() {
    if (this.currentOperand === '') {
      this.currentOperand = this.previousOperand;
      this.previousOperand = '';
    } else {
      this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }
  }

  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return;
    if (number === 'π') number = 3.14159;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText = this.currentOperand;
    this.previousOperandTextElement.innerText = this.previousOperand;
    if (this.operation != undefined) {
      this.previousOperandTextElement.innerText = this.previousOperand;
      this.currentOperandTextElement.innerText = this.currentOperand;
    }
  }

  negative() {
    if (this.currentOperand === '') {
      this.currentOperand = '-' + this.currentOperand;
    }
  }

  chooseOperation(operation) {
    if (this.currentOperand === '') return;
    if (this.previousOperand !== '') {
      this.compute();
    }
    this.previousOperand = this.currentOperand.toString() + operation;
    this.currentOperand = '';
    this.operation = operation;
  }

  chooseScienceOperation(scienceOperation) {
    if (this.currentOperand === '') return;
    if (this.previousOperand !== '') {
      this.compute();
    }

    this.previousOperand = scienceOperation + this.currentOperand.toString();
    this.currentOperand = '';
    this.operation = scienceOperation;
    this.scienceCompute();
  }

  absolute() {
    if (this.currentOperand.startsWith('-')) {
      this.currentOperand = this.currentOperand.substring(1);
    }
  }

  scienceCompute() {
    let scienceComputation;
    const sciencePrev = this.previousOperand.match(/\d+/g);
    switch (this.operation) {
      case 'sin':
        if (sciencePrev[0] === '180' || sciencePrev[0] === '360') {
          scienceComputation = 0;
        } else {
          scienceComputation = Math.sin(sciencePrev[0] * (Math.PI / 180));
        }
        break;
      case 'cos':
        if (sciencePrev[0] === '90') {
          scienceComputation = 0;
        } else {
          scienceComputation = Math.cos(sciencePrev[0] * (Math.PI / 180));
        }
        break;

      case '√':
        scienceComputation = Math.sqrt(sciencePrev[0]);
        break;
      default:
        return;
    }
    if (scienceComputation != undefined) {
      this.currentOperand = scienceComputation;
      this.operation = undefined;
      this.previousOperandTextElement.innerText = '';
    }
  }

  compute() {
    if (this.currentOperand === '') return;
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    switch (this.operation) {
      case '+':
        computation = prev + current;
        break;
      case '-':
        computation = prev - current;
        break;
      case '*':
        computation = prev * current;
        break;
      case '/':
        computation = prev / current;
        break;

      default:
        return;
    }
    if (computation != undefined) {
      this.currentOperand = computation;
      this.previousOperand = '';
      this.operation = undefined;
      this.previousOperandTextElement.innerText = '';
    }
  }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const scienceOperationButtons = document.querySelectorAll(
  '[data-science-operation]'
);
const negativeNumberButton = document.querySelector('[data-negative-number]');
const allClearButton = document.querySelector('[data-all-clear]');
const deleteButton = document.querySelector('[data-delete]');
const equalButton = document.querySelector('[data-equal]');
const absoluteButton = document.querySelector('[data-absolute]');
const previousOperandTextElement = document.querySelector(
  '[data-previous-operand]'
);
const currentOperandTextElement = document.querySelector(
  '[data-current-operand]'
);

const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
);

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operationButtons.forEach(operation => {
  operation.addEventListener('click', () => {
    calculator.chooseOperation(operation.innerText);
    calculator.updateDisplay();
  });
});

scienceOperationButtons.forEach(scienceOperation => {
  scienceOperation.addEventListener('click', () => {
    calculator.chooseScienceOperation(scienceOperation.innerText);
    calculator.updateDisplay();
  });
});

negativeNumberButton.addEventListener('click', () => {
  calculator.negative();
  calculator.updateDisplay();
});

equalButton.addEventListener('click', () => {
  calculator.scienceCompute();
  calculator.compute();
  calculator.updateDisplay();
});

allClearButton.addEventListener('click', () => {
  calculator.allClearButton();
  calculator.updateDisplay();
});

absoluteButton.addEventListener('click', () => {
  calculator.absolute();
  calculator.updateDisplay();
});

deleteButton.addEventListener('click', () => {
  calculator.delete();
  calculator.updateDisplay();
});
