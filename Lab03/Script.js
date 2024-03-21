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
let recordingMode = false;

document.addEventListener("keypress", function (ev) {
  if (!recordingMode) {
    const key = ev.key;
    const sound = sounds[key];
    if (sound) {
      sound.currentTime = 0;
      sound.play();
    }
  }
});

document.querySelector("#start1").addEventListener("click", function () {
  stopClicked = false;
  recordingMode = true;
  console.log("Recording started for #1");
  Save(1);
});

document.querySelector("#start2").addEventListener("click", function () {
  stopClicked = false;
  recordingMode = true;
  console.log("Recording started for #1");
  Save(2);
});

document.querySelector("#start3").addEventListener("click", function () {
  stopClicked = false;
  recordingMode = true;
  console.log("Recording started for #1");
  Save(3);
});

document.querySelector("#start4").addEventListener("click", function () {
  stopClicked = false;
  recordingMode = true;
  console.log("Recording started for #1");
  Save(4);
});

const recordings = {
  1: [],
  2: [],
  3: [],
  4: [],
};

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

function Save(i) {
  const stopButton = document.querySelector("#stop" + i);

  stopButton.addEventListener("click", function () {
    stopClicked = true;
    recordingMode = false;
    console.log("Recording stopped for #" + i);
    console.log("Recording data:", recordings[i]);
  });

  document.addEventListener("keypress", function (ev) {
    if (!stopClicked) {
      const key = ev.key;
      const sound = sounds[key];
      if (sound) {
        sound.currentTime = 0;
        sound.play();
      }
      recordings[i].push(key);
      console.log("Key pressed: " + key + " for #" + i);
    }
  });
}
