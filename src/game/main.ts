import Object from "./Object";
import Scene from "./Scene";
import Sprite from "./components/Sprite";
import Transform from "./components/Transform";

declare global {
	var scene: Scene;
}

export function init() {
	const canvas: HTMLCanvasElement = document.querySelector("#game_canvas");
	const ctx = canvas.getContext("2d");

	const scene = new Scene(ctx);
	globalThis.scene = scene;

	const player = new Object();
	const playerSprite = new Sprite("/ship.png");
	player.addComponent(playerSprite);
	scene.add(player);

	const playerTransform = player.getComponent<Transform>(Transform);

	function update() {
		playerTransform.position.setY(playerTransform.position.y + 0.01);

		scene.render();
		requestAnimationFrame(update);
	}

	update();
}
