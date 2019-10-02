const canvas = document.getElementById("my-canvas");
const ctx = canvas.getContext("2d");

const game = new Game(ctx);

document.addEventListener("keypress", () => {
  canvas.classList.toggle("none");
  document.getElementById("start").classList.toggle("none");

  game.run();
});

setTimeout(() => document.querySelector("audio").play(), 500);
