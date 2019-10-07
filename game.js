class Game {
  constructor(ctx) {
    this.ctx = ctx;


    this.intervalID = null;

    this.audio = new Audio("audio/fight.mp3");
    this.audio.loop = true;

    this.gameOverAudio = new Audio("");

    this.onkeyDownListeners = [];
    this.onkeyUpListeners = [];

    this.raul = new Raul(ctx, this._addListener.bind(this));
    this.fran = new Fran(ctx, this._addListener.bind(this));
    this.raul.setRival(this.fran);
    this.fran.setRival(this.raul);
  }

  run() {
    this.audio.play();

    this.intervalId = setInterval(() => {
      this._clear();
      this._draw();
      this._move();
      this._checkCollisions();

      if (this.raul.health === 0) {
        this._gameOver(this.raul);
      } else if (this.fran.health === 0) {
        this._gameOver(this.fran);
      }
    }, 1000 / 60);
  }

  _clear() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }

  _draw() {
    this.raul.draw();
    this.fran.draw();
  }

  _move() {
    this.raul.move();
    this.fran.move();
  }

  _checkCollisions() {
    this.raul.collideRival();
    this.fran.collideRival();
  }

  _addListener(name, fn) {
    if (name === 'onkeydown') {
      this.onkeyDownListeners.push(fn);
    } else if (name === 'onkeyup') {
      this.onkeyUpListeners.push(fn);
    }

    this._setListeners();
  }

  _setListeners() {
    document.onkeydown = e => this.onkeyDownListeners.forEach(fn => fn(e));
    document.onkeyup = e => this.onkeyUpListeners.forEach(fn => fn(e));
  }

  _gameOver() {
    this.audio.pause();
    clearInterval(this.intervalId);

    this.ctx.font = "40px Comic Sans MS";
    this.ctx.textAlign = "center";
    this.ctx.fillText(
      "GAME OVER",
      this.ctx.canvas.width / 2,
      this.ctx.canvas.height / 2
    );
  }
}