import Object from "./Object";
import Scene from "./Scene";
import Sprite from "./components/Renderer";

const scene = new Scene();

const player = new Object();
const playerSprite = new Sprite("/rn-228.svg");
player.addComponent(playerSprite);
