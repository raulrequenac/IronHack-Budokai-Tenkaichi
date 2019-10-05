class Raul extends Fighter {
  constructor(ctx, addListener) {
    super(ctx, addListener);

    this.img.src = "images/raul.png";

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
  }
}