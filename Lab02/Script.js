const imgArray = [];

let number = 0;
let intervalId;
let timeId;

const previous = document.querySelector("#previous");
const next = document.querySelector("#next");
const sliderInner = document.getElementById("slider-inner");

const lightbox = document.createElement("div");
lightbox.id = "lightbox";
document.body.appendChild(lightbox);
const images = document.querySelectorAll("img");

images.forEach((image) => {
  image.addEventListener("click", () => {
    lightbox.classList.add("active");
    const img = document.createElement("img");
    img.src = image.src;
    while (lightbox.firstChild) {
      lightbox.removeChild(lightbox.firstChild);
    }
    lightbox.appendChild(img);
    clearInterval(intervalId);
  });
});

lightbox.addEventListener("click", (e) => {
  if (e.target != e.currentTarget) return;
  lightbox.classList.remove("active");
  intervalId = setInterval(ChangeSlide, 4000);
});

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

intervalId = setInterval(ChangeSlide, 4000);

function SetSlide(i) {
  if (i > imgArray.length - 1) number = 0;
  else if (i < 0) number = 4;
  else number = i;

  sliderInner.style.transform = `translateX(${
    -sliderInner.clientWidth * number
  }px)`;

  clearTimeout(timeId); //zmienic nazwe
  for (let j = 0; j < 5; j++) {
    document.querySelector("#b" + j)?.classList.remove("highlighted");
  }

  document.querySelector("#b" + number).classList.add("highlighted");
}

function ChangeSlide() {
  number++;
  SetSlide(number);
}
