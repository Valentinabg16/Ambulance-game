class Chapter1Scene extends Phaser.Scene {
  constructor() {
    super('Chapter1');
  }

  preload() {
    this.load.image('ambulance', 'assets/ambulance.png');
    this.load.image('brainF', 'assets/brain_frontal.png');
    this.load.image('ground', 'https://labs.phaser.io/assets/sprites/platform.png');
  }

  create() {
    const ground = this.physics.add.staticImage(window.innerWidth / 2, window.innerHeight - 40, 'ground');
    ground.setScale(1.5).refreshBody();

    this.ambulance = this.physics.add.sprite(100, window.innerHeight - 200, 'ambulance');
    this.ambulance.setBounce(0.1);
    this.ambulance.setCollideWorldBounds(true);
    this.ambulance.setScale(0.05);

    this.brainFrontal = this.physics.add.sprite(400, window.innerHeight - 220, 'brainF');
    this.brainFrontal.setScale(0.05);
    this.brainFrontal.setImmovable(true);
    this.brainFrontal.body.allowGravity = false;


    this.physics.add.collider(this.ambulance, ground);
    this.physics.add.overlap(this.ambulance, this.brainFrontal, this.repairFrontal, null, this);

    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    if (this.cursors.left.isDown) {
      this.ambulance.setVelocityX(-160);
    } else if (this.cursors.right.isDown) {
      this.ambulance.setVelocityX(160);
    } else {
      this.ambulance.setVelocityX(0);
    }

    if (this.cursors.up.isDown && this.ambulance.body.touching.down) {
      this.ambulance.setVelocityY(-350);
    }
  }

  repairFrontal(player, organ) {
    const distance = Phaser.Math.Distance.Between(player.x, player.y, organ.x, organ.y);
    if (distance > 100) return;  // 🚫 Evita colisión si están lejos
    
    organ.disableBody(true, true);
    
    const text = this.add.text(20, 20, 'Frontal lobe: Responsible for decision-making and motor control.', {
        fontSize: '18px',
        fill: '#000',
        backgroundColor: '#fff',
        padding: { x: 8, y: 4 },
        wordWrap: { width: 300 }
    });
    
    this.time.delayedCall(4000, () => {
        text.destroy();
    });
  }
}



