//pobierz diva
// const wyniki = document.querySelector('.wyniki').innerText = input1;

//reagowanie na klikniecie
const przeliczbtn = document.querySelector("#przelicz");
przeliczbtn.addEventListener("click", licz);
val1.addEventListener("input", licz);
val2.addEventListener("input", licz);
val3.addEventListener("input", licz);
val4.addEventListener("input", licz);

function licz() {
  const input1 = parseInt(document.querySelector("#val1").value);
  const input2 = parseInt(document.querySelector("#val2").value);
  const input3 = parseInt(document.querySelector("#val3").value);
  const input4 = parseInt(document.querySelector("#val4").value);

  const sum = input1 + input2 + input3 + input4;
  const avg = sum / 4;
  const min = Math.min(input1, input2, input3, input4);
  const max = Math.max(input1, input2, input3, input4);

  document.getElementById("sum").value = sum;
  document.getElementById("avg").value = avg;
  document.getElementById("min").value = min;
  document.getElementById("max").value = max;
}
