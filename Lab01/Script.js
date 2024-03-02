const przeliczbtn = document.querySelector("#przelicz");
przeliczbtn.addEventListener("click", licz);
const dodajpolebtn = document.querySelector("#dodajPole");
dodajpolebtn.addEventListener("click", dodajPole);
// val1.addEventListener("input", licz);
// val2.addEventListener("input", licz);
// val3.addEventListener("input", licz);
let numbers = document.querySelector("#numbers");

let i = 3;

function licz() {
  let sum = 0;
  let avg = 0;
  let min = Infinity;
  let max = -Infinity;

  for (let j = 1; j <= (numbers.childElementCount - 1) / 2; j++) {
    const input = document.querySelector("#val" + j);
    // console.log(i);
    if (input.value == "" || isNaN(input.value)) {
      numbers.removeChild(input);
      numbers.removeChild(document.querySelector("#l" + j));
      i = i - 1;
    } else {
      const inputVal = parseFloat(input.value);
      input.addEventListener("input", licz);
      sum += inputVal;
      avg = sum / i;
      if (inputVal < min) min = inputVal;
      if (inputVal > max) max = inputVal;
    }
  }

  document.querySelector("#sum").value = sum;
  document.querySelector("#avg").value = avg;
  document.querySelector("#min").value = min;
  document.querySelector("#max").value = max;
}

function dodajPole() {
  i = i + 1;
  let input = document.createElement("input");
  input.id = "val" + i;
  input.type = "number";

  let label = document.createElement("label");
  label.innerHTML = "Liczba " + i + ":";
  label.id = "l" + i;

  numbers.insertBefore(label, numbers.lastElementChild);
  numbers.insertBefore(input, numbers.lastElementChild);

  //efElem.insertAdjacentElement(position, newElem)
  // numbers.insertAdjacentElement("beforeend", label);
  // numbers.insertAdjacentElement("beforeend", input);
}
