const currentEl = document.getElementById("current");
const historyEl = document.getElementById("history");
const opButtons = document.querySelectorAll("[data-op]");

const symbols = { "+": "+", "-": "−", "*": "×", "/": "÷" };

let current = "0";
let previous = null;
let operator = null;
let resetNext = false;

function format(value) {
  if (value === "Error") return value;
  const [int, dec] = value.split(".");
  const intFormatted = Number(int).toLocaleString("id-ID");
  return dec !== undefined ? `${intFormatted},${dec}` : intFormatted;
}

function render() {
  currentEl.textContent = current === "Error" || current === "-" ? current : format(current);
  historyEl.textContent = operator ? `${format(previous)} ${symbols[operator]}` : "";
  opButtons.forEach((btn) => btn.classList.toggle("active", btn.dataset.op === operator && resetNext));
}

function compute(a, b, op) {
  const x = parseFloat(a);
  const y = parseFloat(b);
  let result;
  switch (op) {
    case "+": result = x + y; break;
    case "-": result = x - y; break;
    case "*": result = x * y; break;
    case "/":
      if (y === 0) return "Error";
      result = x / y;
      break;
  }
  // Round to avoid floating point noise like 0.1 + 0.2 = 0.30000000000000004
  return String(parseFloat(result.toPrecision(12)));
}

function inputNumber(n) {
  if (current === "Error" || resetNext) {
    current = n;
    resetNext = false;
  } else if (current.replace(/[-.]/g, "").length < 15) {
    current = current === "0" ? n : current + n;
  }
}

function inputDecimal() {
  if (current === "Error" || resetNext) {
    current = "0.";
    resetNext = false;
  } else if (!current.includes(".")) {
    current += ".";
  }
}

function chooseOperator(op) {
  if (current === "Error") return;
  if (operator && !resetNext) {
    current = compute(previous, current, operator);
    if (current === "Error") {
      previous = null;
      operator = null;
      return;
    }
  }
  previous = current;
  operator = op;
  resetNext = true;
}

function equals() {
  if (!operator || current === "Error") return;
  const expr = `${format(previous)} ${symbols[operator]} ${format(current)} =`;
  current = compute(previous, current, operator);
  previous = null;
  operator = null;
  resetNext = true;
  render();
  historyEl.textContent = expr;
}

function clearAll() {
  current = "0";
  previous = null;
  operator = null;
  resetNext = false;
}

function deleteLast() {
  if (current === "Error" || resetNext) {
    current = "0";
    resetNext = false;
    return;
  }
  current = current.length > 1 ? current.slice(0, -1) : "0";
  if (current === "-") current = "0";
}

function percent() {
  if (current === "Error") return;
  current = String(parseFloat((parseFloat(current) / 100).toPrecision(12)));
}

document.querySelector(".keys").addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;

  if (btn.dataset.num) inputNumber(btn.dataset.num);
  else if (btn.dataset.op) chooseOperator(btn.dataset.op);
  else {
    switch (btn.dataset.action) {
      case "decimal": inputDecimal(); break;
      case "clear": clearAll(); break;
      case "delete": deleteLast(); break;
      case "percent": percent(); break;
      case "equals": equals(); return;
    }
  }
  render();
});

// Keyboard support
document.addEventListener("keydown", (e) => {
  const k = e.key;
  if (/^[0-9]$/.test(k)) inputNumber(k);
  else if (k === "." || k === ",") inputDecimal();
  else if (["+", "-", "*", "/"].includes(k)) { e.preventDefault(); chooseOperator(k); }
  else if (k === "Enter" || k === "=") { e.preventDefault(); equals(); return; }
  else if (k === "Backspace") deleteLast();
  else if (k === "Escape") clearAll();
  else if (k === "%") percent();
  else return;
  render();
});

render();
