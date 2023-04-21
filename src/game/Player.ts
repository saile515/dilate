import { InputAction } from "../engine/input/InputHandler";
import Object from "../engine/core/Object";
import ParticleSystem from "../engine/ParticleSystem";
import Rigidbody from "../engine/components/Rigidbody";
import Sprite from "../engine/components/Sprite";
import Transform from "../engine/components/Transform";
import Vector2 from "../engine/core/Vector2";
import { c } from "./main";
import { keyMap } from "../engine/input/keyboard";

export default class Player extends Object {
	private engine1: ParticleSystem = new ParticleSystem();
	private engine2: ParticleSystem = new ParticleSystem();

	constructor() {
		super();
		this.addComponent(new Sprite("/ship.png"));

		const rigidbody = new Rigidbody();
		rigidbody.mass = 10 * 10 ** 6;
		this.addComponent(rigidbody);

		scene.add(this.engine1);
		scene.add(this.engine2);

		scene.inputHandler.addAction(new InputAction<boolean>("accelerate"));
		keyMap.set("w", "accelerate");

		scene.inputHandler.addAction(new InputAction<boolean>("decelerate"));
		keyMap.set("s", "decelerate");
	}

	update() {
		super.update();
		const rigidbody = this.getComponent<Rigidbody>(Rigidbody);
		const transform = this.getComponent<Transform>(Transform);

		if (scene.inputHandler.getAction("accelerate").value && rigidbody.velocity.y < c) {
			rigidbody.addForce(new Vector2(0, 10 ** 8));
			this.engine1.intensity = 5;
			this.engine2.intensity = 5;
		} else {
			rigidbody.addForce(new Vector2(0, (-rigidbody.velocity.y / 2) * 10 ** 7));
			this.engine1.intensity = 1;
			this.engine2.intensity = 1;
		}

		if (scene.inputHandler.getAction("decelerate").value && rigidbody.velocity.y > 0) {
			rigidbody.addForce(new Vector2(0, -(10 ** 8)));
		}

		this.engine1
			.getComponent<Transform>(Transform)
			.position.set(transform.position.x + 0.17, transform.position.y + -1);

		this.engine1.speed = rigidbody.velocity.y / 100 + 0.25;

		this.engine2
			.getComponent<Transform>(Transform)
			.position.set(transform.position.x + 0.83, transform.position.y + -1);

		this.engine2.speed = rigidbody.velocity.y / 100 + 0.25;

		globalThis.scene.cameraPosition.set(
			0,
			transform.position.y +
				(rigidbody.velocity.y > 0
					? Math.min(Math.sqrt(Math.abs(rigidbody.velocity.y)) * 0.1, 1)
					: Math.max(Math.sqrt(Math.abs(rigidbody.velocity.y)) * 0.1, -1))
		);

		globalThis.scene.cameraPosition.add(
			((Math.random() - 0.5) * rigidbody.velocity.magnitude()) / 10000,
			((Math.random() - 0.5) * rigidbody.velocity.magnitude()) / 10000
		);
	}
}
