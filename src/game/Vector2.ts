export default class Vector2 {
	private x_: number;
	private y_: number;

	get x() {
		return this.x_;
	}

	get y() {
		return this.y_;
	}

	setX(x: number) {
		this.x_ = x;
	}

	setY(y: number) {
		this.y_ = y;
	}

	set(x: number, y: number) {
		this.x_ = x;
		this.y_ = y;
	}
}
