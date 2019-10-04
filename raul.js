class Raul extends Fighter {
  constructor(ctx) {
    super(ctx);

    this.img.src = "images/raul.png";

    this.keyLeft = 65;
    this.keychargeKi = 87;
    this.keyProtect = 83;
    this.keyRight = 68;
    this.keyEnergyBlast = 32;
    this.keyKamehameha = 32;
    this.keyPunch = 32;
    this.keyKick = 32;

    this.ki1Id = "ki1-raul";
    this.ki2Id = "ki2-raul";
  }

  receiveDamage(damage) {
    super.receiveDamage(damage);
  }

  chargeKi() {
    super.chargeKi();
  }

  getHealth() {
    return super.getHealth();
  }

  getStrength() {
    return super.getStrength;
  }

  getKi() {
    return super.getKi;
  }

  energyBlast() {
    return super.energyBlast();
  }

  kamehameha() {
    return super.kamehameha();
  }

  attack() {
    return super.attack();
  }

  draw() {
    super.draw();
  }

  move() {
    super.move();
  }
}