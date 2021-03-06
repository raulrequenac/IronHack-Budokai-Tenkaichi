class Fran extends Fighter {
  constructor(ctx, addListener) {
    super(ctx, addListener);

    this.x = 0.9 * this.ctx.canvas.width - this.w;

    this.moveLeft = "";
    this.moveRight = "";
    this.stand = "images/fran-left.png";
    this.img.src = this.stand;

    this.keyJump = 38;
    this.keyLeft = 37;
    this.keychargeKi = 16;
    this.keyProtect = 40;
    this.keyRight = 39;
    this.keyEnergyBlast = 219;
    this.keyKamehameha = 187;
    this.keyPunch = 222;
    this.keyKick = 191;

    this.ki1Id = "ki1-fran";
    this.ki2Id = "ki2-fran";
    this.healthId = "health-fran";
  }

  draw() {
    if (this.lookingRight()) {
      this.img.src = "images/fran-right.png";
    } else {
      this.img.src = "images/fran-left.png";
    }

    super.draw();
  }
}