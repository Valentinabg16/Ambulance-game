class HowToPlayScene extends Phaser.Scene {
  constructor() {
    super('HowToPlay');
  }

  create() {
    const centerX = this.cameras.main.width / 2;
    const centerY = this.cameras.main.height / 2;

    this.add.text(centerX, 80, 'How to Play', {
      fontSize: '28px',
      fill: '#ffffff'
    }).setOrigin(0.5);

    this.add.text(centerX, centerY - 40, 'Use the arrow keys to move and jump.\nJump to touch the brain parts\nand repair them.', {
      fontSize: '18px',
      fill: '#ffffff',
      align: 'center',
      wordWrap: { width: 300 }
    }).setOrigin(0.5);

    const backButton = this.add.text(centerX, centerY + 100, '← Back to Menu', {
      fontSize: '20px',
      fill: '#00ffff'
    }).setOrigin(0.5).setInteractive();

    backButton.on('pointerdown', () => {
      this.scene.start('Menu');
    });

    this.cameras.main.setBackgroundColor('#000000');
  }
}

