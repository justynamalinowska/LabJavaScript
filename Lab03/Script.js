// const boom = document.querySelector("#s1");
// const clap = document.querySelector("#s2");
// const hihat = document.querySelector("#s3");
// const kick = document.querySelector("#s4");
// const openhat = document.querySelector("#s5");
// const ride = document.querySelector("#s6");
// const snare = document.querySelector("#s7");
// const tink = document.querySelector("#s8");
// const tom = document.querySelector("#s9");

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
let recordingMode = false;
let pauzaClicked = false;
let looperClicked = false;
let metronomClicked = false;
let currentRecording;

const recordings = [[], [], [], []];

document.querySelector("#looper").addEventListener("click", function () {
  looperClicked = !looperClicked;
});

document.querySelector("#metronom").addEventListener("click", function () {
  metronomClicked = !metronomClicked;
});

for (let i = 1; i < 5; i++) {
  createCanal(i);
}

document.addEventListener("keypress", function (ev) {
  if (!recordingMode) {
    const key = ev.key;
    const sound = sounds[key];
    if (sound) {
      sound.currentTime = 0;
      sound.play();
    }
  } else if (!stopClicked && recordingMode) {
    const key = ev.key;
    const sound = sounds[key];
    if (sound) {
      sound.currentTime = 0;
      sound.play();
    }
    recordings[currentRecording - 1].push(key);
    console.log("Key pressed: " + key + " for #" + currentRecording);
  }
});

let numberOfCanals = 4;
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
  body.insertBefore(div, document.querySelector("script"));
  const p = document.createElement("p");

  p.innerText = "Canal " + i;
  p.id = "c" + i;

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

  div.append(p);
  div.append(b1);
  div.append(b2);
  div.append(b3);
  div.append(b4);
  div.append(b5);
  div.append(b6);
}

function startRecording(i) {
  stopClicked = false;
  recordingMode = true;
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
    recordingMode = false;
    console.log("Recording stopped for #" + i);
    console.log("Recording data:", recordings[i - 1]);
  });

  playButton.addEventListener("click", function () {
    playRecording(i);
  });
}

function playRecording(i) {
  console.log("Playing recording #" + i);
  let index = 0;
  if (metronomClicked) {
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
