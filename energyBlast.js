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
    this.explosionAudio = new Audio("audio/explosion.mp3");

    this.isPrinting = true;
  }

  draw() {
    const energyBlastCollission = this.rival.energyBlasts.some(eb => this._collission(eb));
    if (this._collission(this.rival) && !this.hit) {
      this.explosionAudio.currentTime = 0;
      this.explosionAudio.play();
      this.rival.receiveDamage(this.energyBlastStrength);
      this.hit = true;
    } else if (energyBlastCollission && !this.hit) {
      this.explosionAudio.currentTime = 0;
      this.explosionAudio.play();
      this.hit = true;
    } else if (this.lookingRight && !this.hit) {
      this.img.src = "images/energyBlast-right.png";
      this.ctx.imageSmoothingEnabled = false;
      this.ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
    } else if (!this.lookingRight && !this.hit) {
      this.img.src = "images/energyBlast-left.png";
      this.ctx.imageSmoothingEnabled = false;
      this.ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
    } else {
      this.isPrinting = false;
    }
  }

  move() {
    if (this.fighter.lookingRight()) {
      this.x += this.vx;
    } else {
      this.x -= this.vx;
    }
  }

  _collission(obj) {
    const colX = this.x + this.w >= obj.x && this.x <= obj.x + obj.w;
    const colY = this.y + this.h >= obj.y && this.y <= obj.y + obj.h;

    return colX && colY;
  }
}