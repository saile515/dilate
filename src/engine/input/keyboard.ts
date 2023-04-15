export const keyboard: Map<string, boolean> = new Map<string, boolean>();
export const keyMap: Map<string, string> = new Map<string, string>();

document.addEventListener("keydown", (event: KeyboardEvent) => {
	keyboard.set(event.key, true);
});

document.addEventListener("keyup", (event: KeyboardEvent) => {
	keyboard.set(event.key, false);
});
