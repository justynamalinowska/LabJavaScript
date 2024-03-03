const przeliczbtn = document.querySelector("#przelicz");
przeliczbtn.addEventListener("click", licz);
const dodajpolebtn = document.querySelector("#dodajPole");
dodajpolebtn.addEventListener("click", dodajPole);
val1.addEventListener("input", licz);
val2.addEventListener("input", licz);
val3.addEventListener("input", licz);
let numbers = document.querySelector("#numbers");

let counter = 3;

function licz() {
  let sum = 0;
  let avg = 0;
  let min = Infinity;
  let max = -Infinity;

  let childNumber = numbers.childElementCount;

  for (let i = 1; i <= childNumber; i++) {
    const input = document.querySelector("#val" + i);
    if (input.value == "" && i > 3) {
      numbers.removeChild(input);
      counter--;
    } else {
      const inputVal = parseFloat(input.value);
      sum += inputVal;
      if (inputVal < min) min = inputVal;
      if (inputVal > max) max = inputVal;
    }
    avg = sum / counter;
  }

  document.querySelector("#sum").value = sum;
  document.querySelector("#avg").value = avg;
  document.querySelector("#min").value = min;
  document.querySelector("#max").value = max;
}

function dodajPole() {
  counter++;
  let input = document.createElement("input");
  input.id = "val" + counter;
  input.type = "number";
  input.placeholder = "Liczba " + counter;

  numbers.appendChild(input);
  input.addEventListener("input", licz);
}
