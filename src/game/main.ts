import { InputAction } from "../engine/input/InputHandler";
import Object from "../engine/core/Object";
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
    const rigidbody = new Rigidbody();
    rigidbody.mass = 10 * 10 ** 6;
    player.addComponent(rigidbody);
    scene.add(player);

    scene.inputHandler.addAction(new InputAction<boolean>("accelerate"));
    keyMap.set("w", "accelerate");

    scene.inputHandler.addAction(new InputAction<boolean>("decelerate"));
    keyMap.set("s", "decelerate");

    const playerTransform = player.getComponent<Transform>(Transform);

    const c = 299792458;
    let gammaFactor = 1;

    let timer = 65;

    function update() {
        scene.inputHandler.update();

        if (scene.inputHandler.getAction("accelerate").value && rigidbody.velocity.y < c) {
            rigidbody.addForce(new Vector2(0, 10 ** 7));
        } else {
            rigidbody.addForce(new Vector2(0, -rigidbody.velocity.y / 2));
        }

        if (scene.inputHandler.getAction("decelerate").value && rigidbody.velocity.y < c) {
            rigidbody.addForce(new Vector2(0, -(10 ** 7)));
        }

        gammaFactor = 1 / Math.sqrt(1 - (rigidbody.velocity.magnitude() / c) ** 2);
        if (gammaFactor && scene.deltaTime) {
            timer -= scene.deltaTime / gammaFactor;
        }
        UIStateStore.setTimer(timer);

        scene.cameraPosition.set(
            0,
            playerTransform.position.y +
            (rigidbody.velocity.y > 0
                ? Math.min(Math.sqrt(Math.abs(rigidbody.velocity.y)) * 0.0001, 1)
                : Math.max(Math.sqrt(Math.abs(rigidbody.velocity.y)) * 0.0001, -1))
        );

        scene.cameraPosition.add(
            ((Math.random() - 0.5) * rigidbody.velocity.magnitude()) / 10000000000,
            ((Math.random() - 0.5) * rigidbody.velocity.magnitude()) / 10000000000
        );

        UIStateStore.setVelocity(rigidbody.velocity);

        scene.render();
        requestAnimationFrame(update);
    }

    update();
}
