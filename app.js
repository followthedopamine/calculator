const app = document.getElementById("app");
const container = app.appendChild(document.createElement("div"));
let buttons = [
  [0, ".", "abs", "+", "="],
  [1, 2, 3, "-", "1/x"],
  [4, 5, 6, "*", "%"],
  [7, 8, 9, "/", "sqrt"],
  ["pl", "pl", "pl", "ce", "c"],
];

buttons = buttons.reverse();

const display = document.createElement("div");
const displaySmall = document.createElement("div");
const displayLarge = document.createElement("div");
display.classList.add("display");
//displaySmall.classList.add("display-small");
displayLarge.classList.add("display-large");
displayLarge.innerHTML = "0";
//displaySmall.innerHTML = "&nbsp;";
display.appendChild(displaySmall);
display.appendChild(displayLarge);
container.appendChild(display);

const addNum = (value, numToAdd) => {
  return value * 10 + parseFloat(numToAdd);
};

let reset = false;
let stored = 0;

const clickHandler = (event) => {
  const target = event.target.outerText;
  const input = parseFloat(displayLarge.innerHTML);
  let solved = 0;

  switch (target) {
    case "0":
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
      if (reset) {
        stored = input;
        displayLarge.innerHTML = addNum(0, target);
        reset = false;
      } else {
        displayLarge.innerHTML = addNum(input, target);
      }
      break;
    case "+":
      reset = true;
      solved = stored + input;
      displayLarge.innerHTML = solved;
      break;
  }
};

for (let r = 0; r < buttons.length; r++) {
  const row = document.createElement("div");
  for (let c = 0; c < buttons[0].length; c++) {
    const button = buttons[r][c];
    const element = document.createElement("button");
    element.innerHTML = button;
    if (typeof button === "number") {
      element.classList.add("number");
    } else if (button === "ce" || button === "c") {
      element.classList.add("clear");
    } else {
      element.classList.add("symbol");
    }
    element.addEventListener("click", clickHandler);
    row.appendChild(element);
  }
  container.appendChild(row);
}
