class Kamehameha {
  constructor(ctx, x, y, fighter, rival) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.fighter = fighter;
    this.rival = rival;

    this.w = 104;
    this.h = 64;
    this.vx = 10;
    this.kamehamehaStrength = 10;

    this.imgStart = new Image();
    this.imgMed = new Image();
    this.imgEnd = new Image();
    this.imgMed.src = "images/kamehameha-medium.png";

    this.hit = false;
    this.lookingRight = this.fighter.lookingRight();

    this.kamehameha = [];
    this.counter = 0;
    this.tick = 1;

    this.explosionAudio = new Audio("audio/explosion.mp3");
  }

  draw() {
    if (this._collission() && !this.hit) {
      this.kamehameha = [];
      this.explosionAudio.currentTime = 0;
      this.explosionAudio.play();
      this.rival.receiveDamage(this.kamehamehaStrength);
      this.hit = true;
    } else if (this.lookingRight && !this.hit) {
      this.imgStart.src = "images/kamehameha-start-right.png";
      this.imgEnd.src = "images/kamehameha-end-right.png";
      if (this.counter <= 20) {
        this.ctx.drawImage(this.imgStart, this.x, this.y, this.w, this.h);
        this.ctx.drawImage(
          this.imgMed,
          0,
          0,
          this.w,
          this.h,
          this.x + this.w,
          this.y,
          this.w,
          this.h
        );
        this.ctx.drawImage(
          this.imgEnd,
          this.x + this.w + this.w,
          this.y,
          this.w,
          this.h
        );

        this.counter++;
      } else {
        this.hit = true;
      }
    } else if (!this.lookingRight && !this.hit) {
      this.imgStart.src = "images/kamehameha-start-left.png";
      this.imgEnd.src = "images/kamehameha-end-left.png";
      if (this.counter <= 20) {
        this.kamehameha.push(this.imgStart);
        this.kamehameha.push(this.imgEnd);
        this.kamehameha = [
          this.kamehameha[0],
          this.imgMed,
          ...this.kamehameha.slice(1)
        ];

        if (this.counter % this.tick === 0) {
          this.kamehameha.forEach((image, i) => {
            this.ctx.imageSmoothingEnabled = false;
            this.ctx.drawImage(image, this.x - this.w * (i + 1), this.y, this.w, this.h);
            this.counter++;
          });
        }
        this.kamehameha = [];
      }
    }
  }

  move() {}

  _collission() {
    const w = this.kamehameha.length * this.w;
    const r = this.rival;

    const colX = this.x + w >= r.x && this.x <= r.x + r.w;
    const colY = this.y + this.h >= r.y && this.y <= r.y + r.h;

    return colX && colY;
  }
}