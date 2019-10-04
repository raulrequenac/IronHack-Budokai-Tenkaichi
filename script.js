const canvas = document.getElementById("my-canvas");
const ctx = canvas.getContext("2d");

const game = new Game(ctx);

let start = true;
document.addEventListener("keypress", () => {
  if (start) {
    document.querySelector("audio").muted = true;
    new Audio("audio/start-game.ogg").play();

    setTimeout(() => {
      canvas.classList.remove("none");
      document.getElementById("status-bar").classList.remove("none");
      document.getElementById("bars").classList.remove("none");
      document.getElementById("start").classList.add("none");
      game.run();
    }, 2000);

    start = false;
  }
});

document.addEventListener(
  "click",
  () => document.querySelector("audio").play()
);