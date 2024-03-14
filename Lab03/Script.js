const clap = document.querySelector("#s1");
const kick = document.querySelector("#s2");

const sounds = {
  a: document.querySelector("#s1"),
  s: document.querySelector("#s2"),
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
