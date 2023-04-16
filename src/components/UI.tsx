import { useEffect, useState, useSyncExternalStore } from "react";

import Scene from "../engine/core/Scene";
import { UIStateStore } from "../game/uiState";

export default function UI() {
	const [scene, setScene] = useState<Scene>(null);
	const uiState = useSyncExternalStore(UIStateStore.subscribe, UIStateStore.getSnapshot);

	useEffect(() => {
		const interval = setInterval(() => {
			if (globalThis.scene) {
				clearInterval(interval);
				setScene(globalThis.scene);
			}
		}, 100);
	});

	return (
		<div className="absolute top-0 left-0 w-full h-full">
			{scene?.inputHandler.inputMethod == "onScreenControls" && (
				<>
					<div
						className="bg-zinc-900 opacity-60 w-20 h-20 absolute bottom-0 right-0"
						onTouchStart={() => {
							scene.inputHandler.getAction("accelerate").setValue(true);
						}}
						onTouchEnd={() => {
							scene.inputHandler.getAction("accelerate").setValue(false);
						}}></div>
					<div
						className="bg-zinc-900 opacity-60 w-20 h-20 absolute bottom-0 left-0"
						onTouchStart={() => {
							scene.inputHandler.getAction("decelerate").setValue(true);
						}}
						onTouchEnd={() => {
							scene.inputHandler.getAction("decelerate").setValue(false);
						}}></div>
				</>
			)}
			{uiState && (
				<>
					<p>{Math.floor(uiState.velocity.y)}</p>
				</>
			)}
		</div>
	);
}
