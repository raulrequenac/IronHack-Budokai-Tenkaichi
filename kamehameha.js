class Kamehameha {
  constructor(ctx, x, y, fighter, rival) {
    this.ctx = ctx;
    this.x0 = x;
    this.x = this.x0;
    this.y = y;
    this.fighter = fighter;
    this.rival = rival;

    this.w1 = 104;
    this.w2 = 2080;
    this.wTotal = 0;
    this.h = 64;
    this.vx = 10;
    this.kamehamehaStrength = 10;

    this.imgStart = new Image();
    this.imgMed = new Image();
    this.imgEnd = new Image();
    this.imgMed.src = "images/kamehameha-medium.png";

    this.hit = false;
    this.lookingRight = this.fighter.lookingRight();

    this.counter = 0;

    this.explosionAudio = new Audio("audio/explosion.mp3");

    this.isPrinting = true;
  }

  draw() {
    let kamehamehaCollission = this.rival.kamehamehas.some(k =>  this._collission(k));
    if (this._collission(this.rival) && !this.hit) {
      this.explosionAudio.currentTime = 0;
      this.explosionAudio.play();
      this.rival.receiveDamage(this.kamehamehaStrength);
      this.hit = true;
    } else if (kamehamehaCollission && !this.hit) {
      this.explosionAudio.currentTime = 0;
      this.explosionAudio.play();
      this.hit = true;
    }else if (this.lookingRight && !this.hit) {
      this.imgStart.src = "images/kamehameha-start-right.png";
      this.imgEnd.src = "images/kamehameha-end-right.png";
      if (this.counter <= 5) {
        this.ctx.drawImage(this.imgStart, this.x, this.y, this.w1, this.h);
        this.ctx.drawImage(
          this.imgMed,
          this.x + this.w1,
          this.y,
          this.w1 * this.counter,
          this.h
        );
        this.ctx.drawImage(
          this.imgEnd,
          this.x + this.w1 * (1 + this.counter),
          this.y,
          this.w1,
          this.h
        );
        this.counter += 0.1;
        this.wTotal = this.w1 * (2 + this.counter);
      } else {
        this.hit = true;
      }
    } else if (!this.lookingRight && !this.hit) {
      this.imgStart.src = "images/kamehameha-start-left.png";
      this.imgEnd.src = "images/kamehameha-end-left.png";
      if (this.counter <= 5) {
        this.x = this.x0 - this.w1 * (2 + this.counter);
        this.ctx.drawImage(
          this.imgStart, 
          this.x + this.w1 * (1 + this.counter), 
          this.y, 
          this.w1, 
          this.h
        );
        this.ctx.drawImage(
          this.imgMed,
          this.x + this.w1,
          this.y,
          this.w1 * this.counter,
          this.h
        );
        this.ctx.drawImage(
          this.imgEnd,
          this.x,
          this.y,
          this.w1,
          this.h
        );
        this.counter += 0.1;
        this.wTotal = this.w1 * (2 + this.counter);
      } else {
        this.hit = true;
      }
    } else {
      this.isPrinting = false;
    }
  }

  move() {}

  _collission(obj) {
    const w = this.wTotal;
    let objW = obj.w;
    if (obj instanceof Kamehameha) {
      objW = obj.wTotal;
    }

    const colX = this.x + w >= obj.x && this.x <= obj.x + objW;
    const colY = this.y + this.h >= obj.y && this.y <= obj.y + obj.h;

    return colX && colY;
  }
}