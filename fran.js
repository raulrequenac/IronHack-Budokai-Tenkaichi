class Fran extends Fighter {
  constructor(ctx) {
    super(ctx);

    this.x = 0.9 * this.ctx.canvas.width - this.w;

    this.img.src = "images/fran.png";

    this.keyLeft = 37;
    this.keychargeKi = 38;
    this.keyProtect = 40;
    this.keyRight = 39;
    this.keyEnergyBlast = 32;
    this.keyKamehameha = 32;
    this.keyPunch = 32;
    this.keyKick = 32;

    this.ki1Id = "ki1-fran";
    this.ki2Id = "ki2-fran";
  }

  receiveDamage(damage) {
    super.receiveDamage(damage);
  }

  chargeKi(num) {
    this.ki += num;
  }

  getHealth() {
    return this.health;
  }

  getStrength() {
    return this.strength;
  }

  getKi() {
    return this.ki;
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
    super.draw();
  }

  move() {
    super.move();
  }
}