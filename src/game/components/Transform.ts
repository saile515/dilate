import Component from "../Component";
import Vector2 from "../Vector2";

export default class Transform extends Component {
	private position_: Vector2 = new Vector2(0, 0);
	private rotation_: number = 0;
	private scale_: Vector2 = new Vector2(1, 1);

	get position() {
		return this.position_;
	}

	get rotation() {
		return this.rotation_;
	}

	get scale() {
		return this.scale_;
	}

	setPosition(position: Vector2) {
		this.position_ = position;
	}

	setRotation(rotation: number) {
		this.rotation_ = rotation;
	}

	setScale(scale: Vector2) {
		this.scale_ = scale;
	}
}
