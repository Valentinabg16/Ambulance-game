class MenuScene extends Phaser.Scene {
  constructor() {
    super('Menu');
  }

  create() {
    const centerX = this.cameras.main.width / 2;
    const centerY = this.cameras.main.height / 2;

    this.add.text(centerX, centerY - 100, '🚑 Brain Rescue', {
      fontSize: '32px',
      fill: '#ffffff'
    }).setOrigin(0.5);

    const startButton = this.add.text(centerX, centerY, 'Start Game', {
      fontSize: '24px',
      fill: '#00ff00',
      backgroundColor: '#000',
      padding: { x: 10, y: 5 }
    }).setOrigin(0.5).setInteractive();

    const howToPlay = this.add.text(centerX, centerY + 60, 'How to Play', {
      fontSize: '20px',
      fill: '#ffffff',
      underline: true
    }).setOrigin(0.5).setInteractive();

    startButton.on('pointerdown', () => {
      this.scene.start('Chapter1');
    });

    howToPlay.on('pointerdown', () => {
      this.scene.start('HowToPlay');
    });

    this.cameras.main.setBackgroundColor('#1a1a1a');
  }
}
