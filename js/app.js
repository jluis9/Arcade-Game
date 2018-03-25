var Enemy = function() {
    this.bEnemy = [-150, 900];
    this.cEnemy = [60, 140, 220];
    this.speedRange = [150, 700];

    this.sprite = 'images/enemy-bug.png';

    this.reset();
};

Enemy.prototype.reset = function() {
    var startPos = this.bEnemy[0];

    this.x = startPos;
    this.y = this.getRandomY();
    this.speed = this.getRandomSpeed();
};

Enemy.prototype.update = function(dt) {
    var maxPos = this.bEnemy[1];
    this.x += this.speed * dt;

    if (this.x > maxPos) {
        this.reset();
    }
};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.getRandomY = function() {
    return this.cEnemy[Math.floor(Math.random() * this.cEnemy.length)];
};

Enemy.prototype.getRandomSpeed = function() {
    var minSpeed = this.speedRange[0],
        maxSpeed = this.speedRange[1];

    return Math.floor(Math.random() * (maxSpeed - minSpeed)) + minSpeed;
};


var Player = function() {
    this.bEnemy = [-2, 402];
    this.yRange = [-20, 380];
    this.sprite = 'images/char-boy.png';
    this.reset();
    alert('Ready');
};

Player.prototype.update = function() {
    this.checkCollisions();
};

Player.prototype.checkCollisions = function() {
    if (this.y == -20) {
        this.reset();
    } else if (this.y >= 60 && this.y <= 220) {
        var self = this;

        allEnemies.forEach(function(enemy) {

            if (enemy.y == self.y) {
                if (enemy.x >= player.x - 30 && enemy.x <= player.x + 30) {
                    self.reset();
                }
            }
        });
    }
};

Player.prototype.reset = function() {
    this.x = 200;
    this.y = 380;
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
    if (key == 'left') {
        this.x -= (this.x - 101 < this.bEnemy[0]) ? 0 : 101;
    } else if (key == 'right') {
        this.x += (this.x + 101 > this.bEnemy[1]) ? 0 : 101;
    } else if (key == 'up') {
        this.y -= (this.y - 80 < this.yRange[0]) ? 0 : 80;
    } else if (key == 'down') {
        this.y += (this.y + 80 > this.yRange[1]) ? 0 : 80;
    }
};

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

var jose = new Enemy();
var karthik = new Enemy();
var abhijit = new Enemy();
var chaitanya = new Enemy();
var allEnemies = [jose, karthik, abhijit, chaitanya];

var player = new Player();

function modify_qty(val) {
    var qty = document.getElementById('qty').value;
    var new_qty = parseInt(qty, 10) + val;

    if (new_qty < 0) {
        new_qty = 0;
    }

    document.getElementById('qty').value = new_qty;
    return new_qty;
}