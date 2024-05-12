//checkboxy do wybrania kanalow ktore maja grac
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

const body = document.querySelector("body");

let stopClicked = false;
let pauzaClicked = false;
let isMetronomActive = false;
let isLooperActive = false;
let currentRecording;

const recordings = [[], [], [], []];

document.querySelector("#metronom").addEventListener("click", function () {
  isMetronomActive = !isMetronomActive;
});

for (let i = 1; i < 2; i++) {
  createCanal(i);
}

document.addEventListener("keypress", function (ev) {
  const key = ev.key;
  const sound = sounds[key];
  if (sound) {
    sound.currentTime = 0;
    sound.play();
  }
  if (!stopClicked) {
    recordings[currentRecording - 1].push(key);
    console.log("Key pressed: " + key + " for #" + currentRecording);
  }
});

let numberOfCanals = 1;
document.querySelector("#add").addEventListener("click", function () {
  numberOfCanals++;
  createCanal(numberOfCanals);
});

function deleteCantal(i) {
  document.querySelector("#canal" + i).remove();
}

function createCanal(i) {
  recordings.push([]);
  const div = document.createElement("div");
  div.id = "canal" + i;
  document.querySelector("#canals").appendChild(div);
  const p = document.createElement("p");
  div.appendChild(p);

  p.innerText = "Canal " + i;
  p.id = "c" + i;

  const checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  checkbox.id = "checkbox" + i;

  const b1 = document.createElement("button");
  b1.id = "play" + i;
  b1.innerText = "Play";

  const b2 = document.createElement("button");
  b2.id = "pauza" + i;
  b2.innerText = "Pauza";
  b2.addEventListener("click", function () {
    pauzaClicked = !pauzaClicked;
  });

  const b3 = document.createElement("button");
  b3.id = "clear" + i;
  b3.innerText = "Clear";
  b3.addEventListener("click", function () {
    clearRecording(i);
  });

  const b4 = document.createElement("button");
  b4.id = "start" + i;
  b4.innerText = "Start recording";
  b4.addEventListener("click", function () {
    if (recordings[i - 1].length != 0) clearRecording(i);
    startRecording(i);
  });

  const b5 = document.createElement("button");
  b5.id = "stop" + i;
  b5.innerText = "Stop recording";

  const b6 = document.createElement("button");
  b6.id = "delete" + i;
  b6.innerText = "Delete Canal";
  b6.addEventListener("click", function () {
    deleteCantal(i);
  });

  div.append(p, checkbox, b1, b2, b3, b4, b5, b6);
}

function startRecording(i) {
  stopClicked = false;
  currentRecording = i;
  console.log("Recording started for #" + i);
  Save(i);
}

function clearRecording(i) {
  recordings[i - 1] = [];
  console.log("Deleted data:", recordings[i - 1]);
}

function Save(i) {
  const stopButton = document.querySelector("#stop" + i);
  const playButton = document.querySelector("#play" + i);

  stopButton.addEventListener("click", function () {
    stopClicked = true;
    // isRecording = false;
    console.log("Recording stopped for #" + i);
    console.log("Recording data:", recordings[i - 1]);
  });

  playButton.addEventListener("click", function () {
    playRecording(i);
  });
}

async function playRecording(i) {
  console.log("Playing recording #" + i);
  let index = 0;
  if (isMetronomActive) {
    const interval = setInterval(function () {
      document.querySelector("#s4").currentTime = 0;
      document.querySelector("#s4").play();
    }, 200);

    for (const key of recordings[i - 1]) {
      setTimeout(() => {
        const sound = sounds[key];
        if (sound) {
          sound.currentTime = 0;
          sound.play();
        }
      }, index * 300);
      index++;
    }
    // Zatrzymywanie intervalu po zakończeniu odtwarzania nagrania
    setTimeout(() => {
      clearInterval(interval);
    }, index * 300); // Czas trwania nagrania
  } else {
    for (const key of recordings[i - 1]) {
      setTimeout(() => {
        const sound = sounds[key];
        if (sound) {
          sound.currentTime = 0;
          sound.play();
        }
      }, index * 300);
      index++;
    }
  }
}
let intervalId;

document.querySelector("#looper").addEventListener("click", function () {
  isLooperActive = !isLooperActive;
  if (isLooperActive) startLooping();
  else stopLooping();
});

function startLooping() {
  stopLooping();

  intervalId = setInterval(async function () {
    let promises = [];
    for (let i = 1; i <= numberOfCanals; i++) {
      const checkbox = document.querySelector("#checkbox" + i);
      if (checkbox.checked) {
        promises.push(playRecording(i));
      }
    }
    await Promise.all(promises);
  }, 800);
}

function stopLooping() {
  clearInterval(intervalId);
}
