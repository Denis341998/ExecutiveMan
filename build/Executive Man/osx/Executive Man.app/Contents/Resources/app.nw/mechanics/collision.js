function TileCollisionDetector() {
	this.checkCollisions = function(playerCollisionPoints, collisionArray, heightOffset, widthOffset) {

		var moves = { leftmove : true, downmove : true, rightmove : true, upmove : true, nextmap : false, nextmapup : false };
		var tilesize = 16; // this is used as width and height!

		try {
			var a = Math.floor((playerCollisionPoints.leftTop.y - heightOffset) / tilesize);
			var b = Math.floor((playerCollisionPoints.leftTop.x - widthOffset) / tilesize);

			if (a <= -1 || a > collisionArray.length) {
				a = 0;
			}

			if (b <= -1 || b > collisionArray[a].length) {
				b = 0;
			}

			if (collisionArray[a][b]) {
				moves.leftmove = false;
			}

			a = Math.floor((playerCollisionPoints.leftBottom.y - heightOffset) / tilesize);
			b = Math.floor((playerCollisionPoints.leftBottom.x - widthOffset) / tilesize);

			if (a <= -1 || a > collisionArray.length) {
				a = 0;
			}

			if (b <= -1 || b > collisionArray[a].length) {
				b = 0;
			}

			if (collisionArray[a][b]) {
				moves.leftmove = false;
			}

			a = Math.floor((playerCollisionPoints.bottomLeft.y - heightOffset) / tilesize);
			b = Math.floor((playerCollisionPoints.bottomLeft.x - widthOffset) / tilesize);

			if (a <= -1 || a > collisionArray.length) {
				a = 0;
			}

			if (b <= -1 || b > collisionArray[a].length) {
				b = 0;
			}

			if (collisionArray[a][b] && this.isTop(collisionArray, a, b)) {
				moves.downmove = false;
			}

			a = Math.floor((playerCollisionPoints.bottomRight.y - heightOffset) / tilesize);
			b = Math.floor((playerCollisionPoints.bottomRight.x - widthOffset) / tilesize);

			if (a <= -1 || a > collisionArray.length) {
				a = 0;
			}

			if (b <= -1 || b > collisionArray[a].length) {
				b = 0;
			}

			if (collisionArray[a][b] && this.isTop(collisionArray, a, b)) {
				moves.downmove = false;
			}

			a = Math.floor((playerCollisionPoints.rightBottom.y - heightOffset) / tilesize);
			b = Math.floor((playerCollisionPoints.rightBottom.x - widthOffset) / tilesize);

			if (a <= -1 || a > collisionArray.length) {
				a = 0;
			}

			if (b <= -1 || b > collisionArray[a].length) {
				b = 0;
			}

			if (collisionArray[a][b]) {
				moves.rightmove = false;
			}

			a = Math.floor((playerCollisionPoints.rightTop.y - heightOffset) / tilesize);
			b = Math.floor((playerCollisionPoints.rightTop.x - widthOffset) / tilesize);

			if (a <= -1 || a > collisionArray.length) {
				a = 0;
			}

			if (b <= -1 || b > collisionArray[a].length) {
				b = 0;
			}

			if (collisionArray[a][b]) {
				moves.rightmove = false;
			}

			a = Math.floor((playerCollisionPoints.topLeft.y - heightOffset) / tilesize);
			b = Math.floor((playerCollisionPoints.topLeft.x - widthOffset) / tilesize);

			if (a <= -1 || a > collisionArray.length) {
				a = 0;
				moves.nextmapup = true;
			}

			if (b <= -1 || b > collisionArray[a].length) {
				b = 0;
			}

			if (collisionArray[a][b] && this.isBottom(collisionArray, a, b)) {
				moves.upmove = false;
			}

			a = Math.floor((playerCollisionPoints.topRight.y - heightOffset) / tilesize);
			b = Math.floor((playerCollisionPoints.topRight.x - widthOffset) / tilesize);

			if (a <= -1 || a > collisionArray.length) {
				a = 0;
			}

			if (b <= -1 || b > collisionArray[a].length) {
				b = 0;
			}

			if (collisionArray[a][b] && this.isBottom(collisionArray, a, b)) {
				moves.upmove = false;
			}
		} catch (error) {
			moves = { leftmove : false, downmove : false, rightmove : false, upmove : false, nextmap : true, nextmapup : false };
		}

		return moves;
	};

	this.isTop = function(collisionArray, a, b) {
		if (collisionArray[a - 1][b]) {
			return false;
		}

		return true;
	};

	this.isBottom = function(collisionArray, a, b) {
		if (collisionArray[a + 1][b]) {
			return false;
		}

		return true;
	};
}