const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: '#87CEEB',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 600 },
      debug: false
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

let ambulance;
let cursors;
let moveLeft = false;
let moveRight = false;
let jump = false;

const game = new Phaser.Game(config);

function preload() {
  this.load.image('ambulance', 'assets/ambulance.png');
  this.load.image('ground', 'https://labs.phaser.io/assets/sprites/platform.png');
}

function create() {
  // Ambulancia con física
  ambulance = this.physics.add.sprite(100, config.height - 200, 'ambulance');
  ambulance.setBounce(0.1);
  ambulance.setCollideWorldBounds(true);
  ambulance.setScale(0.05);

  // Suelo gris
  const ground = this.physics.add.staticImage(config.width / 2, config.height - 40, 'ground');
  ground.setScale(1.5).refreshBody();
  this.physics.add.collider(ambulance, ground);

  // Controles de teclado
  cursors = this.input.keyboard.createCursorKeys();

  // Botones táctiles
  document.getElementById('left').addEventListener('touchstart', () => moveLeft = true);
  document.getElementById('left').addEventListener('touchend', () => moveLeft = false);

  document.getElementById('right').addEventListener('touchstart', () => moveRight = true);
  document.getElementById('right').addEventListener('touchend', () => moveRight = false);

  document.getElementById('up').addEventListener('touchstart', () => jump = true);
  document.getElementById('up').addEventListener('touchend', () => jump = false);
}

function update() {
  if (cursors.left.isDown || moveLeft) {
    ambulance.setVelocityX(-160);
  } else if (cursors.right.isDown || moveRight) {
    ambulance.setVelocityX(160);
  } else {
    ambulance.setVelocityX(0);
  }

  if ((cursors.up.isDown || jump) && ambulance.body.touching.down) {
    ambulance.setVelocityY(-350);
  }
}


