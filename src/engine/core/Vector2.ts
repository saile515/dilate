export default class Vector2 {
	private x_: number;
	private y_: number;

	constructor(x: number, y: number) {
		this.x_ = x;
		this.y_ = y;
	}

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

	addX(x: number) {
		this.x_ += x;
	}

	addY(y: number) {
		this.y_ += y;
	}

	add(x: number, y: number) {
		this.x_ += x;
		this.y_ += y;
	}

	magnitude() {
		return Math.sqrt(this.x_ ** 2 + this.y_ ** 2);
	}
}
