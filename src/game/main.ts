import Object from "./Object";
import Scene from "./Scene";
import Sprite from "./components/Sprite";

export function init() {
	const canvas: HTMLCanvasElement = document.querySelector("#game_canvas");
	const ctx = canvas.getContext("2d");

	const scene = new Scene(ctx);

	const player = new Object();
	const playerSprite = new Sprite("/rn-228.svg");
	player.addComponent(playerSprite);
	scene.add(player);

	function update() {
		scene.cameraPosition.setX(scene.cameraPosition.x + 0.01);

		scene.render();
		requestAnimationFrame(update);
	}

	update();
}
