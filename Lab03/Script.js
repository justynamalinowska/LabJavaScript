const boom = document.querySelector("#s1");
const clap = document.querySelector("#s2");
const hihat = document.querySelector("#s3");
const kick = document.querySelector("#s4");
const openhat = document.querySelector("#s5");
const ride = document.querySelector("#s6");
const snare = document.querySelector("#s7");
const tink = document.querySelector("#s8");
const tom = document.querySelector("#s9");

let stopClicked = false;

for (let i = 1; i < 5; i++) {
  document.querySelector("#start" + i).addEventListener("click", function () {
    Save(i);
  });
}

const recording1 = [];
const recording2 = [];
const recording3 = [];
const recording4 = [];

const sounds = {
  a: document.querySelector("#s1"),
  s: document.querySelector("#s2"),
  w: document.querySelector("#s3"),
  d: document.querySelector("#s4"),
  q: document.querySelector("#s5"),
  e: document.querySelector("#s6"),
  z: document.querySelector("#s7"),
  x: document.querySelector("#s8"),
  c: document.querySelector("#s9"),
};

document.addEventListener("keypress", (ev) => {
  const key = ev.key;
  //   switch (key) {
  //     case "a":
  //       clap.currentTime = 0;
  //       clap.play();
  //       break;

  //     case "b":
  //       kick.currentTime = 0;
  //       kick.play();
  //       break;
  //   }
  const sound = sounds[key]; //tablica asocjacyjna
  sound.currentTime = 0;
  sound.play();
});

function Save(i) {
  switch (i) {
    case 1:
      document
        .querySelector("#stop" + i)
        .addEventListener("click", function () {
          stopClicked = true;
        });
      while (!stopClicked) {
        recording1.push();
      }
      break;
    case 2:
      break;

    case 3:
      break;

    case 4:
      break;

    default:
      break;
  }
}
