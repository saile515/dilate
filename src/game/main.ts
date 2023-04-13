import Object from "./Object";
import Scene from "./Scene";
import Sprite from "./components/Sprite";

declare global {
	var scene: Scene;
}

export function init() {
	const canvas: HTMLCanvasElement = document.querySelector("#game_canvas");
	const ctx = canvas.getContext("2d");

	const scene = new Scene(ctx);
	globalThis.scene = scene;

	const player = new Object();
	const playerSprite = new Sprite("/rn-228.png");
	player.addComponent(playerSprite);
	scene.add(player);

	function update() {
		scene.cameraPosition.setY(scene.cameraPosition.y + 0.01);

		scene.render();
		requestAnimationFrame(update);
	}

	update();
}
