const MAX_WIDTH_KI1 = 285;
const MAX_WIDTH_KI2 = 201;

class Fighter {
  constructor(ctx, addListener) {
    this.ctx = ctx;
    this.addListener = addListener;

    this.x = 0.1 * this.ctx.canvas.width;
    this.h = 200;
    this.floor = this.ctx.canvas.height;
    this.y0 = this.floor - this.h;
    this.y = this.y0;
    this.w = 84;
    this.vx = 0;
    this.vy = 0;
    this.ay = 0.8;

    this.health = 100;
    this.attackStrength = 5;
    this.energyBlastStrength = 7;
    this.kamehamehaStrength = 10;
    this.ki = 0;
    this.protected = false;
    this.blast = true;

    this.img = new Image();

    this.keyJump = 32;
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

    this.actions = {
      jump: false,
      left: false,
      chargeKi: false,
      protect: false,
      right: false,
      energyBlast: false,
      kamehameha: false,
      punch: false,
      kick: false
    };

    this._setListeners();

    this.collisionX = false;
    this.isDown = false;
    this.isChargingKi = false;
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

  _setKi() {
    const pxKi1 = Math.floor((this.ki * MAX_WIDTH_KI1) / 60);
    const pxKi2 = Math.floor(((this.ki - 60) * MAX_WIDTH_KI2) / 40);
    if (this.ki <= 60) {
      document.getElementById(this.ki1Id).style.width = `${pxKi1}px`;
      document.getElementById(this.ki2Id).style.width = `${0}px`;
    } else {
      document.getElementById(this.ki1Id).style.width = `${MAX_WIDTH_KI1}px`;
      document.getElementById(this.ki2Id).style.width = `${pxKi2}px`;
    }
  }

  chargeKi() {
    this.ki += 0.3;
    if (this.ki > 100) {
      this.ki = 100;
    }
    this._setKi();
  }

  energyBlast() {
    this.ki -= 30;
    this._setKi();

    return this.energyBlastStrength;
  }

  kamehameha() {
    this.ki -= 60;
    this._setKi();

    return this.kamehamehaStrength;
  }

  attack() {
    return this.attackStrength;
  }

  draw() {
    this.ctx.imageSmoothingEnabled = false;
    this.ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
  }

  direction(rival) {
    if (this.x + (this.w / 2) > rival.x + rival.w / 2) {}
  }

  move() {
    this.x += this.vx;

    if (this.x < 0) {
      this.x = 0;
    } else if (this.x > this.ctx.canvas.width - this.w) {
      this.x = this.ctx.canvas.width - this.w;
    }

    if (this._isJumping()) {
      this.vy += this.ay;
      this.y += this.vy;
      if (this.y <= 200) {
        this.vy = 0;
      }
    } else {
      this.y = this.y0;
      this.vy = 0;
    }

    this._playActions();
  }

  _setListeners() {
    this.addListener('onkeydown', e => this._switchAction(e.keyCode, true));
    this.addListener('onkeyup', e => this._switchAction(e.keyCode, false));
  }

  _switchAction(key, apply) {
    switch (key) {
      case this.keyJump:
        this.actions.jump = apply;
        break;
      case this.keyLeft:
        this.actions.left = apply;
        break;
      case this.keychargeKi:
        this.actions.chargeKi = apply;
        break;
      case this.keyProtect:
        this.actions.protect = apply;
        break;
      case this.keyRight:
        this.actions.right = apply;
        break;
      case this.keyEnergyBlast:
        this.actions.energyBlast = apply;
        break;
      case this.keyKamehameha:
        this.actions.kamehameha = apply;
        break;
      case this.keyPunch:
        this.actions.punch = apply;
        break;
      case this.keyKick:
        this.actions.kick = apply;
        break;
    }
  }

  _isJumping() {
    return this.y < this.y0;
  }

  _playActions() {
    if (this.actions.jump && !this._isJumping() && !this.isDown && !this.isChargingKi) {
      this.y -= 10;
      this.vy -= 20;
    }

    if (this.actions.left && !this.isChargingKi) {
      this.vx = -5;
    } else if (this.actions.right && !this.isChargingKi) {
      this.vx = 5;
    } else {
      this.vx = 0;
    }

    if (this.actions.chargeKi) {
      this.isChargingKi = true;
      this.chargeKi();
    } else {
      this.isChargingKi = false;
    }

    if (this.actions.protect && !this.isChargingKi) {
      this.protected = true;
    } else {
      this.protected = false;
    }

    if (this.actions.energyBlast && this.ki >= 30 && !this.isChargingKi) {
      this._blastAvailable(this.energyBlast.bind(this));
    }

    if (this.actions.kamehameha && this.ki >= 60 && !this.isChargingKi) {
      this._blastAvailable(this.kamehameha.bind(this));
    }

    if (this.actions.punch || this.actions.kick && !this.isChargingKi) {
      this.attack();
    }
  }

  _blastAvailable(fn) {
    if (this.blast) {
      this.blast = false;
      fn();
      setTimeout(() => this.blast = true, 1000);
    }
  }

  collideRival(rival) {
    let colYUp = this.y <= rival.y &&
      this.y + this.h >= rival.y;
    let colYDown = this.y <= rival.y + rival.h &&
      this.y + this.h >= rival.y + rival.h;
    let colY = colYUp || colYDown;

    let colXLeft = this.x + this.w > rival.x + rival.w &&
      this.x < rival.x + rival.w;
    let colXRight = this.x + this.w > rival.x &&
      this.x < rival.x;
    let colX = colXLeft || colXRight;

    if (this.actions.right && colXRight && colY && this.y > rival.y - this.h) {
      this.actions.right = false;
      this.x = rival.x - this.w;
    } else if (this.actions.left && colXLeft && colY && this.y > rival.y - this.h) {
      this.actions.left = false;
      this.x = rival.x + rival.w;
    }

    if (this.y <= rival.y - this.h && colX) {
      this.y0 = rival.y - this.h;

    } else if (!colX) {
      this.y0 = this.floor - this.h;
    }

    this.isDown = colYDown && colX;
  }


}