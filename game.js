// Main Game Configuration
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var player;
var cursors;
var bullets;
var enemies;
var score = 0;
var scoreText;

var game = new Phaser.Game(config);

function preload() {
    this.load.image('sky', 'https://example.com/sky.png'); // Replace with actual image
    this.load.image('corgi', 'https://example.com/corgi.png'); // Replace with actual image
    this.load.image('bullet', 'https://example.com/bullet.png'); // Replace with actual image
    this.load.image('enemy', 'https://example.com/enemy.png'); // Replace with actual image
}

function create() {
    // Background
    this.add.image(400, 300, 'sky');
    
    // Create Corgi player
    player = this.physics.add.sprite(400, 500, 'corgi');
    player.setCollideWorldBounds(true);
    
    // Create bullets
    bullets = this.physics.add.group({
        defaultKey: 'bullet',
        maxSize: 10
    });
    
    // Create enemies
    enemies = this.physics.add.group();

    // Spawn enemies periodically
    this.time.addEvent({
        delay: 1000,
        callback: spawnEnemy,
        callbackScope: this,
        loop: true
    });
    
    // Score display
    scoreText = this.add.text(16, 16, 'Score: 0', {
        fontSize: '32px',
        fill: '#fff'
    });
    
    // Controls
    cursors = this.input.keyboard.createCursorKeys();
}

function update() {
    // Player movement
    if (cursors.left.isDown) {
        player.x -= 3;
    }
    else if (cursors.right.isDown) {
        player.x += 3;
    }

    // Shoot bullets
    if (cursors.space.isDown) {
        shootBullet();
    }

    // Check for bullet collision with enemies
    this.physics.world.collide(bullets, enemies, hitEnemy, null, this);
}

function shootBullet() {
    // Check if there’s space for a new bullet
    var bullet = bullets.get(player.x, player.y - 20);
    
    if (bullet) {
        bullet.setActive(true);
        bullet.setVisible(true);
        bullet.body.velocity.y = -300;
    }
}

function spawnEnemy() {
    var enemy = enemies.create(Phaser.Math.Between(50, 750), 0, 'enemy');
    enemy.setVelocityY(Phaser.Math.Between(50, 150));
}

function hitEnemy(bullet, enemy) {
    bullet.setActive(false);
    bullet.setVisible(false);
    enemy.setActive(false);
    enemy.setVisible(false);
    
    // Update score
    score += 10;
    scoreText.setText('Score: ' + score);
}
