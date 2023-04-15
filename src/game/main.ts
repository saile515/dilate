import { InputAction } from "../engine/input/InputHandler";
import Object from "../engine/core/Object";
import Scene from "../engine/core/Scene";
import Sprite from "../engine/components/Sprite";
import Transform from "../engine/components/Transform";
import { keyMap } from "../engine/input/keyboard";

declare global {
	var scene: Scene;
}

export function init() {
	const canvas: HTMLCanvasElement = document.querySelector("#game_canvas");
	const ctx = canvas.getContext("2d");

	document.documentElement.ontouchstart = () => {
		document.documentElement.requestFullscreen();
		screen.orientation.lock("landscape");
	};

	const scene = new Scene(ctx);
	globalThis.scene = scene;

	const player = new Object();
	const playerSprite = new Sprite("/ship.png");
	player.addComponent(playerSprite);
	scene.add(player);

	scene.inputHandler.addAction(new InputAction<boolean>("accelerate"));
	keyMap.set("w", "accelerate");

	const playerTransform = player.getComponent<Transform>(Transform);

	function update() {
		scene.inputHandler.update();

		if (scene.inputHandler.getAction("accelerate").value) {
			playerTransform.position.setY(playerTransform.position.y + 0.01);
		}

		scene.render();
		requestAnimationFrame(update);
	}

	update();
}
