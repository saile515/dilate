import { useEffect, useState } from "react";

import Scene from "../engine/core/Scene";

export default function UI() {
	const [scene, setScene] = useState<Scene>(null);

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
						className="bg-zinc-900 opacity-60 w-20 h-20"
						onTouchStart={() => {
							scene.inputHandler.getAction("accelerate").setValue(true);
						}}
						onTouchEnd={() => {
							scene.inputHandler.getAction("accelerate").setValue(false);
						}}></div>
				</>
			)}
		</div>
	);
}
