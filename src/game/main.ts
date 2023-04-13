import Object from "./Object";
import Scene from "./Scene";
import Sprite from "./components/Sprite";

const scene = new Scene();

const player = new Object();
const playerSprite = new Sprite("/rn-228.svg");
player.addComponent(playerSprite);
scene.add(player);

function render() {
	console.log(scene.cameraPosition);
	scene.cameraPosition.setX(scene.cameraPosition.x + 0.01);
	requestAnimationFrame(render);
}

render();
