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
    if ((this._collissionRight() || this._collissionLeft()) && !this.hit) {
      this.rival.receiveDamage(this.energyBlastStrength);
      this.hit = true;
    } else if (this.lookingRight && !this._collissionRight()) {
      this.img.src = "images/energyBlast-right.png";
      this.ctx.imageSmoothingEnabled = false;
      this.ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
      if (this._collissionLeft()) {
        this.hit = true;
      }
    } else if (!this.lookingRight && !this._collissionLeft()) {
      this.img.src = "images/energyBlast-left.png";
      this.ctx.imageSmoothingEnabled = false;
      this.ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
      if (this._collissionRight()) {
        this.hit = true;
      }
    }
  }

  move() {
    if (this.fighter.lookingRight()) {
      this.x += this.vx;
    } else {
      this.x -= this.vx;
    }
  }

  _collissionY() {
    return (this.y <= this.rival.y &&
        this.y + this.h >= this.rival.y) ||
      (this.y <= this.rival.y + this.rival.h &&
        this.y + this.h >= this.rival.y + this.rival.h) ||
      (this.y >= this.rival.y &&
        this.y + this.h <= this.rival.y + this.rival.h);
  }

  _collissionRight() {
    return this.x + this.w >= this.rival.x &&
      this._collissionY();
  }

  _collissionLeft() {
    return this.x <= this.rival.x + this.rival.w &&
      this._collissionY();
  }
}