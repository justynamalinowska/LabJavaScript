const imgArray = [];

let number = 0;
let intervalId;

const previous = document.querySelector("#previous");
const next = document.querySelector("#next");
const sliderInner = document.getElementById("slider-inner");

previous.addEventListener("click", () => SetSlide(number - 1));
next.addEventListener("click", () => SetSlide(number + 1));

document.addEventListener("DOMContentLoaded", function () {
  for (let i = 0; i < 5; i++) {
    imgArray[i] = document.createElement("img");
    imgArray[i].src = "Images/slajd" + i + ".jpeg";

    document
      .getElementById("b" + i)
      .addEventListener("click", () => SetSlide(i));
  }

  SetSlide(0);
});

let positionX = 0;

function SetSlide(i) {
  if (i > imgArray.length - 1) number = 0;
  else if (i < 0) number = 4;
  else number = i;

  sliderInner.style.transform = `translateX(${
    -sliderInner.clientWidth * number
  }px)`;

  clearInterval(intervalId);
  intervalId = setInterval(ChangeSlide, 4000);
}

function ChangeSlide() {
  number++;
  SetSlide(number);
}
