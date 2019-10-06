class EnergyBlast {
  constructor(ctx, x, y, fighter) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.fighter = fighter;

    this.vx = 10;
    this.r = 5;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.closePath();
  }

  move() {
    if (this.fighter.lookingRight()) {
      this.x += this.vx;
    } else {
      this.x -= this.vx;
    }
  }
}