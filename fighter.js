const MAX_WIDTH_KI1 = 285;
const MAX_WIDTH_KI2 = 201;
const MAX_WIDTH_HEALTH = 361;

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
    this.ki = 0;
    this.rival = null;
    this.protected = false;
    this.canAttack = true;

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
    this.healthId = "";

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

    this.collision = false;
    this.isDown = false;
    this.isChargingKi = false;
    this.hasJumped = false;

    this.energyBlasts = [];
    this.kamehamehas = [];

    this.chargeKiAudio = new Audio("audio/charge-ki.mp3");
    this.punchAudio = new Audio("audio/punch.mp3");
    this.kickAudio = new Audio("audio/kick.mp3");
    this.protectAudio = new Audio("audio/protect.mp3");
    this.energyBlastAudio = new Audio("audio/energy-blast.mp3");
    this.kamehamehaAudio = new Audio("audio/kamehameha.mp3");
    this.jumpAudio = new Audio("audio/jump.mp3");
    this.landingAudio = new Audio("audio/landing.mp3");
    this.missedAudio = new Audio("audio/missed.mp3");
  }

  setRival(rival) {
    this.rival = rival;
  }

  draw() {
    this.ctx.imageSmoothingEnabled = false;
    this.ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
    this.energyBlasts.forEach(eb => eb.draw());
    this.kamehamehas.forEach(k => k.draw());
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

    if (this.y0 === this.floor - this.h && this.y === this.y0 && this.hasJumped) {
      this.landingAudio.currentTime = 0;
      this.landingAudio.play();
      this.hasJumped = false;
    }

    this._playActions();
    this.energyBlasts.forEach(eb => eb.move());
    this.kamehamehas.forEach(k => k.move());
  }

  receiveDamage(damage) {
    if (this.protected) {
      damage /= 2;
    }
    this.health -= damage;
    if (this.health <= 0) {
      this.health = 0;
    }
    this._setHealth();
  }

  lookingRight() {
    return this.x + this.w / 2 < this.rival.x + this.rival.w / 2;
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

  _setHealth() {
    const pxHealth = Math.floor((this.health * MAX_WIDTH_HEALTH) / 100);
    document.getElementById(this.healthId).style.width = `${pxHealth}px`;
  }

  _chargeKi() {
    this.ki += 0.3;
    if (this.ki > 100) {
      this.ki = 100;
    }
    this._setKi();
  }

  _energyBlast() {
    this.energyBlastAudio.currentTime = 0;
    this.energyBlastAudio.play();

    this.ki -= 30;
    this._setKi();

    if (this.lookingRight()) {
      this.energyBlasts.push(new EnergyBlast(ctx, this.x + this.w, this.y + this.h / 2, this, this.rival));
    } else {
      this.energyBlasts.push(new EnergyBlast(ctx, this.x, this.y + this.h / 2, this, this.rival));
    }
  }

  _kamehameha() {
    this.kamehamehaAudio.currentTime = 0;
    this.kamehamehaAudio.play();

    this.ki -= 60;
    this._setKi();

    if (this.lookingRight()) {
      this.kamehamehas.push(new Kamehameha(ctx, this.x + this.w, this.y + this.h / 2, this, this.rival));
    } else {
      this.kamehamehas.push(new Kamehameha(ctx, this.x, this.y + this.h / 2, this, this.rival));
    }

    this.rival.receiveDamage(this.kamehamehaStrength);
  }

  _punch() {
    if (this.collision) {
      if (!this.rival.protected) {
        this.punchAudio.currentTime = 0;
        this.punchAudio.play();
      } else {
        this.protectAudio.currentTime = 0;
        this.protectAudio.play();
      }

      this.rival.receiveDamage(this.attackStrength);
    } else {
      this.missedAudio.currentTime = 0;
      this.missedAudio.play();
    }
  }

  _kick() {
    if (this.collision) {
      if (!this.rival.protected) {
        this.kickAudio.currentTime = 0;
        this.kickAudio.play();
      } else {
        this.protectAudio.currentTime = 0;
        this.protectAudio.play();
      }

      this.rival.receiveDamage(this.attackStrength);
    } else {
      this.missedAudio.currentTime = 0;
      this.missedAudio.play();
    }
  }

  _attackAvailable(fn, delay) {
    if (this.canAttack) {
      this.canAttack = false;
      fn();
      setTimeout(() => (this.canAttack = true), delay);
    }
  }

  _isJumping() {
    return this.y < this.y0;
  }

  _setListeners() {
    this.addListener("onkeydown", e => this._switchAction(e.keyCode, true));
    this.addListener("onkeyup", e => this._switchAction(e.keyCode, false));
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

  _playActions() {
    if (
      this.actions.jump &&
      !this._isJumping() &&
      !this.isDown &&
      !this.isChargingKi
    ) {
      this.jumpAudio.currentTime = 0;
      this.jumpAudio.play();
      this.y -= 10;
      this.vy -= 20;
      this.hasJumped = true;
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
      this.chargeKiAudio.play();
      this._chargeKi();
    } else {
      this.chargeKiAudio.pause();
      this.chargeKiAudio.currentTime = 0;
      this.isChargingKi = false;
    }

    if (this.actions.protect && !this.isChargingKi) {
      this.protected = true;
    } else {
      this.protected = false;
    }

    if (this.actions.energyBlast && this.ki >= 30 && !this.isChargingKi) {
      this._attackAvailable(this._energyBlast.bind(this), 500);
    }

    if (this.actions.kamehameha && this.ki >= 60 && !this.isChargingKi) {
      this._attackAvailable(this._kamehameha.bind(this), 3000);
    }

    if (this.actions.punch && !this.isChargingKi) {
      this._attackAvailable(this._punch.bind(this), 500);
    }

    if (this.actions.kick && !this.isChargingKi) {
      this._attackAvailable(this._kick.bind(this), 500);
    }
  }

  collideRival() {
    let colYUp = this.y <= this.rival.y && this.y + this.h >= this.rival.y;
    let colYDown =
      this.y <= this.rival.y + this.rival.h && this.y + this.h >= this.rival.y + this.rival.h;
    let colY = colYUp || colYDown;

    let colXLeft = this.x + this.w >= this.rival.x + this.rival.w &&
      this.x <= this.rival.x + this.rival.w;
    let colXRight = this.x + this.w >= this.rival.x && this.x <= this.rival.x;
    let colX = colXLeft || colXRight;

    if (this.actions.right && colXRight && colY && this.y > this.rival.y - this.h) {
      this.actions.right = false;
      this.vx = 0;
      this.x = this.rival.x - this.w;
    } else if (
      this.actions.left &&
      colXLeft &&
      colY &&
      this.y > this.rival.y - this.h
    ) {
      this.actions.left = false;
      this.vx = 0;
      this.x = this.rival.x + this.rival.w;
    }

    if (this.y <= this.rival.y - this.h && colX) {
      this.y0 = this.rival.y - this.h;
    } else if (!colX) {
      this.y0 = this.floor - this.h;
    }

    this.isDown = colYDown && colX;
    this.collision = colY && colX;
  }
}