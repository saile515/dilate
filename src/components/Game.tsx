import * as GAME from "../game/main";

import { useEffect } from "react";
import useWindowSize from "../hooks/useWindowSize";

export default function Game() {
	const windowSize = useWindowSize();

	useEffect(() => {
		GAME.init();
	}, []);

	return <canvas id="game_canvas" width={windowSize.width} height={windowSize.height}></canvas>;
}
