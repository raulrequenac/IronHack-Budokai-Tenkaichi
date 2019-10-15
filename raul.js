class Raul extends Fighter {
  constructor(ctx, addListener) {
    super(ctx, addListener);

    this.moveLeft = "images/raul-fly-back-right.png";
    this.moveRight = "images/raul-fly-forward-right.png";
    this.stand = "images/raul-right.png";
    this.img.src = this.stand;
    this.img.src = "images/raul-right.png";

    this.keyJump = 87;
    this.keyLeft = 65;
    this.keychargeKi = 67;
    this.keyProtect = 83;
    this.keyRight = 68;
    this.keyEnergyBlast = 90;
    this.keyKamehameha = 88;
    this.keyPunch = 81;
    this.keyKick = 69;

    this.ki1Id = "ki1-raul";
    this.ki2Id = "ki2-raul";
    this.healthId = "health-raul";
  }

  draw() {
    if (this.lookingRight()) {
      this.img.src = "images/raul-right.png";
    } else {
      this.img.src = "images/raul-left.png";
    }

    super.draw();
  }
}