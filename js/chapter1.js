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
    // Create ground platform
    const ground = this.physics.add.staticImage(window.innerWidth / 2, window.innerHeight - 40, 'ground');
    ground.setScale(3).refreshBody();

    // Create ambulance sprite
    this.ambulance = this.physics.add.sprite(100, window.innerHeight - 200, 'ambulance');
    this.ambulance.setBounce(0.1);
    this.ambulance.setCollideWorldBounds(true);
    this.ambulance.setScale(0.05);
    this.ambulance.body.setSize(this.ambulance.width, this.ambulance.height, true);

    // Create brain frontal sprite
    this.brainFrontal = this.physics.add.sprite(600, window.innerHeight - 250, 'brainF');
    this.brainFrontal.setScale(0.05);
    this.brainFrontal.setImmovable(true);
    this.brainFrontal.body.allowGravity = false;

    // Add collisions and overlap logic
    this.physics.add.collider(this.ambulance, ground);
    this.physics.add.overlap(this.ambulance, this.brainFrontal, this.repairFrontal, null, this);

    // Keyboard input
    this.cursors = this.input.keyboard.createCursorKeys();

    // Touch input flags
    this.leftPressed = false;
    this.rightPressed = false;
    this.upPressed = false;

    // Touch button listeners
    const leftBtn = document.getElementById('left');
    const rightBtn = document.getElementById('right');
    const upBtn = document.getElementById('up');

    if (leftBtn && rightBtn && upBtn) {
      leftBtn.addEventListener('touchstart', () => this.leftPressed = true);
      leftBtn.addEventListener('touchend', () => this.leftPressed = false);

      rightBtn.addEventListener('touchstart', () => this.rightPressed = true);
      rightBtn.addEventListener('touchend', () => this.rightPressed = false);

      upBtn.addEventListener('touchstart', () => this.upPressed = true);
      upBtn.addEventListener('touchend', () => this.upPressed = false);
    }
  }

  update() {
    const onGround = this.ambulance.body.blocked.down || this.ambulance.body.touching.down;

    // Handle movement (keyboard + touch)
    if (this.cursors.left.isDown || this.leftPressed) {
      this.ambulance.setVelocityX(-160);
    } else if (this.cursors.right.isDown || this.rightPressed) {
      this.ambulance.setVelocityX(160);
    } else {
      this.ambulance.setVelocityX(0);
    }

    if ((this.cursors.up.isDown || this.upPressed) && onGround) {
      this.ambulance.setVelocityY(-350);
    }
  }

  repairFrontal(player, organ) {
    const distance = Phaser.Math.Distance.Between(player.x, player.y, organ.x, organ.y);
    if (distance > 100) return;

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



