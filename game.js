class Game {
  constructor(ctx) {
    this.ctx = ctx;

    this.raul = new Raul(ctx);
    this.fran = new Fran(ctx);

    this.intervalID = null;

    this.audio = new Audio("audio/fight.mp3");
    this.audio.loop = true;

    this.gameOverAudio = new Audio("");
  }

  run() {
    this.audio.play();

    this.intervalId = setInterval(() => {
      this._clear();
      this._draw();
      this._move();
      //      this._checkCollisions();
    }, 1000 / 60);
  }

  _draw() {
    this.raul.draw();
    this.fran.draw();
  }

  _move() {
    this.raul.move();
    this.fran.move();
  }

  _clear() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }
}