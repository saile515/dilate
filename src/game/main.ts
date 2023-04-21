import { InputAction } from "../engine/input/InputHandler";
import Object from "../engine/core/Object";
import ParticleSystem from "../engine/ParticleSystem";
import Player from "./Player";
import Rigidbody from "../engine/components/Rigidbody";
import Scene from "../engine/core/Scene";
import Sprite from "../engine/components/Sprite";
import Transform from "../engine/components/Transform";
import { UIStateStore } from "./uiState";
import Vector2 from "../engine/core/Vector2";
import { keyMap } from "../engine/input/keyboard";

declare global {
	var scene: Scene;
}

export const c = 299.792458;

export function init() {
	const canvas: HTMLCanvasElement = document.querySelector("#game_canvas");
	const ctx = canvas.getContext("2d");

	document.documentElement.ontouchstart = () => {
		document.documentElement.requestFullscreen();
		screen.orientation.lock("landscape");
	};

	const scene = new Scene(ctx);
	globalThis.scene = scene;

	const player = new Player();
	scene.add(player);

	const playerTransform = player.getComponent<Transform>(Transform);
	const playerRigidbody = player.getComponent<Rigidbody>(Rigidbody);

	let gammaFactor = 1;

	let timer = 65;

	function update() {
		scene.inputHandler.update();

		gammaFactor = 1 / Math.sqrt(1 - (playerRigidbody.velocity.magnitude() / c) ** 2);
		if (gammaFactor && scene.deltaTime) {
			timer -= scene.deltaTime / gammaFactor;
		}

		UIStateStore.setVelocity(playerRigidbody.velocity);
		UIStateStore.setTimer(timer);

		scene.render();
		requestAnimationFrame(update);
	}

	update();
}
