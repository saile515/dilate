import Component from "../core/Component";
import Transform from "./Transform";
import Vector2 from "../core/Vector2";

export default class Rigidbody extends Component {
	private velocity_: Vector2 = new Vector2(0, 0);
	private forces: Vector2[] = [];
	mass: number = 100;

	get velocity() {
		return this.velocity_;
	}

	addForce(force: Vector2) {
		this.forces.push(force);
	}

	update() {
		this.forces.forEach((force) => {
			this.velocity_.add(
				force.x * globalThis.scene.deltaTime,
				force.y * globalThis.scene.deltaTime
			);
		});

		this.parent
			.getComponent<Transform>(Transform)
			.position.add(this.velocity_.x / this.mass, this.velocity_.y / this.mass);

		this.forces = [];
	}
}
