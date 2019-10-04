class Fighter {
  constructor(ctx) {
    this.ctx = ctx;

    this.x = 0.1 * this.ctx.canvas.width;
    this.h = 300;
    this.y0 = this.ctx.canvas.height - this.h;
    this.y = this.y0;
    this.w = 127;
    this.vx = 0;
    this.vy = 0;
    this.ay = 0;

    this.health = 100;
    this.attack = 5;
    this.energyBlast = 7;
    this.kamehameha = 10;
    this.ki = 0;
    this.protected = false;

    this.img = new Image();

    this.keyLeft = 32;
    this.keychargeKi = 32;
    this.keyProtect = 32;
    this.keyRight = 32;
    this.keyEnergyBlast = 32;
    this.keyKamehameha = 32;
    this.keyPunch = 32;
    this.keyKick = 32;

    this.ki1Id = "";
    this.ki2Id = "";

    this._setListeners();
  }

  receiveDamage(damage) {
    if (this.protected) {
      damage /= 2;
    }
    this.health -= damage;
  }

  getHealth() {
    return this.health;
  }

  getKi() {
    return this.ki;
  }

  chargeKi() {
    this.ki += 5;
  }

  energyBlast() {
    return this.energyBlast;
  }

  kamehameha() {
    return this.kamehameha;
  }

  attack() {
    return this.attack;
  }

  draw() {
    this.ctx.imageSmoothingEnabled = false;
    this.ctx.drawImage(
      this.img,
      this.x,
      this.y,
      this.w,
      this.h
    );
  }

  move() {
    this.x += this.vx;

    if (this.x < 0) {
      this.x = 0;
    } else if (this.x > this.ctx.canvas.width - this.w) {
      this.x = this.ctx.canvas.width - this.w;
    }
  }

  _setListeners() {
    document.addEventListener("keydown", key => {
      switch (key.keyCode) {
        case this.keyLeft:
          this.vx = -5;
          break;
        case this.keychargeKi:
          this.chargeKi();
          break;
        case this.keyProtect:
          this.protected = true;
          break;
        case this.keyRight:
          this.vx = 5;
          break;
        case this.keyEnergyBlast:
          //this.energyBlast();
          break;
        case this.keyKamehameha:
          this.kamehameha();
          break;
        case this.keyPunch:
          this.attack();
          break;
        case this.keyKick:
          this.attack();
          break;
      }
    });

    document.addEventListener("keyup", key => {
      switch (key.keyCode) {
        case this.keyLeft:
          this.vx = 0;
          break;
        case this.keyProtect:
          this.protected = false;
          break;
        case this.keyRight:
          this.vx = 0;
          break;
        case this.keyEnergyBlast:
          break;
        case this.keyKamehameha:
          break;
        case this.keyPunch:
          break;
        case this.keyKick:
          break;
      }
    });
  }
}