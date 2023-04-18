import { useEffect, useState, useSyncExternalStore } from "react";

import Scene from "../engine/core/Scene";
import { UIStateStore } from "../game/uiState";
import { c } from "../game/main";

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
					<div className="bg-[url(/speedometer.svg)] w-40 h-40 m-10 bg-contain flex justify-center items-center">
						<div
							className="w-1 h-32"
							style={{
								transform: `rotate(${
									(uiState.velocity.magnitude() / c) * 320 + 200
								}deg)`,
							}}>
							<div className="w-full rounded h-1/2 bg-red-500"></div>
						</div>
					</div>
					<p className="absolute top-8 left-1/2 -translate-x-1/2 text-xl">
						{Math.round(uiState.timer * 100) / 100} s
					</p>
				</>
			)}
		</div>
	);
}
