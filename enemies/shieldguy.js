function ShieldGuy(stage, basicCollision, x, y) {

	var printerGuySpriteSheet = new createjs.SpriteSheet({
		"images": [loader.getResult("shieldguy")],
		"frames": {
			"width": 26, "height": 25, "count": 2
		},
		"animations": {
			"sit": {
				"frames" : [0],
				"next" : "sit"
			},
			"shoot" : {
				"frames" : [1],
				"next" : "shoot"
			}
		}
	}); // new createjs.Bitmap("images/businessmanspritesheet.png");

	this.basicCollision   = basicCollision;
	this.damage	          = 2;
	this.health           = 4;
	this.stage            = stage;
	this.animations       = new createjs.Sprite(printerGuySpriteSheet, "sit");
	this.x                = x;
	this.y                = y;
	this.activated        = false;
	this.jumping          = false;
	this.jumpspeed        = 0;
	this.dead             = false;
	this.shootTicks       = 0;
	this.hardshell        = true;
	this.dead             = false;
	this.watchedElements  = [];

	this.animations.play();
	this.stage.addChild(this.animations);

	this.tickActions = function(actions) {
		this.watchedElements.forEach(function(element) {
			element.tickActions(actions);
		});

		if (this.dead) {
			return;
		}

		if (this.health <= 0 && this.activated) {
			mapper.itemDrop(this.x, this.y);
			var explosion = explosionSprite.clone(true);
			score += 25 * scoreModifier;
			explosion.x = this.animations.x;
			explosion.y = this.animations.y;
			this.stage.removeChild(this.animations);
			explosion.gotoAndPlay("explode");
			this.stage.addChild(explosion);
			setTimeout(function() {
				this.stage.removeChild(explosion);
			}.bind(this), 250);
			this.dead = true;
			return;
		}

		if (this.shootTicks > 0) {
			this.shootTicks--;
		}

		if (player.x < this.x && this.animations.scaleX !== 1) {
			this.animations.scaleX = 1;
			this.animations.regX = 0;
		} else if (player.x > this.x && this.animations.scaleX !== -1) {
			this.animations.scaleX = -1;
			this.animations.regX = this.animations.spriteSheet._frameWidth;
		}

		var collisionResults = this.basicCollision.basicCollision(this);
		if (collisionResults.down && !this.jumping) {
			this.jumpspeed = 0;
			this.jumping = true;
		}

		if (this.jumping && collisionResults.down) {
			this.jumpspeed += 0.25;
			if (this.jumpspeed > 12) {
				this.jumpspeed = 12;
			}

			this.y += this.jumpspeed;
		}

		if (!collisionResults.down && this.jumping) {
			this.jumping = false;
			this.jumpspeed = 0;
		}

		// figure out if we can shoot or not
		var distanceFromPlayer = player.x - this.x;
		if (this.shootTicks === 0 && Math.abs(distanceFromPlayer) < 225) {
			this.watchedElements.push(new Shot(stage, this.x, this.y, -this.animations.scaleX, this, mapper));
			this.animations.gotoAndPlay("shoot");
			this.hardshell = false;
			this.activated = true;
			this.shootTicks = 200 / lowFramerate;
			setTimeout(function() {
				this.animations.gotoAndPlay("sit");
				this.activated = false;
				this.hardshell = true;
			}.bind(this), 750);
		}

		if (!collisionResults.down) {
			this.y -= (this.y + this.animations.spriteSheet._frameHeight) % 16;
		}

		this.animations.x = this.x - mapper.completedMapsWidthOffset;
		this.animations.y = this.y;
	};

	var Shot = function(stage, x, y, direction, owner) {
		var shotSpriteSheet = new createjs.SpriteSheet({
			"images": [loader.getResult("enemyshot")],
			"frames": {
				"width": 8, "height": 8, "count": 1
			},
			"animations": {
				"shot": {
					"frames" : [0],
					"next" : "shot"
				}
			}
		});

		this.stage      = stage;
		this.damage     = 4;
		this.direction  = direction;
		this.animations = new createjs.Sprite(shotSpriteSheet, "shot");
		this.x          = x + ((this.direction === 1) ? 16 : -2);
		this.y          = y + 11;
		this.disabled   = false;
		this.owner      = owner;

		this.animations.play();
		this.stage.addChild(this.animations);
		this.x = this.x + (3 * this.direction) * lowFramerate;
		this.animations.x = this.x - mapper.completedMapsWidthOffset;
		this.animations.y = this.y;

		this.tickActions = function() {
			this.x = this.x + (1.5 * this.direction) * lowFramerate;
			this.animations.x = this.x - mapper.completedMapsWidthOffset;
			this.animations.y = this.y;

			if (!this.checkBounds()) {
				this.removeSelf();
			}
		};

		this.removeSelf = function() {
			this.stage.removeChild(this.animations);
			this.disabled = true;
		};

		this.checkBounds = function() {
			return !(this.x < 0 || this.x > player.x + 1000);
		};
	};
}