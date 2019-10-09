class EnergyBlast {
  constructor(ctx, x, y, fighter, rival) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.fighter = fighter;
    this.rival = rival;
    
    this.w = 104;
    this.h = 64;
    this.vx = 10;
    this.energyBlastStrength = 7;

    this.img = new Image();
    this.hit = false;
    this.lookingRight = this.fighter.lookingRight();
  }

  draw() {
    this.ctx.beginPath();
    if (this._collission() && !this.hit) {
      this.rival.receiveDamage(this.energyBlastStrength);
      this.hit = true;
    } else if (this.lookingRight && !this.hit) {
      this.img.src = "images/energyBlast-right.png";
      this.ctx.imageSmoothingEnabled = false;
      this.ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
    } else if (!this.lookingRight && !this.hit) {
      this.img.src = "images/energyBlast-left.png";
      this.ctx.imageSmoothingEnabled = false;
      this.ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
    }
  }

  move() {
    if (this.fighter.lookingRight()) {
      this.x += this.vx;
    } else {
      this.x -= this.vx;
    }
  }

_collission() {
  const r = this.rival;

  const colX = this.x + this.w >= r.x && this.x <= r.x + r.w;
  const colY = this.y + this.h >= r.y && this.y <= r.y + r.h;

  return colX && colY;
}
}