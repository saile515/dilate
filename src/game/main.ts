import Object from "./Object";
import Scene from "./Scene";
import Sprite from "./components/Sprite";

export function init(renderMethod: (objects: Object[]) => void) {
	const scene = new Scene();

	const player = new Object();
	const playerSprite = new Sprite("/rn-228.svg");
	player.addComponent(playerSprite);
	scene.add(player);

	function render() {
		renderMethod(scene.children);
		requestAnimationFrame(render);
	}

	render();
}
