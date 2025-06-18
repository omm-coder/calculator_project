let invalid = document.querySelector("#invalid");
let button_numbers = document.querySelectorAll("[data-number]");
let operations = document.querySelectorAll("[data-sign]");
let equal = document.querySelector("[data-equal]");
let delet = document.querySelector("[data-delete]");
let clear = document.querySelector("[data-clear-all]");
let input = document.querySelector("#box-entry");
let result = document.querySelector("#result");

function clearAll() {
  input.value = "";
  result.textContent = "0";
  result.style.opacity = "0.23";
}
function deleteLast() {
  return (input.value = input.value.slice(0, -1));
}

function showInvalid() {
  setTimeout(() => (invalid.style.opacity = "1"), 100);
  setTimeout(() => (invalid.style.opacity = "0"), 800);
}

function getNumber(number) {
  if (input.value === result.textContent) {
    input.value = number;
    result.style.opacity = "0.23";
  }
  else if(input.value.includes('.')&& number === '.') {
    let signs = ['+', '-', '/', '*'];
    for(let sign of signs) {
     if(input.value.endsWith(sign)) input.value += number;
    }
    return
  }
  else input.value += number;
  input.style.color = 'black';
}

function getOperation(sign) {
  input.style.color = 'black';
  result.style.opacity = "0.23";
  input.value += sign === "÷" ? "/" : sign;

}
function setInput(value) {
  input.style.color = 'rgba(0,0,0,0.4)';
  input.value = value;
}
function calculate(value) {
  result.textContent = eval(value);
  result.style.opacity = "1";
  setInput(result.textContent);
  // input.value = result.textContent;
}

button_numbers.forEach((button) => {
  button.addEventListener("click", () => {
    getNumber(button.innerText);
  });
});

operations.forEach((operand) => {
  operand.addEventListener("click", () => {
    if (input.value !== "") {
      if (
        input.value.endsWith("+") ||
        input.value.endsWith("-") ||
        input.value.endsWith("*") ||
        input.value.endsWith("/") ||
        input.value.endsWith("%")
      ) {
        let newStr = input.value;
        input.value = newStr.slice(0, -1);
        getOperation(operand.innerText);
      }else if (input.value.endsWith(".")) return;
      else getOperation(operand.innerText)

    } else {
      showInvalid()
      return;
    }

  });
});

equal.addEventListener("click", () => {
  if (
        input.value.endsWith("+") ||
        input.value.endsWith("-") ||
        input.value.endsWith("*") ||
        input.value.endsWith("/") ||
        input.value.endsWith("%") ) 
  {
   showInvalid()
  }
  else calculate(input.value);
});

clear.addEventListener("click", clearAll);
delet.addEventListener("click", deleteLast);
