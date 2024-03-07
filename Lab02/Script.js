const imgArray = new Array();

const buttons = document.querySelector(".buttons");

for (let i = 0; i < 5; i++) {
  imgArray[i] = new Image();
  imgArray[i].src = "Images/slajd" + i + ".jpeg";
  const b = document.createElement("button");
  b.id = "b" + i;
  b.innerText = i;
  //b.addEventListener("click", setSlide(i));
  buttons.insertBefore(b, document.querySelector("#next"));
}

//setTimeout(), setInterval()

// setTimeout(() => {
//   console.log("Ouc");
//   const box = document.querySelector("#slider-inner");
//   box.style.transform = "transalte(100px, 0px)";
// }, 2_000);

// let positionX = 0;
// setInterval(() => {
//   const box = document.querySelector("#slider-inner");
//   box.style.transform = `transalte(${positionX}px, 0px)`;
// }, 16);

// setTimeout(() => {
//   clearInterval(anim);
// }, 6_000);

setSlide(i);
{
}
